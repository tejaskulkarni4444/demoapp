import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {userAction} from '../../Redux/Actions/serviceActions'
import {connect} from 'react-redux'

const styles = theme => ({
    container: {
        backgroundColor: '#FFF',
        padding: '20px'
    },
    title: { textAlign: 'center'},
    loginInputs:{
        width: '50%',
        display: 'block',
        margin: '10px auto',
        '& div':{
            width: '100%'
        },
        '@media (max-width: 480px)': {
            width: '100%'
        }
    },
    submitBtn:{
        display: 'block',
        margin: 'auto'
    },
    errorMsg:{
        color: 'red',
        textAlign: 'center',
        display: 'block',
        margin:'10px'
    },
    text:{ 
        textAlign: 'center',
        margin: '10px auto'
    },
    signupTxt: {
        fontWeight: 'bold',
        cursor: 'pointer'
    }
})

const mapDispatchToProps = dispatch => ({
    userAction: (value) => dispatch(userAction(value))
})

class Login extends Component {
    state = {
        inputError: [],
        loginValues:{
            username:'',
            password:''
        },
        loginInfo:{
            isLoggedIn: false,
            loginError: false,
            tokenInfo: {},
            fullname: ''
        },
        isLoginDisabled: false,
        isRegister: false
    }

    handleInput = (e) => {
        e.preventDefault()
        const { loginValues } = this.state
        let isError = ''
        this.setState({isLoginDisabled: true, inputError: []})
        Object.keys(loginValues).map(key => {
            if (loginValues[key] === '' || loginValues[key] === ' ' || loginValues[key] === undefined) {
                isError = true
                this.setState(state => {
                    state.inputError.push(key)
                    state.isLoginDisabled = false
                    return state
                })
            }
            return ''
        })
        if(!isError){
            this.handleLogin()
        }        
    }

    handleRegisterModal = () => {
        this.setState({isRegister: true},()=>{
            this.props.handleLogin(this.state)
            console.log('kk')
        })   
    }

    handleLogin = () => {
        const { loginValues } = this.state
            axios.post('https://buildmeapi.herokuapp.com/user/login/', loginValues)
            .then(res =>{
                if(res.data && res.data.token){
                    this.setState(state => { 
                        state.loginInfo.isLoggedIn = true 
                        state.loginInfo.loginError = false
                        state.loginInfo.tokenInfo = res.data.token
                        state.loginInfo.fullname = res.data.fullname
                        return state
                    },() => {
                        this.props.handleLogin(this.state)
                        this.props.userAction({ 
                            'isLoggedIn': true, 
                            'fullname': res.data.fullname,
                            'username': res.data.username,
                            'email': res.data.email
                        })
                        localStorage.setItem("buildFixToken", JSON.stringify(res.data))
                    })
                } else { 
                    this.setState(state => {
                        state.loginInfo.loginError = true
                        return state
                    })
                    return false
                }
            })
            .catch(error => {
                this.setState(state => {
                    state.loginInfo.loginError = true
                    state.isLoginDisabled = false
                    return state
                })
                return false
            })
    }

    renderLogin = () => {
        const { classes } = this.props
        const { inputError, loginValues, loginInfo, isLoginDisabled } = this.state
        return <form onSubmit={this.handleLogin}>
        <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <h2 className={classes.title}>Login</h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        variant="outlined" 
                        label="Username"
                        error={inputError && inputError.includes('username')}
                        value= {loginValues.username}
                        className={classes.loginInputs}
                        onChange = { event=> {
                            const usernameValue = event.target.value
                            this.setState(state => {
                                loginValues.username = usernameValue
                                return state
                            })
                        }}
                        helperText={inputError && inputError.includes('username') ? "Please enter ID" : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        type="password"
                        variant="outlined" 
                        label="Password"
                        className={classes.loginInputs}
                        error={inputError && inputError.includes('password')}
                        value = {loginValues.password}
                        onChange = {event => {
                            const passValue = event.target.value
                            this.setState(state => {
                                loginValues.password = passValue 
                                return state
                            })
                        }}
                        helperText={inputError && inputError.includes('password') ? "Please enter Password." : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        className={classes.submitBtn} 
                        onClick={(e)=>this.handleInput(e)}
                        disabled={isLoginDisabled}
                    >Login</Button>
                </Grid>
            <Grid item xs={12}>
                {loginInfo.loginError && <span className={classes.errorMsg}>Login failed.</span>}
            </Grid>
            <Grid item xs={12} className={classes.text}>
                Don't have an account?&nbsp; 
                 <span className={classes.signupTxt} onClick={()=> this.handleRegisterModal()}>Sign up here</span>
            </Grid>
        </Grid>
        </form>
    }
            
    render() {
        const { isRegister } = this.state
        return (<div>
                    {isRegister === false && this.renderLogin()}
                </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login))