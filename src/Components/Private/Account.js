import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {userAction} from '../../Redux/Actions/serviceActions'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

function mapStateToProps(state) {
    return {
        state
    }
}
const styles = theme => ({
    container: {
        margin: 'auto',
    },
    rows:{
        padding: '10px'
    },
    rightContainer:{
        borderLeft: 'solid 1px gray'
    }
})
class Account extends Component {
    state = {
        fullname: '',
        username: '',
        email: '',
    }
    componentDidMount(){
        const { userData } = this.props.state.reducer
        if(userData){
            this.setState({
                fullname: userData.fullname,
                username: userData.username,
                email: userData.email
            })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.container}>
                <Grid item md={3}>
                    <div></div>
                </Grid>
                <Grid item md={9} className={classes.rightContainer}>
                    <Grid item xs={12}><h2>Account details</h2></Grid>
                    <Grid container className={classes.rows}>
                        <Grid item md={2}>Name:</Grid>
                        <Grid item md={10}>{this.state.fullname}</Grid>
                    </Grid>
                    <Grid container className={classes.rows}>
                        <Grid item md={2}>Username:</Grid>
                        <Grid item md={10}>{this.state.username}</Grid>
                    </Grid>
                    <Grid container className={classes.rows}>
                        <Grid item md={2}>Emai Id:</Grid>
                        <Grid item md={10}>{this.state.email}</Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        )
    }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Account))