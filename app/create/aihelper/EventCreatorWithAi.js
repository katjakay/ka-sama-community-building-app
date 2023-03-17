'use client';

import Link from 'next/link';
import { Configuration, OpenAIApi } from 'openai';
import { useState } from 'react';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function EventCreatorWithAi() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Write an event description based on these taglines: ${prompt}  `,
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    if (completion.data.choices.length > 0 && completion.data.choices[0].text) {
      setGeneratedText(completion.data.choices[0].text);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        To create your event description, all you need to do is type in a few
        keywords.
        <input
          className="block w-full p-10 mt-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </label>
      <br />
      <button className="text-white bg-blue text-white font-regular text-sm rounded mt-4 mb-4 min-w-full h-11">
        Generate
      </button>
      <br />
      {!!generatedText && (
        <div>
          <h2>Your event description:</h2>
          <p>{generatedText}</p>
        </div>
      )}
      <div>
        <Link className="link text-yellow" href="/create">
          <p> Back to create </p>
        </Link>
      </div>
    </form>
  );
}
