import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'

const styles = theme => ({
  stepsContainer:{
    padding: '20px',
  },
  icons:{
    display: 'Block',
    textAlign: 'center',
    margin: 'auto'
  },
  step:{
    padding: '0 10px',
    '@media (max-width: 960px)':{
      padding: '10px'
    }
  },
  stepBox:{
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    padding: '10px 20px 20px 20px'
  }
})

class Steps extends Component {
    render() {
      const { classes } = this.props
        return (
                <div className={classes.root}>
                  <h2>Four easy steps</h2>
                  <Grid container className={classes.stepsContainer}>
                    <Grid item xs={12} sm={6} md={3} className={classes.step}>
                      <div className={classes.stepBox}>
                        <h4>Step 1</h4>
                        <SearchIcon className={classes.icons}/>
                        <Typography>Find the service</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.step}> 
                      <div className={classes.stepBox}> 
                        <h4>Step 2</h4>                                          
                        <BorderColorIcon className={classes.icons}/>
                        <Typography>Enter your details</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.step}>
                      <div className={classes.stepBox}>
                        <h4>Step 3</h4>
                        <ReceiptIcon className={classes.icons}/>
                        <Typography>Get a pricing estimate</Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} className={classes.step}>
                      <div className={classes.stepBox}>
                        <h4>Step 4</h4>
                        <AssignmentTurnedInIcon className={classes.icons}/>
                        <Typography>Book</Typography>
                      </div>
                    </Grid>
                  </Grid>
                </div>
        );
    }
}

export default withStyles(styles)(Steps)