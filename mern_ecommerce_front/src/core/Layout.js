import React from "react";
import Menu from "./Menu";
import "../assets/css/jumbotron.css";

const layout = ({
  title = "Title",
  description = "Description",
  children,
  className,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      {/* <h2 className="text-center mt-5">{title}</h2>
      <p className="text-center mt-3">{description}</p> */}
      <h1 className="display-4 text-center">{title}</h1>
      <p className="lead text-center">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default layout;
