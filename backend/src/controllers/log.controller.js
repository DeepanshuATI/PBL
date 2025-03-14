import { Log } from '../models/log.model.js';

export const addLog = async (req,res) => {
    try {
        const { action, details } = req.body;
        const log = new Log({
            user:req.user_id,
            action,
            details,
        });

        const savedLog = await log.save();
        res.status(201).josn(savedLog);
    } catch (err) {
        res.status(500).json({message:'Failed to add log',error:err.message});
    }
};

export const getLogs = async (req,res) => {
    try {
        const logs = await Log.find({user:req.user_id}).sort({timestamp:-1});
        res.status(200).json(logs);
        
    } catch (err) {
        res.status(500).json({message:'Failed to fetch log',error:err.message});
    }
};


export const deleteLog = async (req, res) => {
    try {
      const { log_id } = req.params;
  
      // Validate log_id
      if (!log_id) {
        return res.status(400).json({
          status: "error",
          message: "Log ID is required",
        });
      }
  
      // Find and delete the log
      const deletedLog = await Log.findOneAndDelete({
        _id: log_id,
        user: req.user_id, // Ensure the log belongs to the logged-in user
      });
  
      // Check if the log exists
      if (!deletedLog) {
        return res.status(404).json({
          status: "error",
          message: "Log not found or not authorized to delete",
        });
      }
  
      // Respond with success
      res.status(200).json({
        status: "success",
        message: "Log deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to delete log",
        error: err.message,
      });
    }
  };
  