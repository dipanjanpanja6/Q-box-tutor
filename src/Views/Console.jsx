import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Grid, CardActions, CardContent, Button, Divider, } from '@material-ui/core';
import { Theme } from './../theme';
import CardComponent from '../Components/cardEmbossed';
import { Toolbar, makeStyles, Card } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkTeacher } from '../redux/actions/teacher'
import PropTypes from 'prop-types'
import Loading from '../Components/loading';


const styles = makeStyles(t => ({

    header: { 
        padding: 20
    },
    total:{
        color:'#0d0'
    },
    card:{
        background:'#f0f8ff',
        margin:20
    }

}))


const SelectUpload = (props) => {
    console.log(props);

    const sty = styles();
    const history = useHistory()
    useEffect(() => {
        if (props.teacherAuth === null) {
            props.checkTeacher()
        }
    }, [])
    const handleChange = (e) => {
        if (e == "qbook") {
            history.push('/upload/qbook', props.teacherAuth)
        } if (e == "qbank") {
            history.push('/upload/qbank', props.teacherAuth)
        }
    }

    const style = { style: { width: '80%', height: 'auto', cursor: 'pointer' } }
    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#fff',paddingLeft:57 }}>
            <Toolbar style={{ background: Theme.boxColor }} />
            <Typography variant='h5' color="textSecondary" className={sty.header}>Welcome User,</Typography>

            <Grid container style={{padding:20}}>
                <Card className={sty.card}>
                    <CardContent>
                        <Typography className={sty.title} color="textSecondary" gutterBottom>
                           Upload question for QBook
                         </Typography>
                        <Typography variant="h5" style={{color:Theme.textColor.heading}} component="h2">
                            Q-BOOK
                         </Typography>
                        <Typography  color="textSecondary">
                            total questions : 38
                         </Typography>
                        <Typography variant="body2" className={sty.total} component="p">
                            Approve questions : 25 
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card> 
                <Card className={sty.card}>
                    <CardContent>
                        <Typography className={sty.title} color="textSecondary" gutterBottom>
                           Upload question for QBank
                         </Typography>
                        <Typography variant="h5" style={{color:Theme.textColor.heading}} component="h2">
                            Q-BANK
                         </Typography>
                        <Typography  color="textSecondary">
                            total questions : 38
                         </Typography>
                        <Typography variant="body2" className={sty.total} component="p">
                            Approve questions : 25 
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card className={sty.card}>
                    <CardContent>
                        <Typography className={sty.title} color="textSecondary" gutterBottom>
                           Upload question for Weekly Test
                         </Typography>
                        <Typography variant="h5" style={{color:Theme.textColor.heading}} component="h2">
                            Weekly Test
                         </Typography>
                        <Typography  color="textSecondary">
                            total questions : 38
                         </Typography>
                        <Typography variant="body2" className={sty.total} component="p">
                            Approve questions : 25 
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
                <Card className={sty.card}>
                    <CardContent>
                        <Typography className={sty.title} color="textSecondary" gutterBottom>
                           Upload question for Monthly Test
                         </Typography>
                        <Typography variant="h5" style={{color:Theme.textColor.heading}} component="h2">
                            Monthly Test
                         </Typography>
                        <Typography  color="textSecondary">
                            total questions : 38
                         </Typography>
                        <Typography variant="body2" className={sty.total} component="p">
                            Approve questions : 25 
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Divider/>
            <Grid container>

            </Grid>

        </div>
    );
};

SelectUpload.propType = {
    checkTeacher: PropTypes.func.isRequired,
    teacherAuth: PropTypes.object.isRequired

}
const mapToState = (state) => ({
    teacherAuth: state.admin.teacherAuth
})
const mapToProps = {
    checkTeacher,
}
export default connect(mapToState, mapToProps)(SelectUpload);
