

// Initial import of openai npm package
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: "sk-proj-b6J8wQ3KXq6ASLinpnvsT3BlbkFJz6b5TXP4yGhGuWkGX8GC",
});


const getResponse = async (message) => {
    console.log('GetResponse called')
    const response = await openai.chat.completions.create({
        messages: [
        {
            role: "system",
            content: "You are a friendly, easygoing bartender in a cozy bar that offers advice and good conversation.",
        },
        ],
        model: "gpt-3.5-turbo",
    });

  var answer = response.choices[0].message
  console.log(answer);
  appendMessage('Bartender: ', answer);
};