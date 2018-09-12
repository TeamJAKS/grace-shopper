import React, {Component} from 'react';
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
const fakeReviews = [
    {
        title: 'Great Product',
        text: 'I love this so much',
        stars: 4,
        user: 'Stacy & Keyairra'
    },

    {
        title: 'Decent Product',
        text: 'I thought this was okay',
        stars: 3,
        user: 'Keyairra & Stacy'
    }
]

class Review extends Component {
    componentDidMount () {

    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
            <List>
                {fakeReviews.map(review => {
                    return (
                        <ListItem>
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
  
export default withStyles(styles)(Review);