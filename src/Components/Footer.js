import React from 'react';
import Grid from '@material-ui/core/Grid';
import { pxToVh, pxToVw, Theme } from './../theme';
import Typography from '@material-ui/core/Typography';
import {Link as RouterLink} from 'react-router-dom'
import {  makeStyles, IconButton, Input, Link, Fab } from '@material-ui/core';
import CardDepth from './cardDepth'; 
import ButtonComponent from './button'
import BigLogo from '../static/BigLogo.svg';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const styles = makeStyles(t => ({
	root: {
		// width: '100%',
		display: 'flex',
		color: Theme.textColor.color1,
		flexDirection: 'column',
		// height: pxToVh(499),
		padding: pxToVw(50),
		paddingBottom: 0,
		background: Theme.boxColor,
	},
	list: {
		'& p': {
			fontFamily: 'Poppins',
			fontSize: 18,
			lineHeight: 2,
			// fontWeight: 700,
			cursor: 'pointer'
		},
		paddingTop: 30,
		paddingBottom: 30,
	},
	social: {
		[t.breakpoints.down('xs')]: {
			justifyContent: 'center',
			textAlign: 'center'
		}

	},
	icon: {
		color: '#000',
		// padding:0,
		// height: 'inherit',
		// width: 'inherit',
	},
	input: {
		color: Theme.textColor.placeholder,
		fontFamily: 'Poppins',
		fontSize: pxToVw(22),
		fontWeight: '500',

		paddingLeft: pxToVw(15),
		paddingRight: pxToVw(15),
		margin: 0,
		height: '100%',
		'&::placeholder': {
			color: Theme.textColor.placeholder,
			fontFamily: 'Poppins',
			fontSize: 12,
			fontWeight: '500',
			opacity: '1',
			paddingLeft: 15,
			margin: 0,
			height: '100%',
		},
	},
	newsletter: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-end',
		[t.breakpoints.down('xs')]: {
			paddingTop: 50,
			// paddingBottom: 50,
			alignItems: 'center',

		},
		'& p': {
			fontFamily: 'Poppins',
			// fontSize: pxToVh(30),
			fontWeight: 200,
		},

	},
	newsletterInput: {
		height: 30, width: pxToVw(464), paddingTop: 20,
		[t.breakpoints.down('xs')]: {
			minWidth: '60vw'

		}
	},

	button: {
		paddingTop: pxToVw(51), 
		boxSizing: 'border-box',
		cursor: 'pointer', 
		textAlign: "center",
		
	},
	pay: {
		paddingTop: pxToVh(60),
		textAlign: 'center'
	},
	copy: {
		
		textAlign: 'center'
	},
	released: {
		boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
		background: Theme.boxColor,
		height:40 
	},
	label: {
		color: Theme.textColor.color2,
		fontWeight: 'thin',
	},
}))

const Footer = () => {
	const sty = styles();
	return (
		<Grid container justify='center' alignItems='center' className={sty.root} >
			<img src={BigLogo} alt="" style={{ height: 150, width: 150 }} />
			{/* <Typography variant='h5'>QRIOCTY BOX</Typography> */}
			<Typography variant='subtitle1'>Hunt for Curiosity</Typography>
			<br />
			<Typography variant='h5'>GATE</Typography>
			<br />
			<Typography variant='body2'>
				GATE (Graduate Aptitude Test in Engineering) is a computer based examination conducted to test the applicant in engineering & science
				concepts in the under graduate program. This is a national level examination attempted by around 10 lakh candidates trying to
	secure a job at PSU's and/or to get admitted to prestigious institutes for Masters. The question papers are set by IISC & IIT's each year.
	<Link color='textSecondary' component={RouterLink} to='/courses/gate'>{' '}know more</Link>
			</Typography>
			<br />
			<Typography variant='h5'>TECHNICAL GAMES</Typography>
			<br />
			<Typography variant='body2'>
				From statistical data it has been analyzed that almost 80 percent of the students who are in there final year of B. Tech are confused
				regarding should they pursue higher studies or grab a campus placement from their respective colleges Of Further survey it has been
				seen that most of the students starts scavenging the internet to acquire study materials for appearing in GATE IES etc. and other
				government exam and separately they buy study material for recruitment focused tests. This way of approach might seem to be
				correct but in reality, the students following this path gets lost in the middle and ends up Sacrifice one of the other and enters into a
				dilemma weather to focus on recruitment drives or government exams Help students from entering into this dilemma, we at QRIOCITY BOX
				have come up with this unique package called TECHNICAL GAME which has been designed to help students by providing a single game
				to tackle both recruitment exams and as well as the government exams this course covers all the pillars of recruitment exams involving
				aptitude logical reasoning and technical section which also includes interview specific core questions created by industry professionals.
				<Link color='textSecondary' component={RouterLink} to='/courses/techgame'>{' '}know more</Link>
			</Typography>
			<br />
			<Grid className={sty.social} container>
				<Grid item className={sty.list} sm={4}>
					<Typography variant='body1'>Terms & Conditions</Typography>
					<Typography variant='body1'>Legal Notice</Typography>
					<Typography variant='body1'>Privacy Policy</Typography>
					<Typography variant='body1'>Contact</Typography>
				</Grid>
				<Grid item container justify='space-evenly' alignItems='center' sm={4}>


					<ButtonComponent style={{ height: 70, width: 70,}}>
						<CardDepth style={{ height:  '80%', width: '80%' }}>
							<IconButton className={sty.icon} >
								<InstagramIcon />
							</IconButton>
						</CardDepth>
					</ButtonComponent>

					<ButtonComponent style={{ height: 70, width: 70 }}>
						<CardDepth style={{ height:  '80%', width:  '80%' }}>
							<IconButton className={sty.icon}>
								<FacebookIcon />
							</IconButton>
						</CardDepth>
					</ButtonComponent>
					<ButtonComponent
						 style={{ height: 70, width: 70, }}>
							<CardDepth style={{ height:  '80%', width:  '80%' }}>
								<IconButton className={sty.icon} >
									<LinkedInIcon />
								</IconButton>
							</CardDepth>
					</ButtonComponent>
				</Grid>
				<Grid item className={sty.newsletter} sm={4}>
					<Typography variant='subtitle1'>Newsletter</Typography>
					<div className={sty.newsletterInput}>
						<CardDepth>

							<Input
								id='name'
								disableUnderline
								fullWidth
								autoComplete="off"
								placeholder='Name'
								classes={{ input: sty.input }}
							/>
						</CardDepth>
					</div>
					<div className={sty.newsletterInput}>
						<CardDepth>

							<Input
								id='email'
								disableUnderline
								fullWidth
								autoComplete="off"
								placeholder='E-mail'
								classes={{ input: sty.input }}
							/>
						</CardDepth>
					</div>
					 <div className={sty.button}
					// onClick={imageUpload}
					>
						{/* <ButtonComponent
						>
							<Typography
								style={{
									// fontFamily: 'Poppins',
									fontSize: 18,
									padding: `5px 22px`,
									color: Theme.textColor.color2,
								}}>
								Submit
									</Typography>
						</ButtonComponent> */}
					<Fab variant='extended'  classes={{ label: sty.label, }} className={sty.released}>Register for free</Fab>
					</div>

				</Grid>
				<Grid item xs={12} className={sty.pay}>

				</Grid>
				<Grid item xs={12} className={sty.copy}>
					<p>{'© '}{new Date().getFullYear()}{' '} Qriocty Box. All rights reserved </p>
				</Grid>
			</Grid>

		</Grid>
	)
}


export default (Footer);
