import React from 'react';

class ChannelLoginForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error   : null,
      name    : null,
      password: null,
    };
    this.handleInput = this.handleInput.bind(this);
    this.loginToChannel = this.loginToChannel.bind(this);
  }
  handleInput (event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }
  loginToChannel (event) {
    event.preventDefault();
    const params = `username=${this.state.name}&password=${this.state.password}`;
    const url = '/login';
    const that = this;
    this.props.makePostRequest(url, params)
      .then(result => {
        that.props.updateLoggedInChannelOutsideReact(result.channelName, result.channelClaimId, result.shortChannelId);
        that.props.updateUploaderState('loggedInChannelName', result.channelName);
        that.props.updateUploaderState('loggedInChannelShortId', result.shortChannelId);
        that.props.selectOption(result.channelName);
      })
      .catch(error => {
        console.log('login error', error);
        if (error.message) {
          that.setState({'error': error.message});
        } else {
          that.setState({'error': 'There was an error logging into your channel'});
        }
      });
  }
  render () {
    return (
      <form id="channel-login-form">
        <p id="login-error-display-element" className="info-message-placeholder info-message--failure">{this.state.error}</p>
        <div className="row row--wide row--short">
          <div className="column column--3 column--sml-10">
            <label className="label" htmlFor="channel-login-name-input">Name:</label>
          </div><div className="column column--6 column--sml-10">
          <div className="input-text--primary flex-container--row flex-container--left-bottom">
            <span>@</span>
            <input type="text" id="channel-login-name-input" className="input-text" name="name" placeholder="Your Channel Name" value={this.state.channelName} onChange={this.handleInput}/>
          </div>
        </div>
        </div>
        <div className="row row--wide row--short">
          <div className="column column--3 column--sml-10">
            <label className="label" htmlFor="channel-login-password-input" >Password:</label>
          </div><div className="column column--6 column--sml-10">
          <div className="input-text--primary">
            <input type="password" id="channel-login-password-input" name="password" className="input-text" placeholder="" value={this.state.channelPassword} onChange={this.handleInput}/>
          </div>
        </div>
        </div>

        <div className="row row--wide">
          <button className="button--primary" onClick={this.loginToChannel}>Authenticate</button>
        </div>
      </form>
    );
  }
}

module.exports = ChannelLoginForm;