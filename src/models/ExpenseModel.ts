import mongoose, { Document, Schema, Model } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// Define interface for Expense document
interface IExpense extends Document {
  id: number;
  description: string;
  type: string;
  amount: number;
  date: Date;
}

// Create an instance of the Mongoose Schema class
const expenseSchema: Schema<IExpense> = new mongoose.Schema<IExpense>({
  id: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
});

// Apply auto-increment plugin to the expense schema
autoIncrement.initialize(mongoose.connection);
expenseSchema.plugin(autoIncrement.plugin, {
  model: 'Expense',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

// Remove expense by ID
expenseSchema.statics.findByIdAndDelete = async function (expenseId: string | undefined) {
  const deletedExpense = await this.deleteOne({ _id: expenseId });
  return deletedExpense;
};

// Create expense model
const ExpenseModel: Model<IExpense> = mongoose.model<IExpense>('Expense', expenseSchema);

export default ExpenseModel;
