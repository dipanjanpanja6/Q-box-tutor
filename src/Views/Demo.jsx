import React from 'react';
import { pxToVh, Theme } from '../theme';
import { makeStyles, Toolbar, AppBar, Tabs, Tab, Fab } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { TabPanel } from '@material-ui/lab';

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
    height: 500,
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
  released: {
    height: 40,
    backgroundColor: '#fff',
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    [t.breakpoints.down('xs')]: {
      width: '100%',
      margin: '8% 0',
    },
    [t.breakpoints.down('sm')]: {
      width: '70%',
      margin: '5% 0',
    },
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
  const [center, setCenter] = React.useState([4, 5, 6, 7]);
  const [right, setRight] = React.useState([8, 9, 10, 11]);

  const leftChecked = intersection(checked, left);
  const centerChecked = intersection(checked, center);
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
    setRight(right.concat(left, center));
    setLeft([]);
    setCenter([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked, centerChecked));
    setLeft(not(left, leftChecked));
    setCenter(not(center, centerChecked));
    setChecked(not(checked, leftChecked));
    setChecked(not(checked, centerChecked));
  };

  const handleCheckedLeft = () => {
    const forleft = rightChecked.filter((item) => item < 11);
    const forcenter = rightChecked.filter((item) => item > 10);
    setLeft(left.concat(forleft));
    setCenter(center.concat(forcenter));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    const forleft = right.filter((item) => item < 11);
    const forcenter = right.filter((item) => item > 10);
    setLeft(left.concat(forleft));
    setCenter(center.concat(forcenter));
    setRight([]);
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  const customListLeft = (left, center) => (
    <Paper className={classes.paper}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        style={{ backgroundColor: 'white' }}
      >
        <Tab label="Q Bank" {...a11yProps(1)} />
        <Tab label=" Weekly Test" {...a11yProps(2)} />
      </Tabs>
      {value === 0 && (
        <List dense component="div" role="list">
          {left.map((value) => {
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
      )}
      {value === 1 && (
        <List dense component="div" role="list">
          {center.map((value) => {
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
      )}
    </Paper>
  );
  const customListRight = (items) => (
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
        <Toolbar style={{ background: Theme.boxColor, width: '100%' }} />
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          className={classes.content}
        >
          <Grid item>{customListLeft(left, center)}</Grid>
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
          <Grid item>{customListRight(right)}</Grid>
        </Grid>
        <Grid
          container
          justify="flex-end"
          style={{ paddingBottom: 22, paddingTop: 12, paddingRight: 32 }}
        >
          <Fab
            variant="extended"
            classes={{ label: classes.label }}
            className={classes.released}
            // onClick={submit}
          >
            Submit
          </Fab>
        </Grid>
      </Grid>
    </>
  );
};

export default Qbank;
