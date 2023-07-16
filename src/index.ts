import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import expensesRouter from './routes/expenses';
import mongoose from 'mongoose';
import "dotenv/config";

const app: Express = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001',
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running');
  });

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Use expenses router
app.use('/api', expensesRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expense_tracker')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
