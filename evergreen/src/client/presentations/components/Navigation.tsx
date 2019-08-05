import * as React from 'react';

import { LocaleLink } from '../../containers/LocaleLink';
import { AppLink } from '../../containers/AppLink';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <LocaleLink to="/">日本語</LocaleLink>
        </li>
        <li>
          <LocaleLink to="/en">English</LocaleLink>
        </li>
      </ul>
      <ul>
        <li>
          <AppLink to="/">Home</AppLink>
        </li>
        <li>
          <AppLink to="/resources/fundamental-knowledge">Fundamental Knowledge</AppLink>
        </li>
      </ul>
    </nav>
  );
}
