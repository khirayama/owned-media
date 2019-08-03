import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { State } from '../reducers';
import { Page as Component, Props as PageProps, FormattedMessage } from '../presentations/components/Page';
import { changeLocale } from '../actions/ui';

export interface Props extends RouteComponentProps<{ locale?: string }> {
  title: FormattedMessage;
  description: FormattedMessage;
}

const mapStateToProps = (state: State, props: Props) => {
  const defaultLocale = state.config ? state.config.locales[0] : '';
  const locale = props.match.params.locale || defaultLocale;

  return {
    locale,
    title: props.title,
    description: props.description,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    onUpdate: (props: PageProps) => {
      dispatch(changeLocale(props.locale));
    },
  };
};

// FYI: URLに紐づいた処理はcontainer/Pageで行うが、URLに紐づいた表示（タイトルなど）はcomponents/Pageで行う
export const Page = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Component),
);
