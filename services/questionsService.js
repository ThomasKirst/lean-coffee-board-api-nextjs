import dbConnect from '../dbConnect';
import Question from '../models/Question';

export async function getAllQuestions() {
  await dbConnect();

  const questions = await Question.find();

  const questionsArray = questions.map(({ name, id, text }) => {
    return { name, id, text };
  });

  return questionsArray;
}
