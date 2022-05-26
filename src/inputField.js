import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const InputField = () => {
  let [prompt, setPrompt] = useState("");
  let [eightBallAnswer, setEightBallAnswer] = useState("");
  let [responseHistory, setResponseHistory] = useState([]);

  const ROUTE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/completionRequest"
      : "https://honest8ball.herokuapp.com/completionRequest";

  const submitPrompt = () => {
    //const condensedString = prompt.split("/n");
    //console.log(condensedString);
    //console.log(process.env.NODE_ENV);

    axios
      //do i need to change the local host thing
      .post(ROUTE, {
        params: prompt,
      })
      .then((completionResponse) => {
        const rawResponse = completionResponse.data;
        const cleanResponse = rawResponse.split("/n");
        const logHistory = {};
        //grab the question and answer and fill the logHistory object so that we can push it to responseHistory state
        logHistory.Q = "Q: " + prompt;
        logHistory.A = cleanResponse[1];
        //console.log(logHistory);
        setResponseHistory((prevArray) => [...prevArray, logHistory]);
        //set our eightBallAnswer state to the API response
        setEightBallAnswer(cleanResponse[1]);
      })
      .catch((error) => {
        console.log(error, "failed to connect to server");
      });
  };

  return (
    <div className="container">
      <h1 className="title">
        Brutally Honest <br></br> 8Ball
      </h1>
      <form className="formContainer">
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          className="qBox"
          name="qBox"
          onChange={(e) => setPrompt(e.target.value)}
        ></input>
        <br></br>
        <button
          type="button"
          className="submitButton"
          onClick={() => submitPrompt()}
        >
          Submit
        </button>
      </form>
      <div className="eightBall">
        <div className="response">
          <p>{eightBallAnswer}</p>
        </div>
      </div>
      <div className="responseHistory">
        {responseHistory.map((pair) => {
          return (
            <div className="responseHistoryPair">
              <p>{pair.Q}</p>
              <p>{pair.A}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputField;
