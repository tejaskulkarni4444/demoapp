import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { fade } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'
import HammerIcon from '@material-ui/icons/Gavel'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    navContainer:{
      position: 'unset',
      top: '0',
      backgroundColor: '#00adff'
    },
    menuButton: {
      marginRight: theme.spacing(2),
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
    navbar:{ listStyle: 'none' },
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
    }
  });

class Navbar extends Component {
  render() {
    const { classes } = this.props
    return (<AppBar className={classes.navContainer}>
              <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >{/* TODO Add a logo */}
                <Link to='/'>
                  <HammerIcon fontSize='large' aria-label="hah"/>
                </Link>
              </IconButton>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="What are you looking for?"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <ul className={classes.navbar} position="start">
                <Link to='/about' className={classes.navLinks}><li>What we do?</li></Link>
                <Link to='/services' className={classes.navLinks}><li>Services</li></Link>
                <Link to='/' className={classes.navLinks}><li>Login</li></Link>
              </ul>
              </Toolbar>
          </AppBar>
    );
  }
}

export default withStyles(styles)(Navbar)