import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='mar_top'>
        <Card className='login_card'>
          <CardContent>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
              <i className='fas fa-user' /> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <TextField
                  className='input_width'
                  type='text'
                  label='Name'
                  name='name'
                  value={name}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <TextField
                  className='input_width'
                  type='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
                <small className='form-text input_width'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <TextField
                  className='input_width'
                  type='password'
                  label='Password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <TextField
                  className='input_width'
                  type='password'
                  label='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={e => onChange(e)}
                />
              </div>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                value='Register'
              >
                Register
              </Button>
            </form>
            <p className='my-1'>
              Already have an account? <Link to='/login'>Sign In</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
