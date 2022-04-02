import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Sigin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import PrivateRoute from "./auth/PrivateRoute";
import Dashboard from "./user/UserDashboard";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        {/* //PrivateRoute is a Route that specifies the path to the component that will be rendered for specific user
        //PrivateRoute is a Route that only allows access to the user if they are logged in */}
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        {/*AdminRoute same PrivateRoute but for Admin */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
