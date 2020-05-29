import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    container: { padding: '20px'}
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
        console.log(res)
        if(res){
            this.setState(state => { 
                state.serviecDetails = res.data
                return state
            },()=> console.log(this.state.serviecDetails))
        }
      })
    }

    render() {
        const { serviecDetails } = this.state
        const { classes } = this.props
        console.log(Object.keys(serviecDetails).length)
        return (
            <div className={classes.container}>
                {Object.keys(serviecDetails).length === 0 && <CircularProgress/>}
                {Object.keys(serviecDetails).length !== 0 && <div>
                    <img src={serviecDetails.avatar} alt='zz'/>
                    <p>{serviecDetails.name}</p>
                    <p>{serviecDetails.description}</p>
                </div>}
            </div>
        );
    }
}

export default withStyles(styles)(Service)