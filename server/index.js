const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const PORT = 3000;
const key = process.env.API_KEY;

app.use(express.static(__dirname + "/../dist"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.post("/completionRequest", async (req, res) => {
  const template = (AI_Template =
    "Q: should i ask my crush on a date?/nA: no, what is there to like about you/n/nQ: am i attractive?/nA: no, deal with it/n/nQ: does my crush think im cute?/nA: no she actually thinks you are ugly/n/nQ: do my friends like me?/nA: yes, they think you are awesome/n/nQ: am i a cool person?/nA: no, you are extremely lame/n/nQ: do people care about me?/nA: definitely not/n/n");
  const inputText = req.body.params;
  const finalPrompt = template + "Q: " + inputText;

  const configuration = new Configuration({
    apiKey: key,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion("text-curie-001", {
    prompt: finalPrompt,
    max_tokens: 100,
    temperature: 0.5,
    n: 1,
  });
  res.status(200).send(response.data.choices[0].text);
});
