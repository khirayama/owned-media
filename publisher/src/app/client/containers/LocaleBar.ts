import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { LocaleBar as Component } from '../presentations/components/LocaleBar';
import { changeLocale } from '../actions';
import { State } from '../reducers';

const mapStateToProps = (state: State) => {
  return {
    value: state.ui.locale,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (event: React.FormEvent<HTMLSelectElement>) => {
      const value = event.currentTarget.value;
      if (value) {
        dispatch(changeLocale(value));
      }
    },
  };
};

export const LocaleBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
