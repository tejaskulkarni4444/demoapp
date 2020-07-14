import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'

const styles = theme => ({
    container:{
        padding: theme.container.padding
    },
    input:{
        display: 'inline-block',
        '& input': {
            Width: '100%'
        }
    },
    row:{
        margin:'10px 0'
    },
    calculateBtn:{
        display: 'block',
        margin: 'auto'
    }
})

class Calculator extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Grid container>
                    <Grid item xs={12}><h3>Please enter dimensions to get a cost Quotation</h3></Grid>
                    <Grid item xs={12} sm={6} className={classes.row}>
                        <TextField id="filled-basic" label="Height" variant="filled" className={classes.input}/>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.row}>
                       <TextField id="filled-basic" label="Width" variant="filled" className={classes.input}/> 
                    </Grid>
                    <Grid item xs={12} className={classes.row}>
                        <Button variant="contained" className={classes.calculateBtn}>Calculate</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Calculator)