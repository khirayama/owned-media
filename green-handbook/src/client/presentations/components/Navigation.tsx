import * as React from 'react';
import { Link } from 'react-router-dom';

import { LocaleBar } from '../../containers/LocaleBar';

export function Navigation() {
  return (
    <nav>
      <LocaleBar />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/resources/fundamental-knowledge">Fundamental Knowledge</Link>
        </li>
      </ul>
    </nav>
  );
}
