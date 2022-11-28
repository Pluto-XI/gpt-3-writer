const getKey = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(['openai-key'], (result) => {
          if (result['openai-key']) {
            const decodedKey = atob(result['openai-key']);
            resolve(decodedKey);
          }
        });
      });
};

const generate = async (prompt) => {
    //Get key from storage
    const key = await getKey();
    const url = 'https://api.openai.com/v1/completions';

    //Call completions endpoint
    const completionResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-002',
            prompt: prompt,
            max_tokens: 777,
            temperature: 0.777
        }),
    });

    const completion = await completionResponse.json();
    return completion.choices.pop();
};

const generateCompletionAction = async (info) => {
  try {
    const { selectionText } = info;
    const prompt = `
        Tell me a story about ${selectionText} in as much detail as you can.\n
        story:\n
        `;

    const baseCompletion = await generate(`${prompt}`);

    const secondPrompt = `
    prompt: Write a story with as much detail as you can about ${selectionText}.\n
    story: ${baseCompletion.text}\n
    prompt: Tell me a story about ${selectionText} in as much detail as you can.\n
    story:\n
    `
    const secondPromptCompletion = await generate(secondPrompt);
    console.log(secondPromptCompletion.text)
  } catch (error) {
    console.log(error);
  }
};

chrome.contextMenus.create({
  id: "context-run",
  title: "Generate story",
  contexts: ["selection"],
});

// Add listener
chrome.contextMenus.onClicked.addListener(generateCompletionAction);
