import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../../config/config';
import { toast } from 'react-toastify';
import Loading from '../loading';
import { connect } from 'react-redux';
import {
  GetPanddingCourse,
  DeletePanddingCourse,
} from '../../redux/actions/course';

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

const ScrollableTabsButtonAuto = (props) => {
  const sty = useStyles();
  const history = useHistory();

  const [state, setState] = React.useState(null);

  useEffect(() => {
    props.GetPanddingCourse();
    if (props.panddingcourse === false) {
      setState([]);
    } else setState(props.panddingcourse);
  }, [props]);

  const edit = (e) => {
    console.log(e, 'edit');
    history.push(`/q-book/${e}`);
  };

  const remove = (e) => {
    console.log(e, 'remove');
    props.DeletePanddingCourse();
  };

  const listArray = state ? (
    state.length !== 0 ? (
      state.map((e, i) => (
        <ListItem key={e.id} button>
          <ListItemText
            primary={e.title}
            secondary={`Created at :${e.createdAt}, in ${e.subject} chapter name: ${e.chapter} `}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                remove(e.ID);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
            <IconButton>
              <EditIcon onClick={() => edit(e.ID)} />
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

ScrollableTabsButtonAuto.propType = {
  checkTeacher: PropTypes.func.isRequired,
  teacherAuth: PropTypes.object.isRequired,
};
const mapToState = (state) => ({
  panddingcourse: state.admin.panddingcourse,
});
const mapToProps = {
  GetPanddingCourse,
  DeletePanddingCourse,
};
export default connect(mapToState, mapToProps)(ScrollableTabsButtonAuto);
