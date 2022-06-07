import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Search from './components/Search';
import "./css/style.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Search />
          </Route>
          <Route exact path="/*" render={() => (<Redirect to="/" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
