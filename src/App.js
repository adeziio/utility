import './App.css';
import NavBar from './components/navbar/NavBar';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Weather from './components/weather/Weather';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/home">
            <div>Home</div>
          </Route>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route exact path="/" render={() => (<Redirect to="/home" />)} />
          <Route exact path="/*" render={() => (<Redirect to="/home" />)} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
