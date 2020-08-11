import React from 'react';
import { pxToVh, Theme } from '../../theme';
import { makeStyles } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = makeStyles((t) => ({
  root: {
    margin: 'auto',
    background: Theme.boxColor,
  },
  content: {
    margin: 'auto',
    backgroundColor: 'white',
    // width: '80%',
    paddingTop: 12,
    paddingBottom: 12,
    [t.breakpoints.down('xs')]: {
      width: '95%',
      paddingLeft: 22,
    },
  },
  paper: {
    width: pxToVh(780),
    height: 530,
    overflow: 'auto',
    background: Theme.boxColor,
    boxShadow: `10px 10px 14px 1px rgba(00,00,00,0.2)`,
    // height: '100%',
    // width: '100%',
    borderRadius: pxToVh(80),
    [t.breakpoints.down('md')]: {
      width: pxToVh(600),
      height: 530,
    },
    [t.breakpoints.down('sm')]: {
      width: pxToVh(500),
      height: 530,
    },
    [t.breakpoints.down('xs')]: {
      // borderRadius: 111,
      width: 200,
      height: 230,
      borderRadius: pxToVh(70),
    },
  },
  buttonGroup: {
    [t.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  button: {
    margin: t.spacing(0.5, 0),
    backgroundColor: '#fff',
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    // [t.breakpoints.down('xs')]: {
    //   width: '100%',
    //   margin: '8% 0',
    // },
    // [t.breakpoints.down('sm')]: {
    //   width: '70%',
    //   margin: '5% 0',
    // },
  },
  label: {
    color: Theme.textColor.heading,
    fontWeight: 'thin',
    padding: '0 12px',
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}
const Qbank = () => {
  const classes = styles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`List item ${value + 1}`}
                style={{ color: 'white' }}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="baseline"
        style={{ backgroundColor: '#fff' }}
      >
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid item>{customList(left)}</Grid>
          <Grid item className={classes.buttonGroup}>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                classes={{ label: classes.label }}
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                size="small"
                classes={{ label: classes.label }}
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                classes={{ label: classes.label }}
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                classes={{ label: classes.label }}
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Qbank;
