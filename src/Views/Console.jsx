import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import {
  Grid,
  CardActions,
  CardContent,
  Button,
  Divider,
  CardActionArea,
} from '@material-ui/core';
import { Theme } from './../theme';
import { Toolbar, makeStyles, Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkTeacher } from '../redux/actions/teacher';
import PropTypes from 'prop-types';

const styles = makeStyles((t) => ({
  header: {
    padding: 20,
  },
  total: {
    color: '#0d0',
  },
  card: {
    background: Theme.boxColor,
    color: '#fff',
    margin: 20,
    // padding: 12
  },
  title: {
    color: '#fff',
  },
}));

const Console = (props) => {
  const sty = styles();
  const history = useHistory();

  useEffect(() => {
    if (props.teacherAuth === null) {
      props.checkTeacher();
    }
  }, [props]);

  // const handleChange = (e) => {
  //   if (e == 'qbook') {
  //     history.push('/upload/qbook', props.teacherAuth);
  //   }
  //   if (e == 'qbank') {
  //     history.push('/upload/qbank', props.teacherAuth);
  //   }
  // };
  var item = [
    {
      title: 'Upload question for Q Book',
      header: 'Q Book',
    },
    {
      title: 'Upload question for Q Bank',
      header: 'Q Bank',
    },
    {
      title: 'Upload question for Weekly Test',
      header: 'Weekly Test',
    },
    {
      title: 'Upload question for Monthly Test',
      header: 'Monthly Test',
    },
  ];
  var handelRedirect = (e) => {
    switch (e) {
      case 'Q Book':
        history.push('/QBook');
        break;
      case 'Q Bank':
        history.push('/QBank');
        break;
      case 'Weekly Test':
        history.push('/WeeklyTest');
        break;
      case 'Monthly Test':
        history.push('/MonthlyTest');
        break;

      default:
        break;
    }
  };
  var CardData = item.map((p, i) => {
    return (
      <Card className={sty.card} key={i}>
        <CardActionArea
          onClick={() => {
            handelRedirect(p.header);
          }}
        >
          <CardContent>
            <Typography className={sty.title} gutterBottom>
              {p.title}
            </Typography>
            <Typography variant="h5" className={sty.title} component="h2">
              {p.header}
            </Typography>
            <Typography color="textSecondary">
              {/* total questions : 38 */}
            </Typography>
            <Typography variant="body2" className={sty.total} component="p">
              {/* Approve questions : 25  */}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <div
      style={{ minHeight: '100vh', backgroundColor: '#fff', paddingLeft: 57 }}
    >
      <Toolbar style={{ background: Theme.boxColor }} />
      <Typography variant="h5" color="textSecondary" className={sty.header}>
        Welcome User,
      </Typography>

      <Grid container style={{ padding: 20 }}>
        {CardData}
      </Grid>
      <Divider />
      <Grid container></Grid>
    </div>
  );
};

Console.propType = {
  checkTeacher: PropTypes.func.isRequired,
  teacherAuth: PropTypes.object.isRequired,
};
const mapToState = (state) => ({
  teacherAuth: state.admin.teacherAuth,
});
const mapToProps = {
  checkTeacher,
};
export default connect(mapToState, mapToProps)(Console);
