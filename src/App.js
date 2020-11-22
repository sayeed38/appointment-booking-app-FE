import React from "react";
import {Switch, Route} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./components/navBar";
import BookEvents from "./components/bookEvents";
import ShowEvents from "./components/showEvents";
import SideBar from "./components/sideBar";

const useStyles = makeStyles((theme) => ({
  root : {
    display: "flex"
  }
}));

function App() {
  const classes = useStyles();
  const [toggle, setToggle] = React.useState(false);

  const handleDrawerToggle = () => {
    setToggle(!toggle);
  }
  
  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle}/>
      <div className={classes.root}>
      <SideBar toggle={toggle} handleDrawerToggle={handleDrawerToggle}/>
      <Switch>
        <Route path="/showEvents"><ShowEvents /></Route>
        <Route path="/" exact><BookEvents /></Route>
        {/* <Route component={Error}/> */}
      </Switch>
      </div>
    </>
  );
}

export default App;
