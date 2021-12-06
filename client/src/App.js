import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Challenges from "./components/Challenges";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Modal1 from "./components/Modal1";

function App() {
  const [get, setGet] = useState(() => {
    let savedTodos = sessionStorage.getItem("data");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  useEffect(() => {
    sessionStorage.setItem("data", JSON.stringify(get));
  }, [get]);
  return (
    <Router>
        <Modal1/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setGet={setGet}  />
        </Route>
        <Route exact path={`/${get._id}/challenges`}>
          <Challenges get={get}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
