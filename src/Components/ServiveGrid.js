import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

class ServiceGrid extends Component {
    state = {
        serviceList: ['Plumbing','Carpentary','Maintenance','Repairs','Paint job', 'Water proofing']
    }
    render() {
        const { serviceList } = this.state
        return (
            <div>
                <Grid container>
                    { serviceList.map(service => <Grid key={service} item xs={4}>{service}</Grid>) }
                </Grid>
            </div>
        );
    }
}

export default ServiceGrid;