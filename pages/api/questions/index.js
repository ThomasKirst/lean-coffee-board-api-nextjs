import { getAllQuestions } from '../../../services/questionsService';
import Question from '../../../models/Question';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const questions = await getAllQuestions();
    return response.status(200).json(questions);
  }

  if (request.method === 'POST') {
    const data = request.body;

    const newCard = await Question.create(data);

    return response.status(201).json(newCard);
  }
}
