import * as React from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/ja">日本語</Link>
        </li>
        <li>
          <Link to="/en">English</Link>
        </li>
      </ul>
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
