import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import ServiceGrid from './ServiveGrid'

const styles = theme => ({
    container: {
        width: '100%',
        height: '100%',
        // background: 'url(https://images.pexels.com/photos/8092/pexels-photo.jpg?auto=compress&cs=tinysrgb) no-repeat',
        // backgroundSize: 'contain'
    },
    searchInput: {
        width: '40%',
        margin: '20px 0',
        background: 'White',
        padding: '12px',
        borderRadius: '10px',
        border: 'White',
        outline: '0'
    },
    heading:{
        margin: '0',
        color: '#fff',
        textShadow: '0 1px 8px rgba(0,0,0,.2)'
    },
    headerContainer:{
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat',
        backgroundSize: '100%',
        height: '35%',
        backgroundPosition:'center'
    },
    headerBody:{
        transform: 'translateY(100px)'
    }
})

class Home extends Component {
    render() {
        const { name, classes } = this.props
        return (
            <div className={classes.container}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerBody}>
                        <h1 className={classes.heading}>{name}</h1>
                        <input className={classes.searchInput} placeholder="What are you looking for?" />
                    </div>
                </div>
                <ServiceGrid />
            </div>);
    }
}

export default withStyles(styles)(Home)