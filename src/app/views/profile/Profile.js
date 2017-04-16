import React, {
  Component,
  PropTypes
}                     from 'react';
import cx             from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import { Link }       from 'react-router';
import { ErrorAlert } from '../../components';

class Profile extends Component {

  state = {
    animated: true,
    viewEntersAnim: true,

    email: this.props.email || '',
    username: this.props.username || '',
  };

  componentDidMount() {
    const { enterProfile } = this.props;
    enterProfile();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    const { leaveProfile } = this.props;
    leaveProfile();
  }

  render() {
    const {
      animated,
      viewEntersAnim,
      email,
      username
    } = this.state;
    const {
      mutationLoading,
      error
    } = this.props;

    return(
      <div className={
        cx({
          'animatedViews': animated,
          'view-enter': viewEntersAnim
        })}>
        <div className="row">
          <ErrorAlert
            showAlert={!!error}
            errorTitle={'Error'}
            errorMessage={error ? error.message : ''}
            onClose={this.closeError}
          />
          <div className="col-md-8 col-md-offset-2">
            <form
              className="form-horizontal"
              noValidate>
              <fieldset>
                <legend>
                  Edit Profile
                </legend>
                <div className="form-group">
                  <label
                    htmlFor="inputEmail"
                    className="col-lg-2 control-label">
                    Email
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                      // autoComplete="nofill"
                      // role="presentation"
                      value={email}
                      onChange={this.handlesOnEmailChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button
                      className="btn btn-primary login-button"
                      disabled={mutationLoading}
                      onClick={this.handlesOnUpdate}>
                      Update
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
            
          </div>
        </div>

      </div>
    );
  }

  handlesOnEmailChange = (event) => {
    event.preventDefault();
    // should add some validator before setState in real use cases
    this.setState({ email: event.target.value });
  }

  handlesOnUsernameChange = (event) => {
    event.preventDefault();
    // should add some validator before setState in real use cases
    this.setState({ username: event.target.value });
  }

  handlesOnUpdate = (event) => {
    event.preventDefault();
    const { updateUser } = this.props;
    const { email, username } = this.state;

    const variables = {
      user: {
        email: email,
        username: username,
      }
    };

    updateUser({variables})
      .then(res => console.log(res))
      .catch(err => console.log('login went wrong... ', err));
  }

  closeError = (event) => {
    event.preventDefault();
    const { resetError } = this.props;
    resetError();
  }
}

Profile.propTypes= {
  // views props:
  currentView:  PropTypes.string.isRequired,
  enterProfile:    PropTypes.func.isRequired,
  leaveProfile:    PropTypes.func.isRequired,
  // apollo props:
  user: PropTypes.shape({
    username: PropTypes.string
  }),

  // auth props:
  mutationLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,

  // apollo actions
  updateUser: PropTypes.func.isRequired,

  // redux actions
  onUserUpdate: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired
};


export default Profile;
