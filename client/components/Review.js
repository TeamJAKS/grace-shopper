import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom'
import {getReviews} from '../store/product'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


class Review extends Component {
    componentDidMount () {
        this.props.getReviews(Number(this.props.id))
    }
    render(){
        const { classes } = this.props;
        const reviews = this.props.reviews
        return(
            <div className={classes.root}>
            <List>
                {reviews.map(review => {
                    return (
                        <ListItem key = {review.id}>
                            <Avatar>
                            {review.stars}
                            </Avatar>
                            <ListItemText primary={review.title} secondary={review.text} />
                        </ListItem> 
                    )
                })}      
            </List>
          </div>
        
        )
    }
}

Review.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
    return {
        reviews: state.product.reviews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReviews: (id) => dispatch(getReviews(id))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Review));