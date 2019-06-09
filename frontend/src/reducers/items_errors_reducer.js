import { RECEIVE_ITEM_ERRORS, RECEIVE_ITEM } from '../actions/item_actions';

const _nullErrors = [];

const ItemsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ITEM_ERRORS:
      return Object.values(action.errors);
    case RECEIVE_ITEM:
      return _nullErrors;
    default:
      return state;
  }
};

export default ItemsErrorsReducer;
