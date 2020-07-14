import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import Calculator from './Calculator'

const styles = theme => ({
    paper: { 
        backgroundColor: '#fff',
        padding: '20px',
        maxWidth: '500px',
        position: 'absolute',
        top: '15%',
        left: '35%',
        outline: '0',
        '-webkitAnimation': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'animation': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        '@media (max-width: 480px)':{
            top: '10%',
            left: '0',
            height: '100%'
        }
    },
    modalTitle: { 
        textAlign: 'center',
        marginTop: '5px' 
    },
    jobImage:{ 
        width: '100%',
        height: '100%'
    },
    materialList:{
        marginTop: '0',
        padding: '0 15px'
    },
    title:{ 
        fontWeight: theme.palette.title.fontWeight, 
        fontSize: theme.palette.title.fontSize,
        margin: '0 5px 5px 0px'
    },
    infoSection: {padding: '0 20px'},
    btn:{ 
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
        width: '100%',
        '&:hover':{
            backgroundColor: theme.palette.primary.dark,
        }
    }
})

class Job extends Component {
    
    componentWillMount(){
        const { info } = this.props
        this.setState({ open: info.isModalOpen})
    }
    
    state = {
        open: false
    }

    handleClose = () => {
        this.props.closeModal()
        this.setState({ open: false })
    }
    
    render() {
        const { classes, info } = this.props
        const { jobInfo } = info
        const { open } = this.state
        return (<Modal
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                <div className={classes.paper}>
                    <Grid container>
                        <Grid container>
                        <Grid item xs={11}>
                            <h3 className={classes.modalTitle}>{jobInfo.title}</h3>
                        </Grid>
                        <Grid item xs={1}>
                            <CloseIcon onClick={this.handleClose}/>
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={12} sm={6}><img src={jobInfo.image} className={classes.jobImage} alt="zz"/></Grid>
                                <Grid item xs={12} sm={6} className={classes.infoSection}>
                                    <h4 className={classes.title}>Required material</h4>
                                    <ul className={classes.materialList}>
                                        {jobInfo && jobInfo.material.map((material, index) => <li key={index}>{material}</li>)}
                                    </ul>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Calculator />
                        </Grid>
                        <Grid item xs={12}>
                            <Button className={classes.btn}>Continue</Button>
                        </Grid>
                    </Grid>
                </div>
                </Modal>)
    }
}

export default withStyles(styles)(Job)