import "./style.css";
import React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';


const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class Tweet extends React.Component {
  render() {
    return <div className="Tweet">
      <strong>You <small>@me</small></strong>
      <p>{this.props.content}</p>
      </div>;
  }
}

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stateitems: props.items };
  }

  handleOnTweet = (tweet) => {
    this.setState({ stateitems: this.state.stateitems.concat([tweet])})
  }

  render() {
    const items = this.props.items
    return <div className="Tweets">
      {this.state.stateitems.map(item =>
        <Tweet key={item} content={item} />)}
        <Tweetbox onNewTweet={this.handleOnTweet}/>
      </div>;
  }
}

class Tweetbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", stateitems: props.items };
  }

  handleOnFocus = () => {
    this.setState({ focused: true });
  }

  handleOnBlur = () => {
    this.setState({ focused: false });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value});
  }

  handleClick = () => {
    this.props.onNewTweet(this.state.value)
    this.setState({ value: "" });
  }

  render() {
    return <div className="Tweetbox">
      <textarea value={this.state.value} onChange={this.handleChange} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} placeholder="What's on your mind ?"></textarea>
      {(this.state.focused || this.state.value.length != 0) &&
        <div className="Tweetbox__actions">
          <span className="Tweetbox__counter">{140 - this.state.value.length}</span>
          <input disabled={this.state.value.length == 0} type="submit" value="Tweet" onClick={this.handleClick}/>
        </div>
      }
    </div>;
  }
}



//render(<Tweet content="This is my tweet"/>, document.getElementById('toto'));
render(<Tweets items={["ala","bala"]} />, document.getElementById('toto'));