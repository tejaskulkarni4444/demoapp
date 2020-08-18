import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {userAction} from '../../Redux/Actions/serviceActions'

const styles = theme => ({
    container: {
        backgroundColor: '#FFF',
        padding: '20px',
        textAlign: 'center'
    },
    inputRow:{
        padding: '5px 15px'
    },
    formInputs: {
        margin: '10px auto',
        width: '80%'
    },
    submitBtn:{
        width: '80%'
    },
    halfInput:{
        width: '100%',
        '@media (max-width: 480px)':{
            width: '80%'
        }
    },
    splitRow: {
        width: '80%',
        margin: 'auto',
        '@media (max-width: 480px)':{
            width: '100%'
        }
    }
})

const mapDispatchToProps = dispatch => ({
    userAction: (value) => dispatch(userAction(value))
})

class Register extends Component { 
    state = {
        formInformation: {
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            phone: '',
            password:'',
            confirmPass:'',
            image: 'zz'
        },
        errorMsgs: {
            emptyInput: 'cannot be empty',
            invalidInput: 'invalid',
            registerError: ''
        },
        isSubmitted: false,
        isProcessing: false,
        backendError: false,
        isSuccessful: false,
        backendErrorMsg: '',
        loginInfo:{
            isLoggedIn: false,
            loginError: false,
            tokenInfo: {},
            fullname: ''
        }
    }

    handleInput = (inputVal, inputName) => {
        this.setState(state => {
            state.formInformation[inputName] = inputVal
            return state
        })
    }

    handleSubmit = () => {
        const { formInformation } = this.state
        this.setState({isSubmitted: true, isProcessing: true})
        Object.values(formInformation).map(value => {
            if(value === '' || value === ' ' || value === undefined){
                this.setState({isProcessing: false})
                return false
            } 
            else { this.handleRegister() }
            return ''
        })
    }

    handleRegister = () => {
        const { firstname, lastname, username, email, phone, password,image } = this.state.formInformation
        const registerUrl = 'https://buildmeapi.herokuapp.com/user/signup/'
        console.log('called')
        axios.post(registerUrl,{
            'fullname': `${firstname} ${lastname}`,
            username,
            email,
            'contact_number':phone,
            password,
            image
        })
        .then(res => {
            console.log(res)
            if(res.data.token){
            this.setState(state => { 
                state.loginInfo.isLoggedIn = true 
                state.loginInfo.loginError = false
                state.isProcessing = false
                return state
            },() => {
                this.props.handleRegister(this.state)
                this.props.userAction({ 
                    'isLoggedIn': true, 
                    'fullname': res.data.fullname,
                    'username': res.data.username,
                    'email': res.data.email
                })
                localStorage.setItem("buildFixToken", JSON.stringify(res.data))
                window.location.reload()
            })
            } else { 
                this.setState({registerError: 'Something went wrong'})
            }
        })
        .catch(error => {
            this.setState({backendError: true, backendErrorMsg: error, isProcessing: false})
            return false
        })
    }

    render() {
        const { classes } = this.props
        const { formInformation, isSubmitted, isProcessing, backendError, backendErrorMsg, registerError } = this.state
        return (<Grid container className={classes.container}>
            <Grid item xs={12}><h2>Enter your details</h2></Grid>
            <Grid container className={classNames(classes.splitRow, classes.inputRow)}>
                <Grid item md={6} xs={12}>
                    <TextField 
                        variant="outlined" 
                        label="First name"
                        placeholder="First name"
                        className={classes.halfInput}
                        error={isSubmitted && (formInformation.firstname === '' || formInformation.firstname === ' ')}
                        onChange = {e=> this.handleInput(e.target.value, 'firstname')}
                        value={formInformation.firstname}
                        // helperText={inputError && inputError.includes('username') ? "Please enter ID" : ''}
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField 
                        variant="outlined" 
                        label="Last name"
                        placeholder="Last name"
                        className={classes.halfInput}
                        error={isSubmitted && (formInformation.lastname === '' || formInformation.lastname === ' ')}
                        value={formInformation.lastname}
                        onChange = {e=> this.handleInput(e.target.value, 'lastname')}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
                <TextField 
                    variant="outlined" 
                    label="Username (optional)"
                    placeholder="Enter username"
                    className={classes.formInputs}
                    value={formInformation.username}
                    error={isSubmitted && (formInformation.username === '' || formInformation.username === ' ')}
                    onChange = {e=> this.handleInput(e.target.value, 'username')}
                />
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
                <TextField 
                    variant="outlined" 
                    label="Email"
                    placeholder="Enter your email address"
                    className={classes.formInputs}
                    value={formInformation.email}
                    error={isSubmitted && (formInformation.email === '' || formInformation.email === ' ')}
                    onChange = {e=> this.handleInput(e.target.value, 'email')}
                />
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
               <TextField
                    type="number"
                    variant="outlined" 
                    label="Phone number"
                    placeholder="Enter your phone number"
                    className={classes.formInputs}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                        maxLength: 10
                    }}
                    value={formInformation.phone}
                    error={isSubmitted && (formInformation.phone === '' || formInformation.phone === ' ')}
                    onChange = {e=> this.handleInput(e.target.value, 'phone')}
                />
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
                <TextField
                    type="password" 
                    variant="outlined" 
                    label="Password"
                    placeholder="Enter password"
                    className={classes.formInputs}
                    value={formInformation.password}
                    error={isSubmitted && (formInformation.password === '' || formInformation.password === ' ')}
                    onChange = {e=> this.handleInput(e.target.value, 'password')}
                />
            </Grid>
            <Grid item xs={12} className={classes.inputRow}>
                <TextField
                    type="password" 
                    variant="outlined" 
                    label="Confirm password"
                    placeholder="Confirm your password"
                    className={classes.formInputs}
                    value={formInformation.confirmPass}
                    error={isSubmitted && (formInformation.confirmPass === '' || formInformation.confirmPass === ' ')}
                    onChange = {e=> this.handleInput(e.target.value, 'confirmPass')}
                />
            </Grid>
            <Grid item xs={12}>
               <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    className={classes.submitBtn} 
                    onClick={() => this.handleSubmit()}
                    disabled={isProcessing}
                >Submit and Continue</Button>
            </Grid>
            {(backendError || registerError) && <Grid item xs={12} className={classes.inputRow}>
                <span>{backendErrorMsg ? backendError : registerError}</span>
            </Grid>}
        </Grid>)
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Register))