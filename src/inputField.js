import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const InputField = () => {
  let [prompt, setPrompt] = useState("");

  const submitPrompt = () => {
    axios
      .post(`http://localhost:3000/completionRequest/${prompt}`)
      .then((completionResponse) => {
        console.log(completionResponse.data);
      })
      .catch((error) => {
        console.log(error, "failed to connect to server");
      });
  };

  return (
    <div className="prompt">
      <h1>Fun With AI</h1>
      <form className="promtContainer">
        <label>Enter prompt</label>
        <br></br>
        <textarea
          id="promptText"
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
      </form>
      <Button variant="contained" onClick={() => submitPrompt()}>
        SUBMIT
      </Button>
    </div>
  );
};

export default InputField;
