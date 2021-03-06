import React from 'react';
import { withRouter } from 'react-router-dom';
import './forms.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/login');
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props
      .signup(user, this.props.history)
      .then(() => {
        if (!this.props.errors) this.props.history.push('/');
      })
      .then(() => this.props.closeModal());
  }

  loginDemoUser() {
    let user = {
      email: 'pinner@pinners.com',
      password: 'password'
    };
    this.props
      .login(user, this.props.history)
      .then(() => {
        if (!this.props.errors.length) {
          this.props.closeModal();
          this.props.history.push('/');
        }
      })
      .then(() => this.props.fetchUserBoards(this.props.userId));
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='form-container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form'>
            <input
              type='text'
              value={this.state.email}
              onChange={this.update('email')}
              placeholder='Email'
            />
            <input
              type='text'
              value={this.state.username}
              onChange={this.update('username')}
              placeholder='Username'
            />
            <input
              type='password'
              value={this.state.password}
              onChange={this.update('password')}
              placeholder='Password'
            />
            <input
              type='password'
              value={this.state.password2}
              onChange={this.update('password2')}
              placeholder='Confirm Password'
            />
            <input type='submit' value='Sign up' />
            <button onClick={this.loginDemoUser}>Demo</button>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
