# GPT-3 Writer
This is a project to learn more about machine learning/AI models and how to work with them. This is a project I've been looking forward to for a while and I'm super excited to have finally started working on it. 

<b>This project is using the GPT-3 AI model and an OpenAI api.</b>

GPT-3 is an AI model that is super good at writing what we want. It was trained using a massive portions of the internet. It can give us start-up ideas, movie scripts, etc. The possibilities are endless.

This project has a web front-end and interacts with the OpenAI api in order to utilize the GPT-3 model. I'm also building a browser extension that can inject text into a webpage that the user is on.

## GPT-3
I learned how to input a prompt into GPT-3, it honestly feels magical. This specific model was kinda mind-blowing to work with. I learned a bit about "prompt engineering". Here are some tips from the very awesome buildspace community.

- Good results don't come ASAP, it may take a bit
- Iterate fast and don't get too attached to specific prompts
- GPT-3's output can vary wildly based on a few words.
- Don't force a prompt, if after 6-12 attemps feel free to drop the prompt.

### Prompts
To start and "program" the model, we needed to give GPT-3 some prompts, which is just some text. This itself feels a bit like an artform. The structure I followed was having GPT-3 create a title of a story and then I could expand off of it. I had to provide it things like, a title, setting, character and their features, etc. I had to tell it where I wanted my story and the plot and it could immediately start outputting the story I had imagined.

<b>Meta-Learning</b>
A lot of work was required to get a decent story. This is because the processed used was "zero-shot learning". You don't give GPT-3 any examples of something that's already good. You just expect the first thing generated to be good. This method of learning is where GPT-3 performs at its <i>worst</i> We need to give it examples. You can use previous stories generated by GPT as examples. You can explicitly use "prompt" and "story" to let the model know when an example ends/starts.

# ML101
I learned a lot about how GPT-3 actually works during this project. Interestingly enough, GPT-3 is made up of a lot of parameters. Each parameter is a specialized number. When you input a sentence into GPT-3 it will combine the sentence with all of its parameters to predict what comes next.

GPT-3 has 175 billion parameters and is 800 GB in size. (Thank you OpenAI)
Each parameter looks something like ```output = input * parameter``` The math is simplified, but it's the general idea.
Input is the sentence and paramter is the unique number. We gather up all the outputs from the 175 billion unique parameters, combine them, and get our final output: words that complete the sentence.

You may be wondering how we can multiply a sentence with a bunch of numbers. Basically, each sentence is broken up into “tokens” where the sentence is basically converted into a set of numbers called a token.

GPT-3 has a dictionary it’s created that maps pieces of words to numbers. GPT-3 understands language differently than us, it just sees numbers/tokens.

The parameters are the heart of GPT-3, the parameters were trained on a dataset the included a ton of text from the internet. Wikipedia, news articles, blogs, github repos, twitter, forums, etc. It was trained on nearly 500 billion tokens from the internet. GPT-3 has seen it all.(or a good chunk of it).

For example, while training we may remove the last word from a sentence "All robots should ~~obey~~" and have GPT guess the last word. If it guesses wrong such as guessing "exterminate" rather than obey we tell it (conceptually not the actual math) that it was off by a margin of "error". ex: obey = 1000 and exterminate = 500, error = obey - exterminate. See a visualization [here](https://jalammar.github.io/images/gpt3/03-gpt3-training-step-back-prop.gif?utm_source=buildspace.so&utm_medium=buildspace_project). This is unsupervised training and the basics of deep learning. It's the heart of GPT-3. It just trained on the billions of sentences created by humanity on the internet and it came out knowing how to complete sentences, culture, and feels like it has a real understanding.
I plan on taking this course [here](https://course.fast.ai/Lessons/lesson3.html?utm_source=buildspace.so&utm_medium=buildspace_project) after this project is complete.

# Further prompts and applications
GPT-3 can replicate a conversation with specific individuals instead of just stories. For example, if we wanted to talk to Steve jobs we just preface our input with "This is a chat with Steve Jobs, the founder of Apple" and GPT-3 will mimic Steve.

This is called prompt chaining. We took the output from the prompt in Playground #1 and plugged it into another specialized prompt in Playground #2. You can keep doing this, and it’ll get even better at a specialized task.

Why does this work so well?

Well again — GPT-3 does better when 1) you give it more examples 2) you are highly specific in terms of what you ask from it. Prompt chaining blends these two!

Here are other examples of prompts you can chain:

    generate a table of contents for a blog → write a sentence for each section → for each sentence, write two paragraphs → done
    generate a sad love story about a boy and a girl → generate a rap chorus → generate a chrous that rhymes and has lyrics in the style of drake → generate the intro and outro verse based on the chorus → done.
    generate headline landing page copy for a product → generate more detailed copy for the product → generate ad copy targeted to 26-year-olds in Pakistan → done

Prompt chaining is highly underrated and not talked about much. It really lets you get really great performance for specific tasks you have in mind.

## Creating an application that uses GPT-3
We're going to create a prompt and fill in words with our users input. For example, if I wanted to create an app that creates landing page titles, my prompt would look like this.

```
Write a list of short landing page headlines in the style of Apple for a startup that builds the following: {userInput}
```

We had to set-up our front-end to call our backend. Without exposing any API keys of course. We have to set up a backend in order to call OpenAI securely. Setting up a server is a pain so we're going to be using <i>serverless functions</i> with NextJS. These run on the cloud on demand and we don't need to maintain our own server.

This was the first time using NextJS, it was kinda wild. I'll have to delve deeper into it as it seems we just used it to call the api securely in this case.



 






