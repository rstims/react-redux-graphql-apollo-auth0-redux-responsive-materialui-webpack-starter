/* eslint no-unused-vars:0 */
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as userUpdateActions   from '../../redux/modules/userUpdate';
import { auth }               from '../../services/auth';
import { Profile }              from '../../views';
import gql                    from 'graphql-tag';
import { graphql }            from 'react-apollo';



/* -----------------------------------------
  GraphQL - Apollo client
 ------------------------------------------*/

const updateUser = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(input: $user) {
      user {
        id,
        email,
        username,
        picture,
        isVerified,
        fName,
        lName
        createdAt,
        modifiedAt,
        lastLogin
        
      }
    }
  }
`;

// 1- add queries:

// 2- add mutation "logUser":
const UpdateProfileMutate = graphql(
  updateUser,
  {
    name: 'updateProfileMutation',
    props: ({ ownProps, updateProfileMutation }) => ({
      updateUser(user) {
        ownProps.setMutationLoading();

        return updateProfileMutation(user)
          .then(
            (
              {
                data: {
                  updateUser
                }
              }
            ) => {
              ownProps.onUserUpdate(updateUser.token, updateUser.user);
              ownProps.unsetMutationLoading();
              return Promise.resolve();
            }
          )
          .catch(
            (error)=> {
              ownProps.onUserUpdateError(error);
              ownProps.unsetMutationLoading();
              return Promise.reject();
            }
          );
      }
    })
  }
)(Profile);


/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
  return {
    // user props:
    email: state.userUpdate.email,
    username: state.userUpdate.username,
    // views props:
    currentView:  state.views.currentView,
    // user Auth props:
    mutationLoading: state.userAuth.mutationLoading,
    // errors:
    error: state.userAuth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views actions:
      enterProfile: viewsActions.enterProfile,
      leaveProfile: viewsActions.leaveProfile,

      // userAuth actions:
      onUserUpdate: userUpdateActions.receivedUserUpdate,
      onUserUpdateError: userUpdateActions.errorUserUpdate,
      setMutationLoading: userUpdateActions.setLoadingStateForUserUpdate,
      unsetMutationLoading: userUpdateActions.unsetLoadingStateForUserUpdate,
      resetError: userUpdateActions.resetUpdateError
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfileMutate);
