import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home } from '../../presentations/pages/Home';
import { About } from '../../presentations/pages/About';
import { Users } from '../../presentations/pages/Users';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about/" component={About} />
      <Route exact path="/users/" component={Users} />
    </Switch>
  );
}
