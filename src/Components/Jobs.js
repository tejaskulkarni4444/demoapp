import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Grid } from '@material-ui/core'
import Job from './Job'
import Categories from './Categories'

const styles = theme => ({
    pageTitle:{ margin:'10px 0'},
    container: { padding: '20px'},
    nextBtn:{ background: 'Grey'},
    job: { 
        margin: '10px',
        textAlign: 'left',
        boxShadow: '0px 0px 6px 0px rgba(82,82,82,1)',
        maxWidth: '45%',
        cursor: 'pointer',
        '& :focus':{
            outline: 'none'
        },
        '@media (max-width: 480px)':{ maxWidth: '100%'}
    },
    title: { 
        fontWeight: '600'
    },
    description:{ color: '#000'},
    jobImage:{ 
        width: '100%',
        height: '100%'
    },
    textContainer:{ padding: '10px'}
})
class Jobs extends Component {
    state = {
        serviecDetails: {},
        isModalOpen: false,
        jobInfo: {}
    }
    componentDidMount(){
        const splitUrl = document.location.href.split('/')
        this.getData(splitUrl[splitUrl.length-1])
    }
    getData = (id) => {
        axios.get(`https://5ecd617f7c528e00167cd462.mockapi.io/joblist/${id}`)
      .then(res => {
        if(res){
            this.setState(state => { 
                state.serviecDetails = res.data
                return state
            })
        }
      })
    }
    handleModalOpen = (jobInfo) => {
        this.setState({
            isModalOpen: true,
            jobInfo: jobInfo
        })
    }
    handleClose = () => {
        this.setState({isModalOpen: false})
    }

    render() {
        const { serviecDetails, isModalOpen } = this.state
        const { classes } = this.props
        return (
            <div className={classes.container}>
                {Object.keys(serviecDetails).length === 0 && <CircularProgress/>}
                {Object.keys(serviecDetails).length !== 0 && 
                    <Grid container>
                        <Grid item xs={12} sm={3}>
                            <img src={serviecDetails.jobImage} alt='zz'/>
                            <p>{serviecDetails.description}</p>
                            <Categories/>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <h1 className={classes.pageTitle}>{serviecDetails.name}</h1>
                            <Grid container>
                                {serviecDetails.jobs.map((job, index) => 
                                { return <div key={index} className={classes.job} onClick={() => this.handleModalOpen(job)}>
                                            <Grid container>
                                                <Grid item xs={12} className={classes.imageContainer}>
                                                    <img src={job.image} className={classes.jobImage} alt="Job pic"/>
                                                </Grid>
                                                <Grid item xs={12} className={classes.textContainer}>
                                                    <Grid container>
                                                        <Grid item xs={12} md={12} color="primary" className={classes.title}>{job.title}</Grid>
                                                        <Grid item xs={12} md={12} className={classes.description}>{job.description}</Grid>
                                                    </Grid>
                                                </Grid>  
                                            </Grid>                                 
                                        </div>})
                            }
                            </Grid>
                        </Grid>
                    </Grid>
                }
                {isModalOpen && <Job info={this.state} closeModal={this.handleClose} />}
            </div>
        );
    }
}

export default withStyles(styles)(Jobs)