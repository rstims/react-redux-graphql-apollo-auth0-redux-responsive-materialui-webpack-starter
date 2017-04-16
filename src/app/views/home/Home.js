import React, {
  Component,
  PropTypes
}                     from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Link }       from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {StyleSheet} from 'redux-responsive/react'

const stylesheet = {
    loginButton:{
      buttonStyle:{
        height: 'auto',
      },
      overlayStyle:{
        minWidth: '200px',
        padding: '30px 50px',
        height: 'auto',
      },
      rippleStyle:{
        height: 'auto',
      },
      style: {
        marginBottom: '20px',
      }
    }
}

class Home extends Component {

  state = {
    animated: true,
    viewEntersAnim: true
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    leaveHome();
  }

  render() {
    const { animated, viewEntersAnim } = this.state;
    const { user } = this.props;

    return(
      <div key="homeView" style={{display: 'flex', alignItems: 'center', height: '70vh', justifyContent: 'center'}}>
        {!user.isAuthenticated && <div style={{display: 'flex-item'}}>
            <RaisedButton 
              onClick={() => this.props.lockLogin()}
              label="Login" 
              primary={true} 
              style={this.props.styles.loginButton.style}
              buttonStyle={this.props.styles.loginButton.buttonStyle}
              overlayStyle={this.props.styles.loginButton.overlayStyle}
              rippleStyle={this.props.styles.loginButton.rippleStyle} />
            <div></div>
            <RaisedButton 
              onClick={() => {this.props.lockLogin('signUp');}}
              label="Register" 
              primary={true} 
              buttonStyle={this.props.styles.loginButton.buttonStyle}
              overlayStyle={this.props.styles.loginButton.overlayStyle}
              rippleStyle={this.props.styles.loginButton.rippleStyle} />
        </div>}
      </div>
    );
  }
}

Home.propTypes= {
  // view props:
  currentView:  PropTypes.string.isRequired,
  // view actions:
  enterHome:    PropTypes.func.isRequired,
  leaveHome:    PropTypes.func.isRequired
};

export default StyleSheet(stylesheet)(Home);
