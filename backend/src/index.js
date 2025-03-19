import 'dotenv/config';
import db from './db/db.js';
import { app } from './app.js';


const startServer = async () => {
  try {
    
    await db();
    console.log("Database connected successfully!");

    
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });

    

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Retrying...`);
        setTimeout(() => {
          server.close();
          const newPort = PORT + 1; // Increment the port
          app.listen(newPort, () => {
            console.log(`Server restarted on port: ${newPort}`);
          });
        }, 1000);
      } else {
        console.error("Server encountered an error:", err);
      }
    });
  } catch (err) {
    console.error("Failed to start the server:", err.message);
    process.exit(1);
  }
};

// Start the server
startServer();
