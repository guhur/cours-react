import React from 'react';

class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.state = { posts: [] }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then( res => res.json() )
    .then( json => this.setState({posts: json.splice(0, 5)}) )
  }

  render() {
    return (
      <div className="Posts">
        {
          this.state.posts.map( ( post, index) => (
            <div key={index}>
              <h1>{ post.title }</h1>
              <div>{ post.body }</div>
            </div>
          ) )
        }
      </div>
    );
  }
}

export default Posts;
