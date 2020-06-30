import { combineReducers } from 'redux';

import appReducer from './appReducer';

const rootReducer = combineReducers({ 
  app: appReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;