import produce from 'immer';
import { quoteState, actionMan } from './types';

const initialState = {
  quoteStatus: 'idle',

}
//appStatus: 'idle', 'loading'


const quoteReducer = (state: quoteState = initialState, action: actionMan) => {
  switch (action.type) {
    case 'SET_STATUS_LOADING':
      
      return produce(state, draftState => {
        draftState.quoteStatus = 'loading';
      });
    case 'SET_STATUS_IDLE':
      
      return produce(state, draftState => {
        draftState.quoteStatus = 'idle';
      });
  
    default:
      return state;
  }
}

export default quoteReducer;