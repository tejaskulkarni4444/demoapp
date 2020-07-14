import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { fade } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import HammerIcon from '@material-ui/icons/Gavel'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import classNames from 'classnames'
import LoginIcon from '@material-ui/icons/AccountCircle'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    navContainer:{
      position: 'relative',
      top: '0',
      backgroundColor: 'Black'
    },
    logoBtn: {
      
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
    navIcon: { transform: 'translateY(5px)' }
  });

class Navbar extends Component {
  state = {
    isHomePage: false,
    drawerOpen: false,
    isDrawerClicked: false
  }
  handleDrawerOpen = () => {
    this.setState({drawerOpen: true, isDrawerClicked: true})
  }

  handleDrawerClose = () => {
    this.setState({drawerOpen: false, isDrawerClicked: false})
  }

  render() {
    const { classes } = this.props
    const { drawerOpen } = this.state  
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
                <Link to='/' className={classes.navLinks}>
                  <LoginIcon className={classes.navIcon}/>
                </Link>
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
                    {['Login/Sign up','What we do?','Services'].map((text, index) => (
                      <Link to={`/${text}`} key={index}>
                        <ListItem button key={text} className={classes.drawerItems}>
                          <ListItemText primary={text} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </Drawer>
            </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar)