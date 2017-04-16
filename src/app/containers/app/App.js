import React, {
  Component,
  PropTypes
}                             from 'react';
import {
  NavigationBar,
  BackToTop
}                             from '../../components';
import navigationModel        from '../../models/navigation.json';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import * as viewsActions      from '../../redux/modules/views';
import * as userAuthActions   from '../../redux/modules/userAuth';
import { auth }                   from '../../services/auth';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { appConfig } from '../../config';

const LoginQuery = gql`
mutation Login($credential: LoginUserWithAuth0LockInput!) {
  loginUserWithAuth0Lock(input: $credential) {
    user {
      id
      username,
      email,
      isVerified
    }
  }
}
`;

const UpdateUserQuery = gql`
mutation UpdateUser($user: UpdateUserInput!) {
  updateUser(input: $user) {
    changedUser {
      id
      username
      picture,
      email,
      isVerified,
      fName,
      lName
    }
  }
}
`;

class App extends Component { 

  state = {
    navModel : navigationModel
  };

  constructor(props){
    super(props);
    auth.service.on('authenticated', this.onAuthenticated);
    auth.service.on('error', console.log);
  }

  componentDidMount() {
    const {
      actions: {
        checkIfUserIsAuthenticated
      }
    } = this.props;

    checkIfUserIsAuthenticated();
  }

  render() {
    const { navModel } = this.state;
    const { children, history, actions, isDrawerOpen, user } = this.props;

    const childrenWithProps = React.Children.map(children,
     (child) => React.cloneElement(child, {
       lockLogin: auth.service.login,
       showSignup: auth.service.showSignup,
       history,
       actions,
       user
     })
    );

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(appConfig.muiTheme)}>
        <div>
          <NavigationBar
            brand={navModel.brand}
            navModel={navModel}
            handleLeftNavItemClick={this.handleLeftNavItemClick}
            handleRightNavItemClick={this.handleRightNavItemClick}
            lockLogin={auth.service.login}
            history={history}
            isDrawerOpen={isDrawerOpen}
            actions={actions}
            user={user}
          />
        <h1>
        </h1>
          <div className="container-fluid">
            {childrenWithProps}
          </div>
          <BackToTop
            minScrollY={40}
            scrollTo={'appContainer'}
          />
        </div>
      </MuiThemeProvider>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    if (viewName === 'logout') {
      const {
        actions: {
          setUserLogout
        }
      } = this.props;
      setUserLogout();
    }
  }

  handleRightNavItemClick = (event, viewName) => {
    if (viewName === 'logout') {
      const {
        actions: {
          setUserLogout
        }
      } = this.props;
      setUserLogout();
    }
  }

  onAuthenticated = (auth0Profile, tokenPayload) => {
    const { actions, history } = this.props;
    auth0Profile.identities[0].userId = auth0Profile.identities[0].user_id;
    delete auth0Profile.identities[0].user_id;
    auth.setToken(tokenPayload.idToken);
    this.props.loginUser({
      identity: auth0Profile.identities[0],
      access_token: tokenPayload.idToken,
    }).then(res => {
      
      const scapholdUserId = res.data.loginUserWithAuth0Lock.user.id;
      const profilePicture = auth0Profile.picture;
      const nickname = auth0Profile.nickname;
      const email = res.data.loginUserWithAuth0Lock.user.email == null ? auth0Profile.email : res.data.loginUserWithAuth0Lock.user.email;
      let updatedUser = {
        id: scapholdUserId,
        picture: profilePicture,
        username: nickname || email,
        isVerified: auth0Profile.identities[0].isSocial || res.data.loginUserWithAuth0Lock.user.isVerified,
        email
      }
      console.log('Auth Profile: ', auth0Profile);
      if(auth0Profile.identities[0].isSocial){
        updatedUser = {
          ...updatedUser,
          fName: auth0Profile.given_name || '',
          lName: auth0Profile.family_name || '',
        }
      }
      return this.props.updateUser(updatedUser).then((res) => {
       
        actions.receivedUserLoggedIn(tokenPayload.idToken, res.data.updateUser.changedUser);
        history.push('/profile');
        auth.service.close();
      });

      // Cause a UI update :)
      //this.setState({});
    }).catch(err => {
      console.log(`Error updating user: ${err.message}`);
    });
  }
}

App.propTypes = {
  children:   PropTypes.node,
  history:    PropTypes.object,
  location:   PropTypes.object,
  actions:    PropTypes.object,

  user:       PropTypes.object.isRequired
};

const AppWithLogin = compose(
  graphql(LoginQuery, {
    props: ({ mutate }) => ({
      loginUser: (credential) => mutate({ variables: { credential: credential }}),
    })
  }),
  graphql(UpdateUserQuery, {
    props: ({ mutate }) => ({
      updateUser: (user) => mutate({ variables: { user: user }}),
    })
  })
)(App);

const mapStateToProps = (state) => {

  return {
    // views:
    isDrawerOpen: state.views.isDrawerOpen,
    // userAuth:
    user: {
      ...state.userAuth
    }
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    actions : bindActionCreators(
      {
        ...viewsActions,
        ...userAuthActions,
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithLogin);
