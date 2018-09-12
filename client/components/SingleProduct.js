import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
//import {connect} from 'react-redux'
//potential material ui component - card, complex 

const fakeSingleProduct = {
    title: 'Cook a Duck',
    price: 45.50,
    imageUrl: "https://cdn.vectorstock.com/i/1000x1000/63/27/white-duck-with-empty-thoughts-vector-1266327.jpg",
    description: 'Learn how to cook a duck in the French style',
    category: 'Cooking',
    quantity: 6

}

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
//345, 140
const styles = {
    card: {
      maxWidth: 400,
    },
    media: {
      height: 300,
    },
  };

class SingleProduct extends Component {
    componentDidMount(){
        
    }
    render () {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={fakeSingleProduct.imageUrl}
                    title={fakeSingleProduct.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {fakeSingleProduct.title}
                    </Typography>
                    <Typography component="p">
                        {fakeSingleProduct.description}
                    </Typography>
                    <Typography component="p">
                        {fakeSingleProduct.price}
                    </Typography>
                    <Typography component="p">
                        {fakeSingleProduct.quantity}
                    </Typography>
                    </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
            </Card>
        )
    }

}

SingleProduct.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SingleProduct);


