import Microfrontend from './components/micro-frontend'
import AnotherPage from './components/another-page'
import {
    Switch,
    Route,
  } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" exact>
                    <Microfrontend />
                </Route>
                <Route path="/zbookings">
                    <Microfrontend />
                </Route>
                <Route path="/listing" exact>
                    <Microfrontend />
                </Route>
                <Route path="/another-page" exact>
                    <AnotherPage />
                </Route>
            </Switch>
        </div>
    )
}

export default App
