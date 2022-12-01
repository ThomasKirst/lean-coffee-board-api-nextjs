import { useEffect, useState } from 'react';

export default function Home() {
  const [questions, setQuestions] = useState([]);

  async function fetchQuestions() {
    const response = await fetch('/api/questions');
    const questions = await response.json();
    setQuestions(questions);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function postCard() {
    const newCard = {
      text: 'How to build a NextJS API',
      name: 'Thomas'
    }

    await fetch('api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    });

    // Revalidate, get the latest questions
    fetchQuestions();
  }

  return (
    <main>
      <h1>Lean Coffee Board API</h1>
      <h2>GET questions</h2>
      <p>GET API Route:<br />{`https://lean-coffee-board-api-nextjs.vercel.app/api/questions`}</p>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
      <h3>How to include the fetch call in your React / Next App</h3>
      <p>You can write a function getQuestions() or getNotes() which encapsulates the fetch call:</p>
      <pre>
        {`
    async function getQuestions() {
      const response = await fetch(
        'https://lean-coffee-board-api-nextjs.vercel.app/api/questions'
      );
      const questionList = await response.json();
      setQuestions(questionList); // update of a state variable (or thoughts, notes, cards, etc.)
    }
        `}
      </pre>
      <p>Further on you will need to include that function in a hook:</p>
      <pre>
        {`
  useEffect(() => {
    getQuestions();
  }, []);
        `}
      </pre>
      <p>We leave the function getQuestions() outside because we might want to use that function from another place later on (revalidation).</p>
      <h2>POST a question</h2>
      <p>POST API Route: https://lean-coffee-board-api-nextjs.vercel.app/api/questions</p>
      <p>The POST route needs three pieces of information which we can add as a second argument to the fetch function</p>
      <ul>
        <li>The HTTP POST method (we are POSTing data)</li>
        <li>A HTTP header which describes that we are sending JSON data towards the server</li>
        <li>The POST body includes our data as JSON in a stringified form</li>
      </ul>
      <p>Your handleSubmit function would treat the fetch call as following</p>
      <pre>
        {`
    await fetch('https://lean-coffee-board-api-nextjs.vercel.app/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCard),
    });
        `}
      </pre>
      <button onClick={postCard}>Try it out and observe the network tab in your browser</button>
      <p>Keep in mind: when you POST a new question / card your frontend will not update automatically straight away.</p>
      <p>You will need to reload your page in order to see the new item displayed which is not favorable.</p>
      <p>In this case we want to be able to call getQuestions() again for our state update. The same will be true for our DELETE function on which we will have a look now.</p>
      <h2>DELETE a question</h2>
      <p>
        For deleting a card we need to pass the id of the card to the URI string:
      </p>
      <pre>{`https://lean-coffee-board-api-nextjs.vercel.app/api/questions/<QUESTION_ID>`}</pre>
      <p>Additionally, we will need to add the HTTP method <i>DELETE</i> in the option object for our fetch call.</p>
      <pre>
        {`
    async function removeQuestion(id) {
      await fetch(
        'https://lean-coffee-board-api-nextjs.vercel.app/api/questions/<QUESTION_ID>',
        {
          method: 'DELETE',
        }
      );
    }
        `}
      </pre>
      <h2>UPDATE a question</h2>
      <p>In order to update a question we need to combine our knowledge up to this point.</p>
      <ul>
        <li>Which HTTP method do we want to use for UPDATE? ➡️ It is <strong>PUT</strong></li>
        <li>How do we &quot;address&quot; the specific question in our URL? ➡️ We will use the same URL as for the DELETE request.</li>
        <li>What do we send in the HTTP request body? ➡️ Well, we want to make changes to the properties <i>name</i> and <i>text</i>.</li>
      </ul>
      <p>Finally, we put this altogether and formulate the request:</p>
      <pre>
        {`
    await fetch(
      'https://lean-coffee-board-api-nextjs.vercel.app/api/questions/<QUESTION_ID>',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuestion),
      }
    );
        `}
      </pre>
    </main >
  );
}
