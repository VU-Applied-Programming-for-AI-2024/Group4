

import {OpenAIAPI, Configuration} from "openai";

export default async(req,res) => {
    const {question} = req.body
    
    if(!question) {
        return res.status(400).json({error: "Text is required"});


    }

    const configuration = new Configuration({
        apikey: process.env.OPENAI_API_KEY
    })

    openai = new OpenAIApi(configuration)

    try {
        const result = await openai.createCompletion({
            model: 'gpt-4o',
            prompt: question,
            max_tokens: 200
        })
        return res.json({answer: result.data.choices[0].text})
    } catch(error) {
        return res.status(500).json({error: "Error fetching answer"})
    }
}

