/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'
import EventEmitter from 'events';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: { 
        redirect: false,
        sso:false
      },
      theme: {
        logo: 'https://drinkvabeer.com/dvb/wp-content/uploads/2015/02/bvb_logo.png',
        primaryColor: '#bf1e2e'
      },
      languageDictionary: {
        emailInputPlaceholder: "something@youremail.com",
        title: "Login"
      },
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(tokenPaylod){
    this.lock.getUserInfo(tokenPaylod.accessToken, (error, profile) => {
      if (error) {
        this.emit('error', error);
        return;
      }

      this.profile = profile;
      this.emit('authenticated', profile, tokenPaylod);
    });

    // Saves the user token
    this.token = tokenPaylod.idToken;
  }

  close() {
    // Call the show method to hide the widget.
    this.lock.hide()
  }

  login(initialScreen = 'login') {
    // Call the show method to display the widget.
    this.lock.show({ initialScreen: initialScreen });
  }

  logout() {
    localStorage.clear();
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }
}
