import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes.js'; // Adjust the path as necessary
import connectDB from './config/db.js';





dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/", todoRoutes)



app.listen(PORT, () => {
    connectDB()
  console.log(`Server is running on http://localhost:${PORT}`);
});

