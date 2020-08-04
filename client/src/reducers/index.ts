import { combineReducers } from 'redux';

import appReducer from './appReducer';
import quoteReducer from './quoteReducer';

const rootReducer = combineReducers({ 
  app: appReducer,
  quote: quoteReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;