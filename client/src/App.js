import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Challenges from "./components/Challenges";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/Alert";

function App() {
  const [get, setGet] = useState(() => {
    return JSON.parse(sessionStorage.getItem("data"));
  });
  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(get));
  }, [get]);

  const [alert, setAlert] = useState({
    color: null,
    message: null,
  });
  const showAlert = (res) => {
    const show = res.split(":");
    setAlert({
      color: show[0],
      message: show[1],
    });
    setTimeout(() => {
      setAlert({
        color: null,
        message: null,
      });
    }, 3000);
  };
  return (
    <Router>
        <Alert color={alert.color} message={alert.message} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setGet={setGet} showAlert={showAlert} />
        </Route>
        <Route exact path={`/${get}/challenges`}>
          <Challenges get={get} showAlert={showAlert} />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
