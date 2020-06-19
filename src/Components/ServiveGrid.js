import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    container:{
        margin: '30px auto'
    },
    serviceLogo:{
        display: 'block',
        margin: 'auto',
        maxWidth: '85px'
    },
    serviceLink: {
        display: 'block',
        textAlign: 'center',
        fontSize: '14px',
        color: 'Black',
        fontWeight: '600',
        margin: '5px auto'
    },
    serviceName: {

    }
})
class ServiceGrid extends Component {
    componentDidMount(){
        this.getData()
        // this.setData()
    }
    state = {
        serviceList: {
           data :[]
        },
        data:{},
        something:{
            "id": "1",
            "name": "Tejas",
            "avatar": "http://lorempixel.com/640/480/transport",
            "Description": "FTP Checking Account Internal"
        }
    }

    getData = () => {
        axios.get(`https://5ecd617f7c528e00167cd462.mockapi.io/services`)
        .then(res => {
        if(res){
            this.setState(state => { 
                state.serviceList.data = res.data
                return state
            })
        }
      })
    }
    // setData = () => {
    //     axios.post(`https://5ecd617f7c528e00167cd462.mockapi.io/demo`,this.state.something)
    //     .then(res => {
    //       if(res){
    //           this.setState(state => { 
    //               state.serviceList.data = res.data
    //               return state
    //           },()=> console.log(this.state.serviceList))
    //       }
    //     })
    // }
    render() {
        const { serviceList } = this.state
        const { classes } = this.props
        return (<Grid container alignItems="flex-end" justify="center" className={classes.container}>
                    {serviceList.data.length === 0 && <div className={classes.root}>
                        <CircularProgress />
                    </div>}
                    {serviceList.data.map(service => <Grid key={service.id} item xs={4} md={2}>
                            <Link to={`/jobs/${service.id}`} className={classes.serviceLink}>
                                <img src={service.avatar} className={classes.serviceLogo} alt="logo"/>
                                <label className={classes.serviceName}>{service.name}</label>
                            </Link>
                        </Grid>) }
                </Grid>)
    }
}

export default withStyles(styles)(ServiceGrid)