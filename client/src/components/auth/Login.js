import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='mar_top'>
        <Card className="login_card">
          <CardContent>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Sign Into Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <TextField
                  className="input_width"
                  id='input-with-icon-grid'
                  label='Email Address'
                  type='email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className='form-group'>                
                <TextField
                  className="input_width"
                  id='input-with-icon-grid'
                  label='Password'
                  type='password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  minLength='6'
                />
              </div>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                value='Login'>
                Login
              </Button>
            </form>
            <p className='my-1'>
              Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
