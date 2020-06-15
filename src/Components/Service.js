import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    paper: { 
        backgroundColor: '#fff',
        padding: '20px',
        maxWidth: '500px',
        position: 'absolute',
        top: '50%',
        left: '50%'
}
})

class Service extends Component {
    renderBody = () => {
        return( <div>this is body</div>)
    }
    handleClose = () => {

    }
    render() {
        const { classes, info } = this.props
        return (<Modal
                open={info.isModalOpen}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <span>this is body</span>
                    {/* <Button onClick={this.handleClose}>Close</Button> */}
                </div>
            {/* {this.renderBody} */}
          </Modal>
        );
    }
}

export default withStyles(styles)(Service)