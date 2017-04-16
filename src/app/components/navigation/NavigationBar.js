import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { StyleSheet } from 'redux-responsive/react';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const zDepth = 1;

const Login = (props) => (
    <FlatButton 
    onClick={() => props.handleLogin()} 
    style={props.style} 
    label="Login" />
);


Login.muiName = 'FlatButton';

const Logged = (props) => (
  <div>
  
  <IconMenu
    iconButtonElement={
      <div>
        <span style={{color:'#fff', paddingRight:'5px'}}>{props.user.email}</span>
        <Avatar
          src={props.user.picture}
          size={30}
        />
      </div>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    style={{paddingTop:'9px', cursor:'pointer'}}
  >
    <MenuItem primaryText="Profile" onTouchTap={() => props.history.push('/profile')} />
    <MenuItem primaryText="Sign out" onClick={() => props.handleLogout(props.history.push)} />
  </IconMenu>
  </div>
);

Logged.muiName = 'IconMenu';

const stylesheet = {
    appBarHeading: {
        _lessThan_medium: {
            fontSize: '16px',
        },
        _lessThan_small: {
            fontSize: '12px',
        }
    }
}

const NavigationBar = ({
  styles,
  brand,
  navModel,
  isDrawerOpen,
  user,
  history,
  actions,
  lockLogin
}) => {
  return (
    <div>
        <AppBar
          style={{position: 'fixed',top: 0,overflowY: 'hidden',}}
          zDepth={zDepth}
          titleStyle={styles.appBarHeading}
          title="Drink VA Beer"
          onTitleTouchTap={() => history.push('/')}
          iconElementRight={user.isAuthenticated ? <Logged history={history} user={user} handleLogout={actions.setUserLogout} /> : <Login handleLogin={() => lockLogin()} />}
          onLeftIconButtonTouchTap={() => actions.toggleDrawer(isDrawerOpen)}
        />
          <Drawer
            docked={false}
            width={200}
            open={isDrawerOpen}
            onRequestChange={() => actions.toggleDrawer(isDrawerOpen)}
          >
            <div style={{height:'50px', backgroundColor:'#bf1e2e'}}></div>
            <List>
              <ListItem primaryText="Home" onTouchTap={() => {history.push('/')}} />
            </List>
          </Drawer>
      </div>
  );
};

NavigationBar.propTypes = {
  brand:                    PropTypes.string,
  user:                     PropTypes.object.isRequired,
  handleLeftNavItemClick:   PropTypes.func,
  handleRightNavItemClick:  PropTypes.func,
  navModel:                 PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  })
};

NavigationBar.defaultProps  = {
  brand  : 'brand'
};

export default StyleSheet(stylesheet)(NavigationBar);
