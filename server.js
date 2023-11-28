const express = require("express");
const OpenAIApi = require("openai");
const app = express();
const PORT = 8000;
app.use(express.static("public"));
app.use(express.json()) 

// const openai = new OpenAIApi(Configuration({
//     // replace your-api-key with your API key from ChatGPT
//     apiKey: "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"
//   }));

const openai = new OpenAIApi({
  apiKey: "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",
});
app.post("/chat", async (req, res) => {
    
    console.log(req.body.question)
  try {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: req.body.question}],
        model: 'gpt-3.5-turbo',
      });

    res.status(200).json({ message: chatCompletion.choices[0].message.content });
    // res.status(200).json({ message:chatCompletion });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
