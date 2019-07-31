import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '100px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0'
      }}
      alt='Loading...'
    />
  </Fragment>
);
