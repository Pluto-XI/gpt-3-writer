import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const basePromptPrefix = "Prompt: Write a very detailed pitch to a VC for a startup that includes the problems it is solving, the detailed solutions, market size, and the business plan. This start-up is building a:\n";
const generateAction = async (req, res) => {
    //Run our first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: `${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.777,
        max_tokens: 777,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    const secondPrompt = `
    pitch: ${basePromptOutput.text}\n
    "Prompt: Write a very detailed pitch to a VC for a startup that includes the problems it is solving, the detailed solutions, market size, and the business plan. This start-up is building a:\n" ${req.body.userInput}\n
    pitch:\n
    `
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt: `${secondPrompt}`,
        temperature: 0.777,
        max_tokens: 777,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    res.status(200).json({ output: secondPromptOutput} );
};

export default generateAction;