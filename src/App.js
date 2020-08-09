import React, { useEffect } from 'react';
import Loading from './Components/loading';

import TeacherLogin from './Views/teacherLogin';

import Appbar from './Components/AppBar';

import NotFound from './Views/NotFound';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Console from './Views/Console';

import UploadBank from './Views/UploadQBank';
import UploadBook from './Views/UploadQbook';
import Alert from './Views/alert';
import WeeklyTest from './Views/weekly-test';
import MonthlyTest from './Views/monthly-test';

import { connect } from 'react-redux';
import { checkTeacher, logout } from './redux/actions/teacher';
import PropType from 'prop-types';

const App = (props) => {
  useEffect(() => {
    props.checkTeacher();
  }, [props]);

  const out = () => {
    props.logout();
  };

  return (
    <div>
      <Router>
        <Appbar auth={props.auth} out={out} />
        <Switch>
          <Route
            exact
            sensitive
            path="/QBook"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <UploadBook islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            path="/QBook/:id"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <UploadBook islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            sensitive
            path="/QBank"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <UploadBank islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            path="/QBank/:id"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <UploadBank islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            sensitive
            path="/MonthlyTest"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <MonthlyTest islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            sensitive
            path="/MonthlyTest/:id"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <MonthlyTest islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            sensitive
            path="/WeeklyTest"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <WeeklyTest islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            sensitive
            path="/WeeklyTest/:id"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <WeeklyTest islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          <Route
            exact
            path="/alert"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <Alert islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />

          <Route
            exact
            path="/"
            render={() => <TeacherLogin islogin={props.auth} />}
          />

          <Route
            exact
            path="/console"
            component={({ location }) =>
              props.auth === null ? (
                <Loading />
              ) : props.auth === true ? (
                <Console islogin={props.auth} />
              ) : (
                    <Redirect to={{ pathname: '/', state: { from: location } }} />
                  )
            }
          />
          {/* <Route exact path="/console" render={() => <Console islogin={props.auth} />} /> */}

          <Route exact component={NotFound} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
};
App.prototype = {
  auth: PropType.object.isRequired,
  checkTeacher: PropType.func.isRequired,
  logout: PropType.func.isRequired,
};
const mapToProp = {
  logout,
  checkTeacher,
};
const mapToState = (state) => ({
  auth: state.admin.teacherAuth,
});
export default connect(mapToState, mapToProp)(App);
