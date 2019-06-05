import { connect } from 'react-redux'
import { fetchUserBoards } from '../../actions/board_actions'
import FeedIndex from './boards_index'

const msp = (state) => {
  return {
    currentUserId: state.session.userId
  }
}

const mdp = (dispatch) => {
  return {
    fetchUserBoards: userId => dispatch(fetchUserBoards(userId))
  }
}

export default connect(msp, mdp)(FeedIndex)