export const DB_NAME = "tracker";
export const SECRET_KEY = process.env.SECRET_KEY || 'daxterati';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4';
export const PORT = process.env.PORT || 8000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
