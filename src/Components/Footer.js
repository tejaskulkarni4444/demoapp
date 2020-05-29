import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    container: {
        padding: '20px',
        backgroundColor: 'Black',
        marginTop: 'auto',
        color: 'White'
    }
})

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.container}>
                This is footer 
            </div>
        )
    }
}

export default withStyles(styles)(Footer)