import { connect } from 'react-redux';
import { fetchUserBoards } from '../../actions/board_actions';
import { openModal } from '../../actions/modal_actions';
import BoardsIndex from './boards_index';

const msp = (state, ownProps) => {
  return {
    boards: Object.values(state.entities.boards),
    userId: state.entities.users[ownProps.match.params.userId]
  };
};

const mdp = dispatch => {
  return {
    fetchUserBoards: userId => dispatch(fetchUserBoards(userId)),
    openModal: type => dispatch(openModal(type))
  };
};

export default connect(
  msp,
  mdp
)(BoardsIndex);
