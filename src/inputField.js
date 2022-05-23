import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
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
          <h1 className="title">
            Brutally Honest <br></br> 8Ball
          </h1>
        </Grid>
        <Grid
          item
          xs={12}
          id="questionBox"
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <TextField
            sx={{
              "& .MuiInputLabel-root": { color: "white" },
              borderBottom: "1px solid white",
            }}
            InputProps={{ disableUnderline: true }}
            id="standard-basic"
            label="Q:"
            variant="standard"
            //fullWidth={true}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            id="submitButton"
            size="small"
            variant="contained"
            onClick={() => submitPrompt()}
          >
            SUBMIT
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <div className="container">
            <div className="eightBall"></div>
            <div className="response">
              <p className="line-1 anim-typewriter">{eightBallAnswer}</p>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
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
