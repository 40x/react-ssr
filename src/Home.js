import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from './store';
import './Home.css';

class Home extends Component {
  
  // DOES NOT WORK

  // state = {
  //   something: ''
  // };

  // WORKS 

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     something: ''
  //   };
  // }
  
  componentDidMount() {
    const { posts, fetchPosts } = this.props;

    // called only on client side
    // or other logical checks that
    // this data has not loaded already
    if (posts.length === 0) {
      fetchPosts();
    }
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h2 className="home">Home</h2>
        {posts.map(p => (
          <p key={p.id}>{p.title}</p>
        ))}
      </div>
    );
  }
}

// static declaration for SSR
// returns an array of actions to dispatch
Home.serverSideFetch = () => {
  return [
    fetchPosts,
    // other API calls needed
  ];
};

// map posts from redux store
const mapStateToProps = state => ({
  posts: state.posts
});

// map api call which can be conditionally triggered
const mapDispatchToProps = {
  fetchPosts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
