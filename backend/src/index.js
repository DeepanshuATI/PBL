import 'dotenv/config';
import  db  from './db/db.js';
import { app } from './app.js'


db()
.then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})  
.catch((err) => {
    console.log("MongoDB connection failed !!!",err);
})
