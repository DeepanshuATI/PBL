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