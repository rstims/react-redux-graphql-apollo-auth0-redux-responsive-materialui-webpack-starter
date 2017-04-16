import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import {
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

export const appConfig = {
  // apollo client:
  apollo: {
    networkInterface: 'https://us-west-2.api.scaphold.io/graphql/handsomely-sidewalk' // exemple: http://localhost:8080/graphql
  },
  auth0: {
  	clientId: 'utrv2o60nrqaYLlT0RBtho6Iw7S1iR16',
  	domain: 'northmedia.auth0.com',
  },
  muiTheme: {
	  spacing: spacing,
	  fontFamily: 'Roboto, sans-serif',
	  palette: {
	    primary1Color: '#bf1e2e',
	    primary2Color: '#bf1e2e',
	    primary3Color: grey400,
	    accent1Color: '#bf1e2e',
	    accent2Color: grey100,
	    accent3Color: grey500,
	    textColor: darkBlack,
	    alternateTextColor: white,
	    canvasColor: white,
	    borderColor: grey300,
	    disabledColor: fade(darkBlack, 0.3),
	    pickerHeaderColor: '#bf1e2e',
	    clockCircleColor: fade(darkBlack, 0.07),
	    shadowColor: fullBlack,
	  },
	  appBar: {
	    height: 50,
	  },
	}
};
