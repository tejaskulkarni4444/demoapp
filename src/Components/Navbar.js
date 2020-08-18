import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { fade, withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import HammerIcon from '@material-ui/icons/Gavel'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import classNames from 'classnames'
import LoginIcon from '@material-ui/icons/AccountCircle'
import Modal from '@material-ui/core/Modal'
import Login from './Public/Login'
import axios from 'axios'
import Registration from './Public/Register'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    navContainer:{
      position: 'relative',
      top: '0',
      backgroundColor: 'Black'
    },
    logo:{ color:'White'},
    logoText:{ 
      color:'White',
      display: 'inline-block',
      verticalAlign: 'top'
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      [theme.breakpoints.up('md')]:{
        display: 'none !important'
      },
      position: 'relative',
      margin: 'auto',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    navLinkContainer:{ 
      listStyle: 'none',
      marginLeft: 'auto'
    },
    navLinks:{ 
      display: 'inline-block',
      margin: '0 10px',
      color: 'White',
      fontWeight: '600',
      '@media (max-width: 480px)': { display: 'none' },
    },
    searchInputContainer:{
      width: '40%'
    },
    searchInput: {
      margin: '20px 0',
      background: 'White',
      padding: '12px',
      borderRadius: '10px',
      border: 'White',
      outline: '0'
    },
    sliderMenu: { 
      marginLeft: 'auto',
      display: 'none',
      '@media (max-width:480px)':{
        display: 'inline-block'
      }
    },
    drawerPaper: { 
      backgroundColor: 'Black',
      width: '50%'
    },
    drawerItems: { color: '#fff'},
    navIcon: { 
      transform: 'translateY(7px)',
      margin: '0 5px',
      '@media (max-width: 480px)':{
        transform: 'translateY(0px)',
        verticalAlign: 'top'
      }
    },
    loginModal: { 
      width: '50%',
      top: '8%  !important',
      left: '25% !important',
      overflowY: 'scroll',
      '& div':{ outline: '0'},
      '@media (max-width: 480px)': {
        top: '20% !important',
        left: '0 !important',
        width: '100%'
      }
    },
    loggedInDropdown: {
      postion: 'absolute',
      right: '50px !important',
      top: '70px !important',
      left: 'unset !important',
      height: '78px',
      border: 'solid 1px #000',
      outline: 'unset',
      width: '150px',
      '& a':{
        display: 'block',
        color: '#000',
        fontSize: theme.palette.title,
        padding: '10px',
        backgroundColor: '#fff',
        borderBottom: 'solid 1px #000'
      },
      '& div':{
        backgroundColor: 'transparent !important'
      },
      closeBtn:{
        display: 'block',
        textAlign: 'right',
        color: '#000'
      },
      progressIcon:{
        display: 'block',
        position: 'absolute !important',
        left: '40%',
        top: '35%',
        background: 'transparent'
      }
    },
  });

class Navbar extends Component {
  state = {
    isHomePage: false,
    drawerOpen: false,
    isDrawerClicked: false,
    loginModalOpen: false,
    registerModalOpen: false,
    loggedInMenu: false,
    loggedInMenuOpen: false,
    isLoggedIn: false,
    fullname: '',
    inProgress: false
  }
  componentDidMount(){
    const isLoggedIn = localStorage.getItem("buildFixToken") ? true : false
    if(isLoggedIn) {  //Check if user was lgged in previously
      this.setState({isLoggedIn: true}) //add redux state
      const loginInfo = JSON.parse(localStorage.getItem("buildFixToken"))
      this.setState({fullname: loginInfo.fullname})
    }
  }
  handleDrawerOpen = () => {
    this.setState({drawerOpen: true, isDrawerClicked: true})
  }

  handleDrawerClose = () => {
    this.setState({drawerOpen: false, isDrawerClicked: false})
  }

  handleModalClose = (type) => {
    if(type) { 
      if(type === 'login'){
      this.setState({ loginModalOpen: false}) }
      else{ this.setState({ registerModalOpen: false})}
    } 
  }

  handleloggedInModal = () => {
    this.setState({ loggedInModal: !this.state.loggedInModal})
  }

  handleLoginActions = (info = {}) => { //Handle login events
    if(info.loginInfo.isLoggedIn === true) {
      this.setState(state => {
        state.loginModalOpen = false
        state.isLoggedIn = true
        state.fullname = info.loginInfo.fullname
        return state
      },()=> window.location.reload())
    } 
    else if(info.loginInfo.isLoggedIn === false){
      this.setState({isLoggedIn: false})
    }
    if(info.isRegister){
      this.setState({loginModalOpen: false,registerModalOpen: true})
    }
  }

  handleRegisterActions = (info) => {     //handle registration events
    const token = localStorage.getItem("buildFixToken")
    if(info.loginInfo.isLoggedIn === true && token) {
      this.setState(state => {
        state.registerModalOpen = false
        state.isLoggedIn = true
        state.fullname = info.loginInfo.fullname
        return state
      },()=> window.location.reload())
    } 
    else if(info.loginInfo.isLoggedIn === false){
      this.setState({isLoggedIn: false})
    }
  }

  handleLoggedInMenuClose = () => {
    this.setState({ loggedInMenuOpen: false })
  }

  handleLogout = () => {  //Handle logout events
    this.setState({inProgress: true})
    const token = JSON.parse(localStorage.getItem('buildFixToken')).token.access
    axios.post('https://buildmeapi.herokuapp.com/user/logout/',{},{ 
      headers:{
      'Authorization': `Bearer ${token}`
      }
    }).then(res =>{
      localStorage.removeItem('buildFixToken')
      this.setState({
        isLoggedIn: false, 
        loggedInMenuOpen: false
      },()=> window.location.reload())
    })
   
  }
  closeDrawer = () => {
    this.setState({drawerOpen: false})
  }

  render() {
    const { classes } = this.props
    const { drawerOpen, loginModalOpen, isLoggedIn, loggedInMenuOpen, registerModalOpen } = this.state
    const loggedIn = localStorage.getItem("buildFixToken")
    return (<AppBar className={classes.navContainer}>
              <Toolbar>
              <IconButton
                edge="start"
                className={classes.logoBtn}
                color="inherit"
                aria-label="open drawer"
              >
                <Link to='/'>
                  <HammerIcon className={classes.logo}/>
                  <Typography className={classes.logoText}>&nbsp;Build</Typography>
                </Link>
              </IconButton>
              <ul className={classes.navLinkContainer} position="start">
                <Link to='/about' className={classes.navLinks}><li>What we do?</li></Link>
                <Link to='/services' className={classes.navLinks}><li>Services</li></Link>
                {!isLoggedIn && <span className={classes.navLinks} onClick={() => this.setState({ loginModalOpen: true })}>
                  <LoginIcon className={classes.navIcon}/>
                  <span>Login</span>
                </span>}
                {isLoggedIn && <span className={classes.navLinks} onClick={() => this.setState({ loggedInMenuOpen: true })}>
                  <LoginIcon className={classes.navIcon} color="primary"/>
                  <span >{this.state.fullname}</span>
                </span>}
              </ul>
              <MenuIcon 
                edge="start" 
                id='sliderBtn'
                className={classNames(classes.sliderMenu, classes.sliderBtn)} 
                onClick={this.handleDrawerOpen}
                color="inherit" 
                aria-label="menu"
              />
              </Toolbar>
                <Drawer
                  variant="persistent"
                  anchor="right"
                  open={drawerOpen}
                  onClose={this.closeDrawer}
                  // onRequestChange={this.handleDrawerClose}
                  ModalProps={{ onBackdropClick: this.handleDrawerClose }}
                  className={classes.drawerContainer}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerHeader}>
                    <IconButton onClick={this.handleDrawerClose} style={{color: '#fff', display: 'block'}}>
                      <ChevronRightIcon/>
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {!loggedIn && <ListItem button className={classes.drawerItems}>
                      <LoginIcon className={classes.navIcon}/>
                      <Link to='/' className={classes.drawerItems} onClick={() => this.setState({ loginModalOpen: true })}>Login</Link>
                      </ListItem>
                    }
                    {loggedIn && <ListItem button className={classes.drawerItems}>
                      <Link to='/' className={classes.drawerItems}><LoginIcon className={classes.navIcon} color="primary"/>{this.state.fullname}</Link>
                      </ListItem>
                    }
                    <ListItem button className={classes.drawerItems}><Link to='/about' className={classes.drawerItems}><li>What we do?</li></Link></ListItem>
                    <ListItem button className={classes.drawerItems}><Link to='/services' className={classes.drawerItems}><li>Services</li></Link></ListItem>
                    { loggedIn && <ListItem button className={classes.drawerItems}><Link to='/myaccount' className={classes.drawerItems}><li>My account</li></Link></ListItem>}
                    { loggedIn && <ListItem button className={classes.drawerItems} onClick={this.handleLogout}><Link to='/' className={classes.drawerItems}><li>Logout</li></Link></ListItem>}
                  </List>
                </Drawer>
                {!loggedIn && <Modal
                  open = {loginModalOpen}
                  onClose = {()=> this.setState({loginModalOpen: false})}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className = {classes.loginModal}
                >
                  <div>
                    <span className={classes.closeBtn}>x</span>
                    <Login handleLogin={this.handleLoginActions}/>
                  </div>
                </Modal>}
                {!loggedIn && registerModalOpen && <Modal
                  open = {registerModalOpen}
                  onClose = {()=> this.setState({registerModalOpen: false})}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  className = {classes.loginModal}
                >
                  <div>
                    <span className={classes.closeBtn}>x</span>
                    <Registration handleRegister={this.handleRegisterActions}/>
                  </div>
                </Modal>}
                {loggedIn && <Modal
                  id="simple-menu"
                  open={loggedInMenuOpen}
                  onClose={this.handleLoggedInMenuClose}
                  className={classes.loggedInDropdown}
                >
                  <div>
                    <Link to="/myaccount">My account</Link>
                    <Link  to="/" onClick={this.handleLogout}>Logout</Link>
                  </div>
                </Modal>}
            </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar)