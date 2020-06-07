import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import ServiceGrid from './ServiveGrid'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { Button } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = theme => ({
    container: { width: '100%'},
    searchInputContainer:{
        width: '40%',
        '@media (max-width: 480px)':{ width: '100%' }
    },
    searchIcon: { position: 'absolute' },
    searchInput: {
        margin: '20px 0',
        background: 'White',
        padding: '12px 15px 12px 35px',
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
        height: '275px',
        padding: '20px',
        backgroundPosition:'center',
        '@media (max-width: 480px)':{
            backgroundSize: '100% 100%'
        }
    },
    headerBody:{ transform: 'translateY(100px)' },
    searchBtn:{
        background: 'White',
        '@media (max-width: 480px)':{ width: '100%' }
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
                        <div className={classes.search}>
                            <InputBase
                                placeholder="What are you looking for?"
                                classes={{
                                    root: classes.searchInputContainer,
                                    input: classes.searchInput,
                                }}
                                startAdornment = {
                                    <InputAdornment position="end" className={classes.searchIcon}>
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <Button variant='contained' className={classes.searchBtn}>Search</Button>
                    </div>
                </div>
                <ServiceGrid />
            </div>);
    }
}

export default withStyles(styles)(Home)