import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
/* ------------- Types and Action Creators ------------- */
const {Types, Creators} = createActions({
  signUp: ['email', 'password', 'name', 'username', 'navigation'],
  signUpSuccess: {
    email: null,
    username: null,
    name: null,
    success: false
  },
  login: ['email', 'password', 'navigation'],
  loginSuccess: {
    email: null,
    isLoggedIn: false,
  },
  loadUser: ['name', 'username'],
  userTweets: ['tweets'],
  feedTweets: ['feed'],
  allFollowers: ['followers'],
  allUsers: ['users'],
  signOut: ['navigation'],
  signOutSuccess: null,
});
export const UserTypes = Types;
export default Creators;
export type UserType = 'user' | 'tasker';
/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  email: null,
  password: null,
  name: null,
  username: null,
  loading: false,
  loginType: null,
  isLoggedIn: false,
  tweets: [],
  feed: [],
});

/* ------------- Reducers ------------- */
export const signUpUser = (state = INITIAL_STATE, {email, name, username}) => ({
  ...state,
  email,
  name,
  username
});
export const loginUser = (state = INITIAL_STATE, {email}) => ({
  ...state,
  email,
  isLoggedIn: true,
});
export const loadUser = (state = INITIAL_STATE, { name, username }) => ({
  ...state,
  name,
  username
})
export const userTweets = (state = INITIAL_STATE, { tweets }) => ({
  ...state,
  tweets,
});
export const addFeedTweets = (state = INITIAL_STATE, { feed }) => ({
  ...state,
  feed,
});
export const allFollowers = (state = INITIAL_STATE, { followers }) => ({
  ...state,
  followers,
});
export const allUsers = (state = INITIAL_STATE, { users }) => ({
  ...state,
  users,
});
export const signOutUser = () => Immutable.merge(INITIAL_STATE, {});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_SUCCESS]: signUpUser,
  [Types.LOGIN_SUCCESS]: loginUser,
  [Types.LOAD_USER]: loadUser,
  [Types.SIGN_OUT_SUCCESS]: signOutUser,
  [Types.USER_TWEETS]: userTweets,
  [Types.FEED_TWEETS]: addFeedTweets,  
  [Types.ALL_USERS]: allUsers,
  [Types.ALL_FOLLOWERS]: allFollowers,
});
