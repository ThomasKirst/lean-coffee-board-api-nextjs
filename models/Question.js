import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
});

const Question =
  mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;
