import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {Link} from "react-router-dom"
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    category:{
        listStyle: 'none',
        cursor: 'pointer',
        '& a':{
            textDecoration: 'none',
            color: '#000'
        },
        '& a:hover':{
            textDecoration: 'none', 
        }
    },
    categoryList: { padding: '0'}
})

class Categories extends Component {
    state = {
        categories:[]
    }
    componentDidMount(){
        axios.get('https://buildmeapi.herokuapp.com/services/getCategories').then(res => {
            this.setState({categories: res.data.data},()=> console.log(this.state.categories))
        })
    }
    render() {
        const { classes } = this.props
        const { categories } = this.state
        return (
            <div>
                <hr />
                <ul className={classes.categoryList}>
                {categories && categories.length === 0 && <CircularProgress />}
                {categories &&categories.length !== 0 && categories.map(category => {return <li  key={category.id} className={classes.category}>
                    <Link to={`/category/${category.id}`}><h4>{category.name}</h4></Link>
                    </li>
                    })
                }
                </ul>
            </div>
        )
    }
}

export default withStyles(styles)(Categories)