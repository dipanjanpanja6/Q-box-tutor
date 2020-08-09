import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import { pxToVw, Theme } from '../theme';
import CardDepth from '../Components/cardDepth';
import CardComponent from '../Components/cardEmbossed';
import Person from '@material-ui/icons/PersonRounded';
import {
  MenuItem,
  Checkbox,
  Toolbar,
  Select,
  ListItemText,
  Fab,
} from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../config/config';
import { toast } from 'react-toastify';
import Progress from '../Components/circularProgressBar';

import { connect } from 'react-redux';
import { checkTeacher } from '../redux/actions/teacher';
import PropTypes from 'prop-types';
import Loading from '../Components/loading';
import { useHistory, useParams } from 'react-router-dom';

import EditorJS from '../Components/edit/Editor';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const styles = makeStyles((t) => ({
  baseStyle: {
    borderRadius: '50%',
  },
  boxStyle: {
    borderRadius: '0%',
  },
  input: {
    color: Theme.textColor.placeholder,
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',

    paddingLeft: pxToVw(15),
    paddingRight: pxToVw(15),
    margin: 0,
    height: '100%',
    '&::placeholder': {
      color: Theme.textColor.placeholder,
      fontFamily: 'Poppins',
      fontWeight: '500',
      opacity: '1',
      paddingLeft: pxToVw(10),
      margin: 0,
      height: '100%',
    },
  },
  content: {
    backgroundColor: 'white',
    width: '80%',
    paddingTop: 12,
    paddingBottom: 12,
    [t.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  inputDiv: {
    padding: 12,
  },
  inputDivText: {
    height: '100%',
    width: '100%',
    padding: '30px 0',
  },
  select: {
    width: '100%',
    color: Theme.textColor.heading,
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  course: {
    width: '100%',
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
  label: {
    color: Theme.textColor.heading,
    fontWeight: 'thin',
    padding: '0 12px',
  },
  selectI: {
    padding: '0 5%',
  },
  selectInput: {
    paddingLeft: 12,
  },
  upload: {
    [t.breakpoints.down('xs')]: {
      padding: '0 9%',
    },
  },
}));

const MonthlyTest = (props) => {
  const sty = styles();
  const history = useHistory();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 250,
        color: '#fff',
        width: pxToVw(564),
        backgroundColor: Theme.textColor.heading,
        borderRadius: 41,
      },
    },
  };

  // const [hasOption, setHasOption] = React.useState(false)

  const [loading, setLoading] = React.useState(false);
  const [course, setCourse] = React.useState([]);
  const [subject, setSubject] = React.useState([]);
  const [chapter, setChapter] = React.useState([]);
  const [stream, setStream] = React.useState([]);

  useEffect(() => {
    if (props.teacherAuth === null) {
      props.checkTeacher();
    }

    axios.get(`${url}/api/course`).then((d) => {
      // console.log(d.data);
      if (d.data.success) {
        setCourse(d.data.data);
      }
    });
  }, [props]);

  const [courseValue, setCourseValue] = React.useState([]);
  const [streamValue, setStreamValue] = React.useState('');
  const [subjectValue, setSubjectValue] = React.useState('');
  const [chapterValue, setChapterValue] = React.useState('');

  function filter(array, value, key) {
    return array.filter(
      key
        ? (a) => a[key] === value
        : (a) => Object.keys(a).some((k) => a[k] === value)
    );
  }

  const fetchStream = () => {
    axios
      .post(`${url}/api/getstream`, { courseValue: courseValue })
      .then((d) => {
        // console.log(d.data);
        if (d.data.success) {
          setStream(d.data.data);
        }
        if (d.data.error) {
          setStream([]);
          setSubject([]);
          setStreamValue('');
          setSubjectValue('');
          setChapterValue('');
          setChapter([]);
          toast.warn(d.data.message);
        }
      });
  };

  const handleChange = async (event) => {
    setCourseValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setStreamValue(event.target.value);
    if (event.target.value !== '') {
      axios
        .post(`${url}/api/getsubject`, { streamValue: event.target.value })
        .then((d) => {
          // console.log(d.data);
          if (d.data.success) {
            setSubject(d.data.data);
          }
          if (d.data.error) {
            setSubject([]);
            setSubjectValue('');
            setChapterValue('');
            setChapter([]);
            toast.warn(d.data.message);
          }
        });
    }
  };
  const handleChange3 = (event) => {
    setSubjectValue(event.target.value);
    if (event.target.value !== '') {
      // console.log(filter(subject, event.target.value))
      setChapter(filter(subject, event.target.value)[0].chapter);
    }
  };
  const handleChange4 = (event) => {
    setChapterValue(event.target.value);
  };

  let [iup, setImageUploadProgress] = useState({});

  const [QData, setQData] = useState({
    ans4: '',
    ans3: '',
    ans2: '',
    ans1: '',
    ans: '',
    question: '',
  });
  const handleChangeQ = (e, i) => {
    const h = JSON.stringify(e);
    setQData({ ...QData, [i]: h });
  };

  // console.log(QData);

  const submit = () => {
    // var y = JSON.parse(QData.ans)
    if (QData.question === '' || QData.question === null) {
      return alert('Please write some question first');
    } else if (QData.ans === '' || QData.ans === null) {
      return alert(
        'Please write at least one correct answer first at "correct answer" bellow Question field'
      );
    } else if (courseValue === []) {
      return alert('Select Course first');
    } else if (streamValue === '' || streamValue === null) {
      return alert('Select Stream first');
    } else if (subjectValue === '' || subjectValue === null) {
      return alert('Select Subject first');
    } else if (chapterValue === '' || chapterValue === null) {
      return alert('Select chapter first');
    } else {
      var x = JSON.parse(QData.question);
      var y = JSON.parse(QData.ans);
      if (x.blocks.length === 1 && x.blocks[0].text === '' && x.entityMap) {
        return alert('Please write some question first');
      } else if (
        y.blocks.length === 1 &&
        y.blocks[0].text === '' &&
        y.entityMap
      ) {
        return alert('Please write at least one answer first');
      } else {
        const data = {
          data: {
            course: courseValue,
            stream: streamValue,
            subject: subjectValue,
            chapter: chapterValue,
            ...QData,
          },
        };
        setLoading(true);

        axios(`${url}/api/upload/monthly-test`, {
          method: 'POST',
          withCredentials: true,
          data: JSON.stringify(data),
          onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setImageUploadProgress({
              progress: percentCompleted,
              processing: true,
            });
            if (percentCompleted === 100) {
              setImageUploadProgress({
                processing: false,
                uploadFinished: true,
                progress: 100,
              });
            }
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((d) => {
            setLoading(false);
            toast.success('Successfully added.');
          })
          .catch((r) => {
            console.log(r);
            toast.error('Failed!!! Try again.');
            setLoading(false);
          });
      }
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="baseline"
      style={{ minHeight: '100vh', backgroundColor: '#fff' }}
    >
      <Toolbar style={{ background: Theme.boxColor, width: '100%' }} />
      {props.teacherAuth === false && history.push('/')}
      {props.teacherAuth === null && <Loading />}
      {props.teacherAuth === true && (
        <Grid container justify="center" className={sty.content}>
          {!!!loading && (
            <CardComponent style={{ padding: 12 }}>
              <div
                style={{
                  width: '100%',
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  boxSizing: 'border-box',
                  paddingTop: '1%',
                }}
              >
                <div
                  style={{
                    paddingTop: '6%',

                    height: 54,
                    width: 54,
                  }}
                >
                  <CardComponent
                    children={
                      <div
                        style={{
                          height: '88%',
                          width: '88%',
                        }}
                      >
                        <CardDepth
                          children={
                            <Person
                              style={{
                                color: '#8d3ddc',
                                height: 44,
                                width: 44,
                              }}
                            />
                          }
                        />
                      </div>
                    }
                  />
                </div>
              </div>

              <Grid container item xs={12} justify="space-around">
                <Grid item sm={6} xs={12} className={sty.selectI}>
                  <p style={{ margin: '0 0 0 25px', color: '#fff' }}>
                    Select Course (step 1)
                  </p>
                  <div className={sty.inputDiv}>
                    <CardDepth>
                      <Select

                        {...{
                          disableUnderline: true,
                          className: sty.select,
                          classes: { select: sty.selectInput },
                        }}

                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        value={courseValue}
                        onBlur={fetchStream}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {course.map((name) => (
                          <MenuItem key={name.ID} value={name.name}>
                            <Checkbox
                              checked={courseValue.indexOf(name.name) > -1}
                            />
                            <ListItemText primary={name.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </CardDepth>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12} className={sty.selectI}>
                  <p style={{ margin: '0 0 0 25px', color: '#fff' }}>
                    Select Stream (step 2)
                  </p>
                  <div className={sty.inputDiv}>
                    <CardDepth>
                      <Select

                        {...{
                          disableUnderline: true,
                          className: sty.select,
                          classes: { select: sty.selectInput },
                        }}

                        value={stream.length !== 0 ? streamValue : 'loading'}
                        onChange={handleChange2}
                        input={<Input />}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {stream.length !== 0 ? (
                          stream.map((name) => (
                            <MenuItem key={name.ID} value={name.name}>
                              {name.name}
                            </MenuItem>
                          ))
                        ) : (
                            <MenuItem disabled value="loading">
                              loading
                            </MenuItem>
                          )}
                      </Select>
                    </CardDepth>
                  </div>
                </Grid>
              </Grid>
              <Grid container item xs={12} justify="space-around">
                <Grid item sm={6} xs={12} className={sty.selectI}>
                  <p style={{ margin: '0 0 0 25px', color: '#fff' }}>
                    Select Subject (step 3)
                  </p>
                  <div className={sty.inputDiv}>
                    <CardDepth>
                      <Select

                        {...{
                          disableUnderline: true,
                          className: sty.select,
                          classes: { select: sty.selectInput },
                        }}

                        value={subject.length === 0 ? 'loading' : subjectValue}
                        onChange={handleChange3}
                        input={<Input />}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {subject.length === 0 ? (
                          <MenuItem value="loading">loading</MenuItem>
                        ) : (
                            subject.map((name) => (
                              <MenuItem key={name.ID} value={name.name}>
                                {name.name}
                              </MenuItem>
                            ))
                          )}
                      </Select>
                    </CardDepth>
                  </div>
                </Grid>
                <Grid item sm={6} xs={12} className={sty.selectI}>
                  <p style={{ margin: '0 0 0 25px', color: '#fff' }}>
                    Select Chapter (step 4)
                  </p>
                  <div className={sty.inputDiv}>
                    <CardDepth>
                      <Select

                        {...{
                          disableUnderline: true,
                          className: sty.select,
                          classes: { select: sty.selectInput },
                        }}

                        value={chapter.length === 0 ? 'loading' : chapterValue}
                        onChange={handleChange4}
                        input={<Input />}
                        MenuProps={MenuProps}
                        displayEmpty
                      >
                        {chapter.length === 0 ? (
                          <MenuItem value="loading">loading</MenuItem>
                        ) : (
                            chapter.map((name) => (
                              <MenuItem key={name.ID} value={name.name}>
                                {name.name}
                              </MenuItem>
                            ))
                          )}
                      </Select>
                    </CardDepth>
                  </div>
                </Grid>
              </Grid>
              <Grid style={{ padding: '0 5%' }} item container justify="center">
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'question');
                      }}
                      placeholder={'Type your question here...'}
                    />
                  </CardDepth>
                </div>
              </Grid>

              <Grid
                item
                justify="space-between"
                container
                style={{ padding: ' 30px 5% 0 ' }}
              >
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'ans');
                      }}
                      placeholder={'Type your correct answer here ...'}
                    />
                  </CardDepth>
                </div>
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'ans1');
                      }}
                      placeholder={'Type your wrong answer here ..'}
                    />
                  </CardDepth>
                </div>
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'ans2');
                      }}
                      placeholder={'Type your wrong answer here ..'}
                    />
                  </CardDepth>
                </div>
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'ans3');
                      }}
                      placeholder={'Type your wrong answer here ..'}
                    />
                  </CardDepth>
                </div>
                <div className={sty.inputDivText}>
                  <CardDepth style={{ borderRadius: 12 }}>
                    <EditorJS
                      onChange={(e) => {
                        handleChangeQ(e, 'ans4');
                      }}
                      placeholder={'Type your wrong answer here ..'}
                    />
                  </CardDepth>
                </div>
              </Grid>

              <Grid
                container
                justify="space-evenly"
                style={{ paddingBottom: 22, paddingTop: 12 }}
              >
                <Fab
                  variant="extended"
                  classes={{ label: sty.label }}
                  className={sty.released}
                  onClick={submit}
                >
                  Submit
                </Fab>
              </Grid>
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
