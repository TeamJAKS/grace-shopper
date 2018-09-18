import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addNewReview} from '../store/product'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit
  }
})

class AddReviewForm extends React.Component {
  constructor(){
    super()
    this.state= {
      title:'',
      text: '',
      stars: 0,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const {title, text, stars} = this.state
    this.props.postReview({title, text, stars, productId: this.props.match.params.productId})
    alert('A new review was added to this product')
  }
  render() {
    let loggedIn = this.props.user.id
    if (!loggedIn) {
      return (
        <p>We value your opinion! Please create an account in order to share your thoughts.</p>
      )
    }
    return (
      <div>
        <h1>Review Form</h1>
        <form onSubmit={this.handleSubmit}>
          <FormControl className="name">
            <InputLabel htmlFor="title">Review Title</InputLabel>
            <Input
              id="title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="name">
            <InputLabel htmlFor="text">Your Thoughts</InputLabel>
            <Input
              id="review-text"
              name="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="name">
            <InputLabel htmlFor="stars">Star Rating</InputLabel>
            <Input
              name="stars"
              value={this.state.stars}
              onChange={this.handleChange}
            />
          </FormControl>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('here is the state in the add review form', state)
  return {
    reviews: state.product.reviews,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postReview: review => dispatch(addNewReview(review))
  }
}

const AddReviewComponent = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddReviewForm)
)
export default withStyles(styles)(AddReviewComponent)
