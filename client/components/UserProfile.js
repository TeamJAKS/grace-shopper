import React from 'react'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {getUserAddress} from '../store/user'

const styles = {
  card: {
    maxWidth: 400
  },
  media: {
    height: 300
  }
}
class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: props.match.params.userId
    }
  }
  componentDidMount() {
    this.props.getAddress(this.state.userId)
  }
  render() {
    const {classes} = this.props
    const user = this.props.user
    const address = this.props.address
    let curAddress
    if (address) {
      curAddress = address[0]
    }
    if (user.firstName && curAddress) {
      const letter = user.firstName.slice(0, 1)
      return (
        <Card className={classes.card}>
          <CardActionArea>
            <Avatar>{letter}</Avatar>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {user.firstName + user.lastName}
              </Typography>
              <Typography component="p">{user.email}</Typography>
              <Typography component="p">
                {curAddress.street +
                  ' ' +
                  curAddress.city +
                  ', ' +
                  curAddress.state}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              onClick={() =>
                this.props.history.push(`/users/profile/${user.id}/edit`)
              }
              size="small"
              color="primary"
              value="edit"
            >
              Edit
            </Button>
            <Button size="small" color="primary" value="purchases">
              Purchases
            </Button>
          </CardActions>
        </Card>
      )
    } else return null
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    address: state.user.address
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: id => dispatch(getUserAddress(id))
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserProfile)
)
