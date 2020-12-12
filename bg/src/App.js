

// import Header from './components/Header/Header'
import 'antd/dist/antd.css'
// import {Row,Col} from 'antd'
import Index from './pages/Index/Index'
import List from './pages/List/List'
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import Detail from './pages/Detail/Detail';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index}></Route>
        <Route  path="/list/:typeName/:id" component={List}></Route>
        <Route  path="/detail/:id" component={Detail}></Route>
      </Switch>
    </Router>
  );
}

export default App;
