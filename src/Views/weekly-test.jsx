import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { pxToVh, Theme } from './../theme';
import CardComponent from '../Components/cardEmbossed';
import {
  Toolbar,
  Box,
  Typography,
RadioGroup,
FormControlLabel,
Radio,
} from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../config/config';

import { connect } from 'react-redux';
import { checkTeacher } from '../redux/actions/teacher';
import PropTypes from 'prop-types';
import Loading from '../Components/loading';
import { useHistory, useParams } from 'react-router-dom';
import Progress from '../Components/circularProgressBar';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorJS from '../Components/edit/Readeditor';

const style = makeStyles((t) => ({
  content: {
    width: "95%",
    // minHeight:'100vh',
    // backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 50,
    marginRight: 20,
    padding:12,
    [t.breakpoints.down("sm")]: {
      marginLeft: 50,
    },
    [t.breakpoints.down("xs")]: {
      padding: 12,
    },
  },
  checkbox: {
    color: "white",
  },
  button: {
    background: Theme.textColor.color1,
    marginBottom: 12,
    width: 150,
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    [t.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  buttonLabel: {
    color: Theme.textColor.heading,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  options: {
    [t.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  question: {
    minHeight: "40%",
    width: "100%",
    alignItems: "center",
    padding: "5% 5% 12px",
    [t.breakpoints.down("xs")]: {
      paddingBottom: 12,
      paddingLeft: "8%",
    },
  },
  directionIcon: {
    color: Theme.textColor.color1,
    fontSize: 40,
    cursor: "pointer",
    padding: 0,
    margin: 0,
  },
  questionNumberStyle: {
    display: "flex",
    alignItems: "center",
  },
  practiceNumberStyle: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  numOfQueStyle: {
    color: Theme.textColor.color1,
    [t.breakpoints.down("sm")]: {
      fontSize: 15,
      margin: 0,
      padding: 0,
    },
  },
  radioButtonStyle: {
    color: Theme.textColor.color1,
    backgroundColor: "#fff",
    marginRight: 15,
    padding: 0,
  },
  radioGroupStyle: {
    padding: 0,
    width: "100%",
  },
  optionContainer: {
    width: "100%",
    marginLeft: "5%",
    marginRight: "5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [t.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  radioLabelStyle: {
    color: Theme.textColor.color1,
    marginTop: 15,
  },
  videoContainer: {
    width: "35%",
    backgroundColor: Theme.textColor.color1,
    // borderRadius: 16,
    boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
    borderRadius: pxToVh(80),
    border: "solid 7px blueviolet",
    overflow: "hidden",
    [t.breakpoints.down("xs")]: {
      borderRadius: pxToVh(60),
    },
    [t.breakpoints.down("md")]: {
      marginTop: "25px",
      width: "60%",
    },
    [t.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
}));

const WeeklyTest = (props) => {
  const classes = style();
  const history = useHistory();
  var { id } = useParams();

  const [questionData,SetquestionData] = React.useState([])
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (props.teacherAuth === null) {
      props.checkTeacher();
    }
  fetch(`${url}/api/course/teacher/WeeklyTest/rejectedquestion/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      res.json().then((d) => {
        console.log(d, 'weekly-test')
        SetquestionData(d.data)
      })
    });
  }, [props]);

  const option = [
    questionData.ans1
      ? JSON.parse(questionData.ans1).blocks[0].text
      : "No Option",
    questionData.ans2
      ? JSON.parse(questionData.ans2).blocks[0].text
      : "No Option",
    questionData.ans3
      ? JSON.parse(questionData.ans3).blocks[0].text
      : "No Option",
    questionData.ans4
      ? JSON.parse(questionData.ans4).blocks[0].text
      : "No Option",
  ];

  const [value, setValue] = React.useState("");
  let [iup, setImageUploadProgress] = React.useState({});

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  
  return (
    <Grid
      container
      justify="center"
      alignItems="baseline"
      style={{ backgroundColor: '#fff' }}
    >
      <Toolbar style={{ background: Theme.boxColor, width: '100%' }} />
      {props.teacherAuth === false && history.push('/')}
      {props.teacherAuth === null && <Loading />}
      {props.teacherAuth === true && (
        <Grid container className={classes.content}>
          {!!!loading &&(

        <CardComponent>
          <Box container className={classes.question}>
            <Typography
              variant="h6"
              style={{ color: "white", marginBottom: 10 }}
            >
              <strong>Question : </strong>
              {questionData.question !== undefined ? (
                <EditorJS data={JSON.parse(questionData.question)} />
              ) : (
                // ? JSON.parse(questionData.question).blocks[0].text
                "Loading..."
              )}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography variant="p" style={{ color: "white" }}>
                <strong>Stream : </strong>
                {questionData.stream !== undefined
                  ? questionData.stream
                  : "Loading..."}
              </Typography>
              <Typography variant="p" style={{ color: "white" }}>
                <strong>Subject : </strong>
                {questionData.subject !== undefined
                  ? questionData.subject
                  : "Loading..."}
              </Typography>
              <Typography variant="p" style={{ color: "white" }}>
                <strong>Chapter : </strong>
                {questionData.chapter !== undefined
                  ? questionData.chapter
                  : "Loading..."}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box style={{ color: "#fff" }} mt={1} mb={2}>
                <strong>Course : </strong>
                {questionData.course !== undefined
                  ? questionData.course.map((data, index) => {
                      return (
                        <Typography
                          variant="p"
                          style={{
                            color: "#000",
                            backgroundColor: "#eee",
                            padding: 2.5,
                            paddingRight: 5,
                            paddingLeft: 5,
                            borderRadius: 10,
                            marginLeft: 10,
                          }}
                        >
                          {data}
                        </Typography>
                      );
                    })
                  : "No Course"}
              </Box>
              <Typography variant="p" style={{ color: "white" }}>
                <strong>Created At : </strong>
                {questionData.createdAt !== undefined
                  ? questionData.createdAt
                  : "Loading..."}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.optionContainer}>
            <Box>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
                className={classes.radioGroupStyle}
              >
                {option.map((data, index) => {
                  return (
                    <FormControlLabel
                      value={data}
                      className={classes.radioLabelStyle}
                      control={<Radio className={classes.radioButtonStyle} />}
                      label={data}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          </Box>

          <br></br>
          <Box mt={5} mb={5}>
            <Typography variant="p" style={{ color: "white" }}>
              <strong>Correct Answer : </strong>
              {questionData.ans
                ? JSON.parse(questionData.ans).blocks[0].text
                : "No Option"}
            </Typography>
          </Box>

          
        </CardComponent>
          )}
        {loading && (
            <Grid container justify="center">
              <Progress value={iup} />
            </Grid>
          )}
     </Grid>
      )}
    </Grid>
  );
};

WeeklyTest.propType = {
  checkTeacher: PropTypes.func.isRequired,
  teacherAuth: PropTypes.object.isRequired,
};
const mapToState = (state) => ({
  teacherAuth: state.admin.teacherAuth,
});
const mapToProps = {
  checkTeacher,
};
export default connect(mapToState, mapToProps)(WeeklyTest);
