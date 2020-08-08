import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';
import {Skeleton} from '@material-ui/lab'
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../../config/config';
import { toast } from 'react-toastify';
import Loading from '../loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  skeleton:{
    width:'100%'
  }
}));

export default function ScrollableTabsButtonAuto() {
  const sty = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState(); 
useEffect(() => { 
    fetch(`${url}/api/course/teacher/getqbookrejectedquestion`, {
      method: 'GET',
      credentials: 'include',
    }).then(res => {
      res.json().then(d => {
        console.log(d);
        d.success && setState(d.data)
        d.error && setState([])
        d.error && toast.warn(d.message)
      })
    }).catch(r => {
      console.log(r);
      toast.error('Something went wrong ! Try again')
    })
  }, [])
  const edit = (e) => {
    console.log(e, 'edit');
    history.push(`/q-book/${e}`);
  };
  const remove = (e) => {
    
    console.log(e, 'remove');
    fetch(`${url}/api/course/teacher/getqbookrejectedquestion/${e}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(res => {
      res.json().then(d => {
        console.log(d);
        toast.error(d.message)
      })
    }).catch(r => {
      console.log(r);
      toast.error('Something went wrong ! Try again')
    })
  };

  // const listArray = Array.apply(null, { length: 12 }).map((e, i) => (
  const listArray = state?state.length!==0? state.map((e, i) => (
    <ListItem key={e.id} button>
      <ListItemText primary={e.title} secondary={`Created at :${e.createdAt}, in ${e.subject} chapter name: ${e.chapter} `} />
      <ListItemSecondaryAction>
        <IconButton onClick={()=>{remove(e.ID)}}>
          <DeleteForeverIcon />
        </IconButton>
        <IconButton>
          <EditIcon onClick={() => edit(e.ID)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )):<div className={sty.skeleton}>
  <Skeleton width={240}/>
  <Skeleton animation={false} />
  <Skeleton animation="wave" />
</div>;

  return (
    <div className={sty.root}>
      <List>{listArray}</List>
    </div>
  );
}
