import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";

const InputField = () => {
  let [prompt, setPrompt] = useState("");
  let [eightBallAnswer, setEightBallAnswer] = useState("");
  let [responseHistory, setResponseHistory] = useState([]);

  const submitPrompt = () => {
    //const condensedString = prompt.split("/n");
    //console.log(condensedString);
    axios
      .post(`http://localhost:3000/completionRequest`, {
        params: prompt,
      })
      .then((completionResponse) => {
        const rawResponse = completionResponse.data;
        const cleanResponse = rawResponse.split("/n");
        const logHistory = {};
        //grab the question and answer and fill the logHistory object so that we can push it to responseHistory state
        logHistory.Q = "Q: " + prompt;
        logHistory.A = cleanResponse[1];
        console.log(logHistory);
        setResponseHistory((prevArray) => [...prevArray, logHistory]);
        //set our eightBallAnswer state to the API response
        setEightBallAnswer(cleanResponse[1]);
      })
      .catch((error) => {
        console.log(error, "failed to connect to server");
      });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <h1>
            Brutally Honest <br></br> 8Ball
          </h1>
        </Grid>
        <Grid
          item
          xs={9}
          className="questionBox"
          alignItems="center"
          justify="center"
        >
          <TextField
            id="standard-basic"
            label="Q:"
            variant="standard"
            fullWidth={true}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            id="submitButton"
            size="small"
            variant="contained"
            onClick={() => submitPrompt()}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div className="response">
            <p className="line-1 anim-typewriter">{eightBallAnswer}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default InputField;
