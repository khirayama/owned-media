import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { LocaleBar as Component } from '../presentations/components/LocaleBar';
import { moveTo } from '../usecases';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onEnglishLocaleClick: () => {
      dispatch(moveTo('en'));
    },
    onJapaneseLocaleClick: () => {
      dispatch(moveTo('ja'));
    },
  };
};

export const LocaleBar = connect(
  null,
  mapDispatchToProps,
)(Component);
