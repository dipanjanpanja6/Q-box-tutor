import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';

import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const sty = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState(0);
  const edit = (e) => {
    console.log(e, 'edit');
    history.push(`/q-book/${e}`);
  };

  const listArray = Array.apply(null, { length: 12 }).map((e, i) => (
    <ListItem button>
      <ListItemText primary={`Question ${i + 1}`} secondary={i + i} />
      <ListItemSecondaryAction>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton>
          <EditIcon onClick={() => edit(i)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <div className={sty.root}>
      <List>{listArray}</List>
    </div>
  );
}
