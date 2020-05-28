import React, { Component } from 'react';
import axios from 'axios';

class Service extends Component {
    state = {
        serviecDetails: {}
    }
    componentDidMount(){
        console.log('gi')
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
        return (
            <div>
                <img src={serviecDetails.avatar} alt='zz'/>
                <p>{serviecDetails.name}</p>
               <p>{serviecDetails.description}</p>
            </div>
        );
    }
}

export default Service