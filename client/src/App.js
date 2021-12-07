import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Challenges from "./components/Challenges";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
  const [get, setGet] = useState(() => {
    return JSON.parse(sessionStorage.getItem("data"));
  });
  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(get));
  }, [get]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setGet={setGet} />
        </Route>
        <Route exact path={`/${get}/challenges`}>
          <Challenges get={get}/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
