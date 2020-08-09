import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { GetRejectCourse, DeleteCourse } from '../../redux/actions/course';
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  skeleton: {
    width: '100%',
  },
}));

const AlertQbook = (props) => {
  const sty = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState(null);

  useEffect(() => {
    props.GetRejectCourse(props.name);
  }, []);

  useEffect(() => {
    if (props.panddingcourse) {
      setState(props.panddingcourse);
    }
  }, [props]);

  const edit = (e) => {
    history.push(`/${props.name}/${e}`);
  };

  const remove = (e) => {
    if (
      window.confirm(
        'Are you sure you want to delete this questions. This action can not be undone.'
      )
    ) {
      props.DeleteCourse(props.name, e);
    } else {
      return;
    }
  };

  const listArray = state ? (
    state.length !== 0 ? (
      state.map((e, i) => (
        <ListItem key={e.ID} button>
          <ListItemText
            primary={e.title}
            secondary={
              <Typography color="textSecondary" variant="body2">
                Created at :{e.createdAt}, in {e.subject} chapter name:{' '}
                {e.chapter}
                <br />
                Rejecting Comment is "{e.rejectingcomment}"
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                remove(e.ID);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
            <IconButton onClick={() => edit(e.ID)}>
              <VisibilityIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))
    ) : (
      <Typography>No questions are rejected.</Typography>
    )
  ) : (
    <div className={sty.skeleton}>
      <Skeleton width={240} />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );

  return (
    <div className={sty.root}>
      <List>{listArray}</List>
    </div>
  );
};

AlertQbook.propType = {
  GetRejectCourse: PropTypes.func.isRequired,
  DeleteCourse: PropTypes.func.isRequired,
  panddingcourse: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
const mapToState = (state) => ({
  panddingcourse: state.admin.rejectQBook,
});
const mapToProps = {
  GetRejectCourse,
  DeleteCourse,
};
export default connect(mapToState, mapToProps)(AlertQbook);
