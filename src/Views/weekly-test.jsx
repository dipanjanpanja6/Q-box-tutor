import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import { pxToVh, pxToVw, Theme } from './../theme';
import CardDepth from '../Components/cardDepth';
import CardComponent from '../Components/cardEmbossed';
import Person from '@material-ui/icons/PersonRounded';
import { MenuItem, Checkbox, Toolbar, Select, ListItemText, Fab } from '@material-ui/core';
import { useEffect } from 'react';
import { url } from '../config/config';
import { toast } from 'react-toastify';
import Progress from '../Components/circularProgressBar'

import { connect } from 'react-redux';
import { checkTeacher } from '../redux/actions/teacher'
import PropTypes from 'prop-types'
import Loading from '../Components/loading';
import { useHistory } from 'react-router-dom';
import { EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorJS from '../Components/Editor'
const styles = makeStyles(t => ({

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
		}
	},
	inputDiv: {
		padding: 12,

	},
	inputDivText: {
		height: '100%',
		width: '100%',
		padding: '30px 0'
	},
	select: {
		width: '100%',
		color: Theme.textColor.heading,
		'& :focus': {
			backgroundColor: 'transparent'
		}
	},
	course: {
		width: '100%'
	},
	released: {
		height: 40,
		backgroundColor: '#fff',
		boxShadow: `4px 4px 5px 1px rgba(00,00,00,0.2),-4px -4px 5px 1px rgba(255,255,255,0.2)`,
		[t.breakpoints.down('xs')]: {
			width: '100%',
			margin: '8% 0'
		},
		[t.breakpoints.down('sm')]: {
			width: '70%',
			margin: '5% 0'
		}
	},
	label: {
		color: Theme.textColor.heading,
		fontWeight: 'thin',
		padding: "0 12px"
	},
	selectI: {
		padding: '0 5%'
	},
	selectInput: {
		paddingLeft: 12
	},
	upload: {
		[t.breakpoints.down('xs')]: {
			padding: '0 9%'

		}
	}

}))


const UploadQBook = (props) => {
	const sty = styles()
	const history = useHistory()


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
				borderRadius: 41
			},
		},
	};
	const [loading, setLoading] = React.useState(false)


	const [hasOption, setHasOption] = React.useState(false)

	const [course, setCourse] = React.useState([])
	const [subject, setSubject] = React.useState([])
	const [chapter, setChapter] = React.useState([])
	const [stream, setStream] = React.useState([])
<<<<<<< HEAD
	const [model, setModel] = useState(EditorState.createEmpty());
=======

>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2

	useEffect(() => {
		if (props.teacherAuth === null) {
			props.checkTeacher()
		}

		axios.get(`${url}/api/course`).then(d => {
			// console.log(d.data);
			if (d.data.success) {
				setCourse(d.data.data)
			}
		})
	}, [])




	const [courseValue, setCourseValue] = React.useState([]);
	const [streamValue, setStreamValue] = React.useState('');
	const [subjectValue, setSubjectValue] = React.useState('');
	const [chapterValue, setChapterValue] = React.useState('');


	function filter(array, value, key) {
		return array.filter(key
			? a => a[key] === value
			: a => Object.keys(a).some(k => a[k] === value)
		);
	}

	const fetchStream = () => {
		axios.post(`${url}/api/getstream`, { courseValue: courseValue }).then(d => {
			// console.log(d.data);
			if (d.data.success) {
				setStream(d.data.data)
			} if (d.data.error) {
				setStream([])
				setSubject([])
				setStreamValue('')
				setSubjectValue('')
				setChapterValue('')
				setChapter([])
				toast.warn(d.data.message)
			}
		})
	}

	const handleChange = async event => {
		setCourseValue(event.target.value);
	};
	const handleChange2 = (event) => {
		setStreamValue(event.target.value);
		if (event.target.value !== '') {
			axios.post(`${url}/api/getsubject`, { streamValue: event.target.value }).then(d => {
				// console.log(d.data);
				if (d.data.success) {
					setSubject(d.data.data)
				} if (d.data.error) {
					setSubject([])
					setSubjectValue('')
					setChapterValue('')
					setChapter([])
					toast.warn(d.data.message)

				}
			})
		}
	};
	const handleChange3 = (event) => {
		setSubjectValue(event.target.value);
		if (event.target.value !== '') {
			// console.log(filter(subject, event.target.value))
			setChapter(filter(subject, event.target.value)[0].chapter)

		}
	};
	const handleChange4 = (event) => {
		setChapterValue(event.target.value);

	};

	const [image, setImage] = useState('')
	const selectImage = (e) => {
		if (e.target.files[0] == null) {
			setImage('')
		} else { setImage(e.target.files[0]) }
	}

	const [video, setVideo] = useState('')
	const selectVideo = (e) => {
		if (e.target.files[0] == null) {
			setVideo('')
		} else {
			setVideo(e.target.files[0])
		}
	}
<<<<<<< HEAD
	const onEditorChange = (newData) =>{
		const f = draftToHtml(convertToRaw(newData.getCurrentContent()))
		const h = JSON.stringify(f)


		setModel(newData)
	}
=======
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
	let [iup, setImageUploadProgress] = useState({})
	// let [vup, setVideoUploadProgress] = useState({})

	// const imageUpload = () => {
	// 	if (image === '') {
	// 		return toast.warn('Select any Image first')
	// 	} else {
	// 		let formData = new FormData()
	// 		formData.append('image', image);
	// 		axios(`${url}/api/upload/image`, {
	// 			method: 'POST',
	// 			withCredentials: true,
	// 			data: formData,
	// 			onUploadProgress: progressEvent => {
	// 				let percentCompleted = (Math.round((progressEvent.loaded * 100) / progressEvent.total))
	// 				setImageUploadProgress({
	// 					progress: percentCompleted,
	// 					processing: true
	// 				});
	// 				if (percentCompleted === 100) {
	// 					setImageUploadProgress({
	// 						processing: false,
	// 						uploadFinished: true,
	// 						progress: 100
	// 					});
	// 				}

	// 			},
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data'
	// 			},
	// 		}).then(d => {
	// 			console.log(d.data);

	// 		}).catch(r => console.log(r))
	// 	}
	// }
	// const videoUpload = () => {
	// 	if (video === '') {
	// 		return toast.warn('Select any Video first')
	// 	} else {
	// 		let formData = new FormData()
	// 		formData.append('video', video);
	// 		axios(`${url}/api/upload/video`,
	// 			{
	// 				method: 'POST',
	// 				withCredentials: true,
	// 				data: formData,
	// 				onUploadProgress: progressEvent => {
	// 					let percentCompleted = (Math.round((progressEvent.loaded * 100) / progressEvent.total))
	// 					setVideoUploadProgress({
	// 						progress: percentCompleted,
	// 						processing: true
	// 					});
	// 					if (percentCompleted === 100) {
	// 						setVideoUploadProgress({
	// 							processing: false,
	// 							uploadFinished: true,
	// 							progress: 100
	// 						});
	// 					}
	// 				},
	// 				headers: {
	// 					'Content-Type': 'multipart/form-data'
	// 				},
	// 			}).then(d => {
	// 				console.log(d.data);

	// 			}).catch(r => console.log(r))
	// 	}
	// }
<<<<<<< HEAD
	const [QData, setQData] = useState({ans4:'',ans3:'', ans2:'', ans1:'', ans:'', question:'',})
	const handleChangeAns = (e) =>{
		const f = draftToHtml(convertToRaw(e.getCurrentContent()))
		const h = JSON.stringify(f)
		setQData({ ...QData, [QData.ans]:h})
	}
	const handleChangeQ1 = (e) => {
		const f = draftToHtml(convertToRaw(e.getCurrentContent()))
		const h = JSON.stringify(f)
		setQData({ ...QData, [QData.ans1]:h})
	}

	const handleChangeQ2 = (e) => {
		const f = draftToHtml(convertToRaw(e.getCurrentContent()))
		const h = JSON.stringify(f)
		setQData({ ...QData, [QData.ans2]:h})
	}

	const handleChangeQ3 = (e) => {
		const f = draftToHtml(convertToRaw(e.getCurrentContent()))
		const h = JSON.stringify(f)
		setQData({ ...QData, [QData.ans3]:h})
	}

	const handleChangeQ4 = (e) => {
		const f = draftToHtml(convertToRaw(e.getCurrentContent()))
		const h = JSON.stringify(f)
		setQData({ ...QData, [QData.ans4]:h})
	}
=======
	const [QData, setQData] = useState({})
	const handleChangeQ = (e) => {
		setQData({ ...QData, [e.target.id]: e.target.value })
	}

>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2


	const submit = () => {
		if (QData.question === '' || QData.question === null) {
			return alert('Please write some question first')
		} else
			// if (QData.ans === '' || QData.ans === null) {
			// 	return alert('Please write at least one correct answer first at "correct answer" bellow Question field')
			// } else
			if (courseValue == []) {
				return alert('Select Course first')
			} else
				if (streamValue === '' || streamValue === null) {
					return alert('Select Stream first')
				} else
					if (subjectValue === '' || subjectValue === null) {
						return alert('Select Subject first')
					} else
						if (chapterValue === '' || chapterValue === null) {
							return alert('Select chapter first')
						} else {
							var formData = new FormData();

							const data = {
								course: courseValue,
								stream: streamValue,
								subject: subjectValue,
								chapter: chapterValue,
								noImage: true,
								noVideo: true,
								...QData
							}
							if (image !== '') {
								data.noImage = false
								formData.append("image", image);
							}
							if (video !== '') {
								data.noVideo = false
								formData.append("video", video);
							}
							// console.log(data);

							formData.append("document", JSON.stringify(data));
                            setLoading(true)

							axios(`${url}/api/upload/qbank`, {
								method: 'POST',
								withCredentials: true,
								data: formData,
								onUploadProgress: progressEvent => {
									let percentCompleted = (Math.round((progressEvent.loaded * 100) / progressEvent.total))
									setImageUploadProgress({
										progress: percentCompleted,
										processing: true
									});
									if (percentCompleted === 100) {
										setImageUploadProgress({
											processing: false,
											uploadFinished: true,
											progress: 100
										});
									}

								},
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'multipart/form-data',
								},
							}).then(d => {
								setLoading(false)
								toast.success("Successfully added.")

							}).catch(r => {
								console.log(r)
								toast.error("Failed!!! Reselect Video")
								setVideo('')
								setLoading(false)
							})
						}
	}
	// console.log(iup);

	return (
		<Grid container justify='center' alignItems='baseline' style={{ minHeight: "100vh", backgroundColor: '#fff' }}>
			<Toolbar style={{ background: Theme.boxColor, width: '100%' }} />
			{props.teacherAuth === false && history.push('/')}
			{props.teacherAuth === null && <Loading />}
			{props.teacherAuth === true &&
				<Grid container justify='center' className={sty.content}>
					{!!!loading && <CardComponent style={{ padding: 12 }}>
						<div
							style={{

								width: '100%',
								display: 'grid',
								justifyContent: 'center',
								alignItems: 'flex-start',
								boxSizing: 'border-box',
								paddingTop: '1%',
							}}>
							<div style={{
								paddingTop: '6%',

								height: 54,
								width: 54,
							}}>
								<CardComponent
									children={
										<div style={{
											height: '88%',
											width: '88%',
										}}>
											<CardDepth
												children={
													<Person style={{
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

						<Grid container item xs={12} justify='space-around'>
							<Grid item sm={6} xs={12} className={sty.selectI}  >
								<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Course</p>
								<div className={sty.inputDiv}>
									<CardDepth >
										<Select
											{...{ disableUnderline: true, className: sty.select, classes: { select: sty.selectInput } }}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'center',
												}
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
													<Checkbox checked={courseValue.indexOf(name.name) > -1} />
													<ListItemText primary={name.name} />

												</MenuItem>
											))}
										</Select>
									</CardDepth>
								</div>
							</Grid>
							<Grid item sm={6} xs={12} className={sty.selectI}>
								<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Stream</p>
								<div className={sty.inputDiv}>
									<CardDepth >
										<Select
											{...{ disableUnderline: true, className: sty.select, classes: { select: sty.selectInput } }}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'center',
												}
											}}
											value={stream.length !== 0 ? streamValue : 'loading'}
											onChange={handleChange2}
											input={<Input />}
											MenuProps={MenuProps}
										>
											{stream.length !== 0 ? stream.map((name) => (
												<MenuItem key={name.ID} value={name.name}>
													{name.name}

												</MenuItem>
											)) : <MenuItem disabled value='loading' >loading</MenuItem>}
										</Select>
									</CardDepth>
								</div>
							</Grid>
						</Grid>
						<Grid container item xs={12} justify='space-around'>
							<Grid item sm={6} xs={12} className={sty.selectI} >
								<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Subject</p>
								<div className={sty.inputDiv}>
									<CardDepth >
										<Select
											{...{ disableUnderline: true, className: sty.select, classes: { select: sty.selectInput } }}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'center',
												}
											}}
											value={subject.length === 0 ? 'loading' : subjectValue}
											onChange={handleChange3}
											input={<Input />}
											MenuProps={MenuProps}
										>
											{subject.length === 0 ?
												<MenuItem value="loading">loading</MenuItem>
												: subject.map((name) => (
													<MenuItem key={name.ID} value={name.name}>{name.name}</MenuItem>
												))}
										</Select>
									</CardDepth>
								</div>


							</Grid>
							<Grid item sm={6} xs={12} className={sty.selectI}>
								<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Chapter</p>
								<div className={sty.inputDiv}>
									<CardDepth >
										<Select
											{...{ disableUnderline: true, className: sty.select, classes: { select: sty.selectInput } }}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'center',
												}
											}}
											value={chapter.length === 0 ? "loading" : chapterValue}
											onChange={handleChange4}
											input={<Input />}
											MenuProps={MenuProps}
										>
											{chapter.length === 0 ?
												<MenuItem value="loading">loading</MenuItem> :
												chapter.map((name) => (
													<MenuItem key={name.ID} value={name.name}>
														{name.name}

													</MenuItem>
												))
											}
										</Select>
									</CardDepth>
								</div>
							</Grid>
						</Grid>
						<Grid container item xs={12} justify='space-around'>
							<Grid item sm={6} xs={12} className={sty.selectI} >
<<<<<<< HEAD
								{/*<Grid container justify='space-between'>	<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Image (if any)</p>*/}
								{/*	/!* {iup.processing && <Progress value={iup} />} *!/*/}
								{/*</Grid>*/}
								{/*<div className={sty.inputDiv}>*/}
								{/*	<CardDepth style={{ overflow: 'hidden', paddingLeft: 12 }}>*/}
								{/*		<input accept="image/jpeg, image/png" type='file' onChange={selectImage} style={{ width: '100%', padding: 6 }}></input>*/}
								{/*		/!* <Fab variant='extended' classes={{ label: "", }}*/}
								{/*		style={iup.uploadFinished === true ? {*/}
								{/*			backgroundColor: '#0f0', height: 35,*/}
								{/*			width: '40%',*/}
								{/*			borderRadius: 0,*/}
								{/*		} : {*/}
								{/*				height: 35,*/}
								{/*				width: '40%',*/}
								{/*				borderRadius: 0,*/}

								{/*			}}*/}
								{/*		onClick={imageUpload} >{iup.uploadFinished === true ? "Success" : "Upload Image"}</Fab> *!/*/}
								{/*	</CardDepth>*/}
								{/*</div>*/}
=======
								<Grid container justify='space-between'>	<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Image (if any)</p>
									{/* {iup.processing && <Progress value={iup} />} */}
								</Grid>
								<div className={sty.inputDiv}>
									<CardDepth style={{ overflow: 'hidden', paddingLeft: 12 }}>
										<input accept="image/jpeg, image/png" type='file' onChange={selectImage} style={{ width: '100%', padding: 6 }}></input>
										{/* <Fab variant='extended' classes={{ label: "", }}
										style={iup.uploadFinished === true ? {
											backgroundColor: '#0f0', height: 35,
											width: '40%',
											borderRadius: 0,
										} : {
												height: 35,
												width: '40%',
												borderRadius: 0,

											}}
										onClick={imageUpload} >{iup.uploadFinished === true ? "Success" : "Upload Image"}</Fab> */}
									</CardDepth>
								</div>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2


							</Grid>
							<Grid item sm={6} xs={12} className={sty.selectI} >
<<<<<<< HEAD
								{/*<Grid container justify='space-between'>	<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Video (if any)</p>*/}
								{/*	/!* {vup.processing && <Progress value={vup} />} *!/*/}
								{/*</Grid>*/}
								{/*<div className={sty.inputDiv}>*/}
								{/*	<CardDepth style={{ overflow: 'hidden', paddingLeft: 12 }}>*/}
								{/*		<input accept="video/*" type='file' onChange={selectVideo} style={{ width: '100%', padding: 6 }}></input>*/}
								{/*		/!* <Fab variant='extended' classes={{ label: "", }}*/}
								{/*		style={vup.uploadFinished === true ? {*/}
								{/*			backgroundColor: '#0f0', height: 35,*/}
								{/*			width: '40%',*/}
								{/*			borderRadius: 0,*/}
								{/*		} : {*/}
								{/*				height: 35,*/}
								{/*				width: '40%',*/}
								{/*				borderRadius: 0,*/}

								{/*			}} onClick={videoUpload} >{vup.uploadFinished === true ? "Success" : "Upload Video"}</Fab> *!/*/}
								{/*	</CardDepth>*/}
								{/*</div>*/}
=======
								<Grid container justify='space-between'>	<p style={{ margin: '0 0 0 25px', color: '#fff' }}>Video (if any)</p>
									{/* {vup.processing && <Progress value={vup} />} */}
								</Grid>
								<div className={sty.inputDiv}>
									<CardDepth style={{ overflow: 'hidden', paddingLeft: 12 }}>
										<input accept="video/*" type='file' onChange={selectVideo} style={{ width: '100%', padding: 6 }}></input>
										{/* <Fab variant='extended' classes={{ label: "", }}
										style={vup.uploadFinished === true ? {
											backgroundColor: '#0f0', height: 35,
											width: '40%',
											borderRadius: 0,
										} : {
												height: 35,
												width: '40%',
												borderRadius: 0,

											}} onClick={videoUpload} >{vup.uploadFinished === true ? "Success" : "Upload Video"}</Fab> */}
									</CardDepth>
								</div>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2


							</Grid>

						</Grid>


						<Grid container justify='space-around' style={{ padding: '12px 0 20px' }}>

							{/* <Grid item container sm={6} className={sty.upload} justify='space-around'>
							<Fab variant='extended' classes={{ label: sty.label, }} className={sty.released} onClick={imageUpload} >Upload Image</Fab>
							<Fab variant='extended' classes={{ label: sty.label, }} className={sty.released} onClick={uploadVideo} >Upload Video</Fab>
						</Grid> */}
							<Grid container justify='flex-start' style={{ paddingLeft: '7%' }} item >
								<Checkbox disableRipple onChange={(e) => { setHasOption(e.target.checked) }} style={{ padding: '0 3px', color: '#fff', alignSelf: 'center' }} /><Typography style={{ alignSelf: 'center', color: '#fff' }}>Has Options</Typography>
							</Grid>
						</Grid>

						<Grid style={{ padding: '0 5%' }} item container justify='center' >
							<div className={sty.inputDivText}>

								<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
									<EditorJS onChange={onEditorChange} placeholder="Type your question here ..."/>
									{/*<Editor*/}
									{/*	editorState={model}*/}
									{/*	wrapperClassName="demo-wrapper"*/}
									{/*	editorClassName="demo-editor"*/}
									{/*	placeholder="Add Body..."*/}
									{/*	onEditorStateChange={onEditorStateChange}*/}
									{/*/>*/}
									{/*<Input*/}
									{/*	id="question"*/}
									{/*	value={QData.question}*/}
									{/*	onChange={handleChangeQ}*/}
									{/*	disableUnderline*/}
									{/*	fullWidth*/}
									{/*	rowsMax={8}*/}
									{/*	rows={8}*/}
									{/*	multiline*/}
									{/*	placeholder="Type your question here ..."*/}
									{/*	classes={{ input: sty.input }}></Input>*/}
=======
									<Input
										id="question"
										value={QData.question}
										onChange={handleChangeQ}
										disableUnderline
										fullWidth
										rowsMax={8}
										rows={8}
										multiline
										placeholder="Type your question here ..."
										classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
								</CardDepth>
							</div>
						</Grid>

						{hasOption &&
							<Grid item justify='space-between' container style={{ padding: ' 30px 5% 0 ' }} >
								{/* <Grid container justify='space-between' > */}
								<div className={sty.inputDivText}>
									<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
										<EditorJS onChange={handleChangeAns} placeholder="Type your correct answer here ..."/>
										{/*<Input*/}
										{/*	id="ans"*/}
										{/*	value={QData.ans}*/}
										{/*	onChange={handleChangeQ}*/}
										{/*	disableUnderline*/}
										{/*	fullWidth*/}
										{/*	rowsMax={8}*/}
										{/*	rows={3}*/}
										{/*	multiline*/}
										{/*	placeholder="Type your correct answer here ..."*/}
										{/*	classes={{ input: sty.input }}></Input>*/}
=======
										<Input
											id="ans"
											value={QData.ans}
											onChange={handleChangeQ}
											disableUnderline
											fullWidth
											rowsMax={8}
											rows={3}
											multiline
											placeholder="Type your correct answer here ..."
											classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
									</CardDepth>
								</div>
								<div className={sty.inputDivText}>
									<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
										<EditorJS onChange={handleChangeQ1} placeholder="Type your wrong answer here ..."/>
										{/*<Input*/}
										{/*	id="ans1"*/}
										{/*	value={QData.ans1}*/}
										{/*	onChange={handleChangeQ}*/}
										{/*	disableUnderline*/}
										{/*	fullWidth*/}
										{/*	rowsMax={8}*/}
										{/*	rows={3}*/}
										{/*	multiline*/}
										{/*	placeholder="Type your wrong answer here ..."*/}
										{/*	classes={{ input: sty.input }}></Input>*/}
=======
										<Input
											id="ans1"
											value={QData.ans1}
											onChange={handleChangeQ}
											disableUnderline
											fullWidth
											rowsMax={8}
											rows={3}
											multiline
											placeholder="Type your wrong answer here ..."
											classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
									</CardDepth>
								</div>
								<div className={sty.inputDivText}>
									<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
										<EditorJS onChange={handleChangeQ2} placeholder="Type your wrong answer here ..."/>
										{/*<Input*/}
										{/*	id="ans2"*/}
										{/*	value={QData.ans2}*/}
										{/*	onChange={handleChangeQ}*/}
										{/*	disableUnderline*/}
										{/*	fullWidth*/}
										{/*	rowsMax={8}*/}
										{/*	rows={3}*/}
										{/*	multiline*/}
										{/*	placeholder="Type your wrong answer here ..."*/}
										{/*	classes={{ input: sty.input }}></Input>*/}
=======
										<Input
											id="ans2"
											value={QData.ans2}
											onChange={handleChangeQ}
											disableUnderline
											fullWidth
											rowsMax={8}
											rows={3}
											multiline
											placeholder="Type your wrong answer here ..."
											classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
									</CardDepth>
								</div>
								<div className={sty.inputDivText}>
									<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
										<EditorJS onChange={handleChangeQ3} placeholder="Type your wrong answer here ..."/>
										{/*<Input*/}
										{/*	id="ans3"*/}
										{/*	value={QData.ans3}*/}
										{/*	onChange={handleChangeQ}*/}
										{/*	disableUnderline*/}
										{/*	fullWidth*/}
										{/*	rowsMax={8}*/}
										{/*	rows={3}*/}
										{/*	multiline*/}
										{/*	placeholder="Type your wrong answer here ..."*/}
										{/*	classes={{ input: sty.input }}></Input>*/}
=======
										<Input
											id="ans3"
											value={QData.ans3}
											onChange={handleChangeQ}
											disableUnderline
											fullWidth
											rowsMax={8}
											rows={3}
											multiline
											placeholder="Type your wrong answer here ..."
											classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
									</CardDepth>
								</div>
								<div className={sty.inputDivText}>
									<CardDepth style={{ borderRadius: 12 }}>
<<<<<<< HEAD
										<EditorJS onChange={handleChangeQ4} placeholder="Type your wrong answer here ..."/>
										{/*<Input*/}
										{/*	id="ans4"*/}
										{/*	value={QData.ans4}*/}
										{/*	onChange={handleChangeQ}*/}
										{/*	disableUnderline*/}
										{/*	fullWidth*/}
										{/*	rowsMax={8}*/}
										{/*	rows={3}*/}
										{/*	multiline*/}
										{/*	placeholder="Type your wrong answer here ..."*/}
										{/*	classes={{ input: sty.input }}></Input>*/}
=======
										<Input
											id="ans4"
											value={QData.ans4}
											onChange={handleChangeQ}
											disableUnderline
											fullWidth
											rowsMax={8}
											rows={3}
											multiline
											placeholder="Type your wrong answer here ..."
											classes={{ input: sty.input }}></Input>
>>>>>>> 9c9c3c63081d25bb49fb9bd37ed0a5b5075c06a2
									</CardDepth>
								</div>
							</Grid>

						}

						<Grid container justify='space-evenly' style={{ paddingBottom: 22, paddingTop: 12 }} >
							<Fab variant='extended' classes={{ label: sty.label, }} className={sty.released} onClick={submit} >Submit</Fab>

						</Grid>


					</CardComponent>}
					{loading && <Grid container justify='center'>
						<Progress value={iup} />
					</Grid>}
				</Grid>
			}</Grid>

	);
};
UploadQBook.propType = {
	checkTeacher: PropTypes.func.isRequired,
	teacherAuth: PropTypes.object.isRequired

}
const mapToState = (state) => ({
	teacherAuth: state.admin.teacherAuth
})
const mapToProps = {
	checkTeacher
}
export default connect(mapToState, mapToProps)(UploadQBook);
