import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Button, Grid } from '@material-ui/core'

const styles = theme => ({
    container: { padding: '20px'},
    nextBtn:{ background: 'Grey'}
})
class Service extends Component {
    state = {
        serviecDetails: {}
    }
    componentDidMount(){
        const serviceName = document.location.href.split('/')
        this.getData(serviceName[serviceName.length-1])
    }
    getData = (serviceName) => {
        axios.get(`https://5ecd617f7c528e00167cd462.mockapi.io/services/${serviceName}`)
      .then(res => {
        if(res){
            this.setState(state => { 
                state.serviecDetails = res.data
                return state
            })
        }
      })
    }

    render() {
        const { serviecDetails } = this.state
        const { classes } = this.props
        return (
            <div className={classes.container}>
                {Object.keys(serviecDetails).length === 0 && <CircularProgress/>}
                {Object.keys(serviecDetails).length !== 0 && 
                    <Grid container>
                        <Grid item xs={12} md={3}>
                            <img src={serviecDetails.avatar} alt='zz'/>
                            <p>{serviecDetails.description}</p>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <h1>{serviecDetails.name}</h1>
                            <Button className={classes.nextBtn}>Book</Button>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
}

export default withStyles(styles)(Service)