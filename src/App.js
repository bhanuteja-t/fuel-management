import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import { isAuthenticated, SettingAuthenticateToken } from "./Auth";
import "semantic-ui-css/semantic.min.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Signin = React.lazy(() => import("./Auth/Signin"));
  function App(){
    return (
      <HashRouter>
        {SettingAuthenticateToken(isAuthenticated().token)}
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/"
              component = {Signin}
            />
            <Route
              path="/"
              component = {TheLayout}
            />
          </Switch>
        </React.Suspense>
     </HashRouter> 
    );
  }
export default App;