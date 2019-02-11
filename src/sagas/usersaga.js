import {call, put, fork, takeLatest, select} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {startSubmit, stopSubmit} from 'redux-form';
import firebase from 'react-native-firebase';
import UserActions, {UserTypes} from '../reducers/userstore';

function* signUpUser({email, password, name, username, navigation}) {
  try {
    yield call(() =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          success = true;
        })
        .catch(error => {
          success = 'error';
          Alert.alert('SignUp Failed', 'Email address is already in use');
        })
    );

    yield call(() =>
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('LoginScreen');

          firebase
            .firestore()
            .collection('users')
            .doc(email)
            .set(
              {
                name: name,
                email: email,
                username: username
              },
              {
                merge: true
              }
            )
            .catch(error => console.log('Catch', error));
        } else {
          console.log('User Not logged in');
        }
      })
    );

    yield put(
      UserActions.signUpSuccess({
        email,
        username,
        name,
        success: true
      })
    );
  } catch (error) {
    console.log('ERROR', error);
  }
}

function* loginUser({email, password, navigation}) {
  try {
    yield call(() =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              firebase
                .firestore()
                .collection('users')
                .doc(email)
                .get()
                .then(querySnapshot => {
                  if (querySnapshot.exists) {
                    // console.log(querySnapshot.data());
                    navigation.navigate('HomeScreen');
                  }
                })
                .catch(err => console.log(err));
            } else {
              console.log('Not logged in');
            }
          });
        })
        .catch(err => {
          console.log(err);
          const code = err.code;
          if (code === 'auth/user-not-found') {
            Alert.alert('Login failed', 'User does not exist');
          } else if (code === 'auth/wrong-password') {
            Alert.alert('Login failed', 'Password is Incorrect');
          }
        })
    );

    yield put(
      UserActions.loginSuccess({
        email,
        isLoggedIn: true
      })
    );
  } catch (error) {
    yield put(stopSubmit('login'));
    console.log('ERR', error);
  }
}

function* signOut({navigation}) {
  try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          navigation.navigate('Login');
          console.log("Sign Out Success");
        })
        .catch(err => {
          console.log(err);
        });
    navigation.navigate("Login");
    yield put(UserActions.signOutSuccess());
  } catch (err) {
    console.log(err);
  }
}

function* signUpUserListener() {
  yield takeLatest(UserTypes.SIGN_UP, signUpUser);
}

function* loginUserListener() {
  yield takeLatest(UserTypes.LOGIN, loginUser);
}

function* signOutUserListener() {
  yield takeLatest(UserTypes.SIGN_OUT, signOut);
}

export default function* userSagas() {
  yield fork(signUpUserListener);
  yield fork(loginUserListener);
  yield fork(signOutUserListener);
}
