import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const event = req.body.event || '';
  if (event.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter valid event keywords',
      },
    });
    return;
  }

  //  sends API request to Openai API
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(event),
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

// Function that generates the prompt
function generatePrompt(event) {
  const capitalizedEvent = event.toUpperCase();
  return `Suggest an event description using keywords:

Event: filipino party, bring food and good mood!
Description: Come join us for a fun-filled Filipino party! Bring your favorite Filipino dish to share with everyone and come ready to have a good time. We'll have music, games, and plenty of food to go around. So come with an empty stomach and a good mood, and let's celebrate Filipino culture together!
Event: sports party, bring shoes, free entrance
Description: Come join us for a fun sports party! We'll have a variety of sports activities to choose from, so make sure to bring your favorite pair of shoes. The best part? Entrance is free! So come on down and join us for a great time.
Event: ${capitalizedEvent}
Description:`;
}
