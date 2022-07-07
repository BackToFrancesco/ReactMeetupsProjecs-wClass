import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <MainNavigation />
        <main className={classes.main}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
