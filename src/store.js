import { createStore, combineReducers, applyMiddleware } from 'redux';
import Axios from 'axios';
import thunkMiddleware from 'redux-thunk';

// API call to get posts
export const fetchPosts = () => async dispatch => {
  // If the API call is triggered on the server,
  // call the API server directly. When triggered from
  // browser, our proxy in package.json will handle the
  // request
  const isServer = typeof window === 'undefined';
  const url = isServer
    ? 'http://jsonplaceholder.typicode.com/posts'
    : '/api/posts';

  console.log(`Getting posts on ${isServer ? 'server' : 'browser'}`);

  // get the data
  const resp = await Axios.get(url);

  // dispatch action to save
  dispatch(storePostsAction(resp.data));
};

const storePostsAction = data => ({
  type: 'STORE_POSTS',
  posts: data
});

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_POSTS':
      return action.posts;
    default:
      return state;
  }
};

const reducer = combineReducers({
  // add more as needed
  posts: postsReducer
});

export default initialState =>
  createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
