import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';

import { State } from '../reducers';
import { Page as Component, Props as PageProps } from '../presentations/components/Page';
import { changeLocale } from '../actions/ui';

type Props = {
  title: {
    descriptor: string;
    values?: any;
  };
  description: {
    descriptor: string;
    values?: any;
  };
};

const mapStateToProps = (state: State, props: Props) => {
  return {
    defaultLocale: state.config ? state.config.locales[0] : '',
    title: props.title,
    description: props.description,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onUpdate: (props: PageProps) => {
      console.log(props);
      dispatch(changeLocale(props.locale || props.defaultLocale));
    },
  };
};

export const Page = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
