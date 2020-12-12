import "./App.css";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/admin/"   component={Admin}/>
    </Router>
  );
}

export default App;
