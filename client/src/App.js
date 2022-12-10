import { Switch, Route } from 'react-router-dom';
import './App.css';
import CreatePage from './views/CreatePage';
import Details from './views/Details';
import Home from './views/Home';
import MainPage from './views/MainPage';
import PageNotFound from './views/PageNotFound';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/dogs">
          <MainPage />
        </Route>
        <Route exact path="/dogs/:id">
          <Details />
        </Route>
        <Route exact path="/create">
          <CreatePage />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
