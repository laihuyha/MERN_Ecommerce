import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./core/Menu";

const Routes = () => (
  <BrowserRouter>
    <div>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
    {/* <Menu />
    <Switch>
      <Route exact path="/" component={() => <h1>Home</h1>} />
      <Route path="/signin" component={() => <h1>Sign In</h1>} />
      <Route path="/signup" component={() => <h1>Sign Up</h1>} />
    </Switch> */}
  </BrowserRouter>
);

export default Routes;