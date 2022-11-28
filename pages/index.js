import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch('/api/questions');
      const questions = await response.json();
      setQuestions(questions);
    }
    fetchQuestions();
  }, []);

  return (
    <main>
      <h1>Lean Coffee Board API</h1>
      <h2>Questions</h2>
      <p>API Route: {`<YOUR-SERVER>/api/questions`}</p>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </main>
  );
}
