import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container:{
        margin: '30px auto'
    },
    serviceLogo:{
        display: 'block',
        margin: 'auto',
        maxWidth: '50px'
    },
    serviceLink: {
        display: 'block',
        textAlign: 'center',
        fontSize: '14px',
        color: 'Black',
        fontWeight: '600',
    },
})
class ServiceGrid extends Component {
    componentDidMount(){
        this.getData()
    }
    state = {
        serviceList: {
           data :[]
        },
        data:{}
    }

    getData = () => {
        axios.get(`https://5ecd617f7c528e00167cd462.mockapi.io/services`)
      .then(res => {
        if(res){
            this.setState(state => { 
                state.serviceList.data = res.data
                return state
            },()=> console.log(this.state.serviceList))
        }
      })
    }
    render() {
        const { serviceList } = this.state
        const { classes } = this.props
        console.log(serviceList.data.map(s=>s))
        return (<Grid container spacing={0} className={classes.container}>
                    {serviceList.data.map(service => <Grid key={service.id} item xs={4} md={2}>
                            <Link to={`/services/${service.id}`} className={classes.serviceLink}>
                            <img src={service.avatar} className={classes.serviceLogo} alt="logo"/>
                            {service.name}
                            </Link>
                        </Grid>) }
                </Grid>)
    }
}

export default withStyles(styles)(ServiceGrid)