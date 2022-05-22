const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { API_KEY, AI_Template } = require("../config.js");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/../dist"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.post("/completionRequest", async (req, res) => {
  const inputText = req.body.params;
  const finalPrompt = AI_Template + "Q: " + inputText;
  //console.log(finalPrompt);

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion("text-curie-001", {
    prompt: finalPrompt,
    max_tokens: 100,
    temperature: 0.5,
    n: 1,
    //echo: true,
  });
  res.status(200).send(response.data.choices[0].text);
  //console.log(response.data.choices[0].text);
});
