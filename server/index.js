const express = require("express");
const axios = require("axios");
const cors = require("cors");
const API_KEY = require("../config.js");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/../dist"));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

app.post("/completionRequest/:prompt", async (req, res) => {
  //console.log(req.params.prompt);
  const inputText = req.params.prompt;

  // const config = {
  //   method: "post",
  //   url: `https://api.openai.com/v1/engines/text-curie-001/completions`,
  //   headers: {
  //     Authorization: `Bearer ${API_KEY}`,
  //   },
  //   body: {
  //     prompt: inputText,
  //     max_tokens: 100,
  //     temperature: 0.9,
  //     n: 1,
  //     echo: true,
  //   },
  // };

  // axios(config)
  //   .then((completionResponse) => {
  //     console.log(completionResponse.data);
  //     //res.status(200).send()
  //   })
  //   .catch((error) => {
  //     //res.status(500).send(error, 'failed to grab completion response')
  //     console.log(error, "failed to grab");
  //   });

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion("text-curie-001", {
    prompt: inputText,
    max_tokens: 100,
    temperature: 0.9,
    n: 1,
    echo: true,
  });
  console.log(response.data.choices);
});
