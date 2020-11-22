import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
}));
function SideBar(props) {
  const { toggle, handleDrawerToggle, history } = props;
  const classes = useStyles();
  return (
    <nav aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          //container={container}
          variant="temporary"
          open={toggle}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <List>
            <ListItem button key="Book Event" onClick={() => history.push("/")}>
              <ListItemText primary="Book Event" />
            </ListItem>
            <ListItem
              button
              key="Show Events"
              onClick={() => history.push("/showEvents")}
            >
              <ListItemText primary="Show Events" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default withRouter(SideBar);
