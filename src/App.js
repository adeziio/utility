import './App.css';
import NavBar from './components/navbar/NavBar';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Search from './components/search/Search';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route exact path="/" render={() => (<Redirect to="/search" />)} />
          <Route exact path="/*" render={() => (<Redirect to="/search" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
