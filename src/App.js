import "./App.css";
import React from "react";
import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function App() {
  const history = useHistory();
  const [mode, setMode] = useState("light");
  const toggleColorMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ borderRadius: "0", minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar variant="dense">
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/Tic-Tac-Toe")}
              >
                Tic-Tac-Toe game
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/")}
              >
                Homepage
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/Dashboard")}
              >
                Dashboard
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() => history.push("/Basicform")}
              >
                Basic Form
              </Button>
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                style={{ marginLeft: "auto" }}
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {mode === "dark" ? "light mode" : "dark mode"}
            </Toolbar>
          </AppBar>

          <Switch>
            {/* Each route is case, eg. - case '/about': */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/Tic-Tac-Toe">
              <TicTacToe />
            </Route>
            <Route path="/Basicform">
              <Basicform />
            </Route>
            <Route path="/Dashboard">
              <Dashboard />
            </Route>
            <Route path="**">
              <Notfound />
            </Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

// tic-tac-toe game
function TicTacToe() {
  const { width, height } = useWindowSize();
  //in react we use map for looping in some cases
  //1.to create more gameboxes instead of give <GameBox /> 9 times here created array for looping because map needed array

  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  //create to maintain the turn system X or O

  const [isXTurn, setIsXTurn] = useState(true);

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //If winning condition present in board then we have a winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        console.log("Winner is :", board[a]);
        return board[a];
      }
    }
    return null;
  };

  const winner = decideWinner(board);

  const handleClick = (idx) => {
    console.log(idx);
    console.log(isXTurn ? "X" : "O");
    //if the board is click dont click again part
    // crete a copy of the board & then update( like updation part) the click
    if (winner === null && !board[idx]) {
      const boardCopy = [...board];
      boardCopy[idx] = isXTurn ? "X" : "O";
      setBoard(boardCopy);
      //Toggle Xturn
      setIsXTurn(!isXTurn);
    }
  };
  return (
    <div className="full-game">
      <div className="game-board">
        {winner ? <Confetti width={width} height={height} wind={0.3} /> : ""}
        {/* doubt is here why array didn't accept {} ,if it is used the error is map arrow function wants to return a value */}
        {board.map((val, idx) => (
          <GameBox value={val} onPlayerClick={() => handleClick(idx)} />
        ))}
        {/* onplayer click means when a player click the board the data is come rom GameBox->onplayerclick->and handleclick to change the value */}
      </div>
      {/* conditional rendering for from start the winner is no need to show in the window */}
      {winner ? <h1>Winner is : {winner}</h1> : ""}
    </div>
  );
}

function GameBox({ onPlayerClick, value }) {
  //to change the value of the box
  // const [val, setVal] = useState(null)
  ///to change the color of the value
  const styles = { color: value === "X" ? "red" : "skyblue" };
  return (
    <div
      className="game-box"
      // /*toggle between both the value here onclick is created for step1 */onClick={() => setVal(val === "X" ? "O" : "X")} we don't need the concept when onplayerclick is invoked for changing the Val X or O
      onClick={onPlayerClick}
      style={styles}
    >
      {value}
    </div>
  );
}

function Home() {
  return (
    <div>
      <h2>Home, Welcome All!!!</h2>
    </div>
  );
}
function Dashboard() {
  return (
    <div>
      <h2>Dashboard ***</h2>
    </div>
  );
}
function Notfound() {
  return (
    <div>
      <img
        src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
        alt=""
      />
    </div>
  );
}
// const validateForm = (values) => {
//   const errors = {};
//   console.log("validateForm", values);

//   if (values.email.length < 5) {
//     errors.email = "Please Provide a longer email";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9+=]+\.[A-Z]{2,}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (values.password.length < 8) {
//     errors.password = "Please provide a longer password";
//   } else if (values.password.length > 12) {
//     errors.password = "Please provide a shorter password";
//   }

//   console.log(errors);
//   return errors;
// };

const formvalidationSchema = Yup.object({
  email: Yup.string()
    .min(5, "You need a bigger email 🤣")
    .required("Why not fill this email 🤯")
    .email("Invalid email address"),
  // .matches(
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9+=]+\.[A-Z]{2,}$/i,
  //   "Pattern not matched"
  // ),
  password: Yup.string()
    .min(5, "You need a bigger password ")
    .max(12, "Too much password 🤣")
    .required("Why not fill this password 🤯"),
});
function Basicform() {
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      // validate: validateForm,
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        console.log("onSubmit", values);
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
        value={values.email}
        placeholder="Enter Your Email"
      />
      {errors.email && touched.email && errors.email}
      <input
        type="password"
        name="password"
        id="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        placeholder="Enter your Password"
      />
      {errors.password && touched.password && errors.password}
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
