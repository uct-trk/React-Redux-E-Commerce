import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';
import userTypes from './types'

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})


export const signInUser = ({email, password}) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        })
      } catch (err) {
          console.log(err)
      }
}

export const signUpUser = ({email, password, displayName, confirmPassword}) => async dispatch => {
    // password and confirm password dont match fail senario
    if (password !== confirmPassword) {
        const err = ["Password is not matching"];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        })
        return;
      }

      // success senario 
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload:true
        })
      } catch (err) {console.log(err)}
}

export const resetPassword = ({email}) => async dispatch => {

    const config = {
      url: "http://localhost:3000/login"
    }

    try {
        await auth.sendPasswordResetEmail(email, config)
          .then(() => {
            dispatch({
                type: userTypes.RESET_PASSWORD_SUCCESS,
                payload: true
            })
            
          })
          .catch(() => {
            const err = ["Email not Found!"];
            dispatch({
                type: userTypes.RESET_PASSWORD_ERROR,
                payload: err
            })
          })
      } catch (err) {
  
      }
}

export const signInWithGoogle = () => async dispatch => {
    try{
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload:true
            })
        })
    } catch(err){
        console.log(err)
    }
}

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})