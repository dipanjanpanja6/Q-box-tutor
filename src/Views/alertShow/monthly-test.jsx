import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {pxToVh,  Theme } from '../../theme';
import CardComponent from '../../Components/cardEmbossed';
import {
  Toolbar,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../../config/config';
import EditorJS from '../../Components/edit/Readeditor';

import { connect } from 'react-redux';
import { checkTeacher } from '../../redux/actions/teacher';
import PropTypes from 'prop-types';
import Loading from '../../Components/loading';
import { useHistory, useParams } from 'react-router-dom';


import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
    paddingTop:12,
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

const MonthlyTest = (props) => {
  const classes = style();
  const history = useHistory();
  var { id } = useParams();
  const [questionData, SetquestionData] = React.useState([])

  useEffect(() => {
    if (props.teacherAuth === null) {
      props.checkTeacher();
    }
  fetch(`${url}/api/course/teacher/MonthlyTest/rejectedquestion/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      res.json().then((d) => {
        if (d.success) {
          console.log(d)
          SetquestionData(d.data)
        }
        if (d.error) {
          history.goBack()
        }
      })
    });
  }, []);


  return (
    <Grid
      container
      justify="center"
      alignItems="baseline"
      style={{  backgroundColor: '#fff' }}
    >
      <Toolbar style={{ background: Theme.boxColor, width: '100%' }} />
      {props.teacherAuth === false && history.push('/')}
      {props.teacherAuth === null && <Loading />}
      {props.teacherAuth === true && 
       questionData.subject !== undefined ? (
        <Grid container justify="center" className={classes.content}>
            <CardComponent>
          <Box className={classes.question}>
           
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography  style={{ color: "white" }}>
                <strong>Stream : </strong>
                {questionData.stream !== undefined
                  ? questionData.stream
                  : "Loading..."}
              </Typography>
              <Typography  style={{ color: "white" }}>
                <strong>Subject : </strong>
                {questionData.subject !== undefined
                  ? questionData.subject
                  : "Loading..."}
              </Typography>
              <Typography  style={{ color: "white" }}>
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
                        key={index}
                          
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
              <Typography  style={{ color: "white" }}>
                <strong>Created At : </strong>
                {questionData.createdAt !== undefined
                  ? questionData.createdAt
                  : "Loading..."}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              component='div'
              noWrap={false}
              style={{
                color: "white",
                marginBottom: 10,
              }}
            >
              <strong>Question : </strong>
              {questionData.question !== undefined
                ? 
                <EditorJS data={JSON.parse(questionData.question)} />

:                  "Loading..."}
            </Typography>
             </Box>

          <Box className={classes.optionContainer}>
            <Box>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value=""
                className={classes.radioGroupStyle}
              >
                  <FormControlLabel
                      className={classes.radioLabelStyle}
                      control={<Radio checked={true} className={classes.radioButtonStyle} />}
                      label={

                        <EditorJS data={JSON.parse(questionData.ans1)} />
                      }
                    />
                    <FormControlLabel
                      // value={data}
                      className={classes.radioLabelStyle}
                      control={<Radio className={classes.radioButtonStyle} />}
                      label={

                        <EditorJS data={JSON.parse(questionData.ans2)} />
                      }
                    />
                    <FormControlLabel
                      // value={data}
                      className={classes.radioLabelStyle}
                      control={<Radio className={classes.radioButtonStyle} />}
                      label={

                        <EditorJS data={JSON.parse(questionData.ans3)} />
                      }
                    />
                    <FormControlLabel
                      // value={data}
                      className={classes.radioLabelStyle}
                      control={<Radio className={classes.radioButtonStyle} />}
                      label={

                        <EditorJS data={JSON.parse(questionData.ans4)} />
                      } />
              </RadioGroup>
            </Box>
          </Box>

         
          
        </CardComponent>
        </Grid>
        ) : <Loading />}
      )}
    </Grid>
  );
};
MonthlyTest.propType = {
  checkTeacher: PropTypes.func.isRequired,
  teacherAuth: PropTypes.object.isRequired,
};
const mapToState = (state) => ({
  teacherAuth: state.admin.teacherAuth,
});
const mapToProps = {
  checkTeacher,
};
export default connect(mapToState, mapToProps)(MonthlyTest);
