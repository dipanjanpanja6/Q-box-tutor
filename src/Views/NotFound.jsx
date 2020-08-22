import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Theme } from '../theme';
import BadRequest from '../static/404.svg';

import { makeStyles, Toolbar } from '@material-ui/core';
import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

const styles = makeStyles((t) => ({
  root: {
    // width: '100%',
    // background: Theme.boxColor,
    // height: 'calc(100vh - 64px)',
    height: '100vh',
    // padding:90
    // overflow: 'auto',
  },
}));

export default function NotFound() {
  //   const history = useHistory();

  //   const register = () => {
  //     history.push('/signup');
  //   };

  const classes = styles();
  useEffect(() => {
    document.title = "Page not found | Qrioctybox"
  }, [])

  return (
    <>
      <Grid className={classes.root}>
        <Toolbar style={{ background: Theme.boxColor }} />
        <Grid container justify="center" alignItems="center">
          <img
            style={{ height: '80vh', maxWidth: '100vw', width: 'auto' }}
            src={BadRequest}
            alt=""
          />
        </Grid>
      </Grid>
    </>
  );
}
