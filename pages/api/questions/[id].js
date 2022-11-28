import dbConnect from '../../../dbConnect';
import Question from '../../../models/Question';

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === 'GET') {
    const id = request.query.id;

    const question = await Question.findById(id);

    response.status(200).json(question);
  }

  if (request.method === 'DELETE') {
    const id = request.query.id;

    await Question.findByIdAndDelete(id);

    response.status(200).json({ message: 'question deleted' });
  }

  if (request.method === 'PUT') {
    const id = request.query.id;

    await Question.findByIdAndUpdate(id, {
      text: request.body.text,
      name: request.body.name,
    });

    response.status(200).json({ message: 'question updated' });
  }
}
