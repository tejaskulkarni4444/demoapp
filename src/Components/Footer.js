import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import { Link } from 'react-router-dom'
import HammerIcon from '@material-ui/icons/Gavel'
import { Typography } from '@material-ui/core'

const styles = theme => ({
    container: {
        padding: '20px',
        backgroundColor: 'Black',
        marginTop: 'auto',
        color: 'White'
    },
    logo:{ color: 'White' },
    socialContainer:{ padding: '10px' },
    footerLinks:{
        listStyle: 'none',
        padding: '0',
        '& *':{
            display: 'inline-block',
            padding: '0 5px',
            color: 'White',
            fontWeight: '600'
        }
    },
    title:{ fontWeight: '600'}
})

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                <Grid container>
                    <Grid item md={2} xs={12}>
                        <Link to='/'>
                            <HammerIcon className={classes.logo}/>
                        </Link>
                        <Typography>Build</Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <ul className={classes.footerLinks}>
                            <Link to='/about' className={classes.navLinks}><li>What we do?</li></Link>
                            <Link to='/services' className={classes.navLinks}><li>Services</li></Link>
                        </ul>
                    </Grid>
                    <Grid item md={2} xs={12}>
                        <Grid container>
                            <Grid item md={12} xs={12}>
                                <Typography className={classes.title}>Connect</Typography>
                            </Grid>
                        </Grid>
                        <Grid container className={classes.socialContainer}>
                            <Grid item md={6} xs={6}><FacebookIcon/></Grid>
                            <Grid item md={6} xs={6}><InstagramIcon/></Grid>
                            <Grid item md={6} xs={6}><LinkedInIcon/></Grid>
                            <Grid item md={6} xs={6}><TwitterIcon/></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container><Grid item md={12} xs={12}>&copy; The ___ company&reg;</Grid></Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Footer)