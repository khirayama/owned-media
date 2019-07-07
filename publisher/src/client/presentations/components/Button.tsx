import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { styles } from '../styles/vars';

export const FlatButton = styled.button`
  padding: 8px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const FlatLink = styled(Link)`
  padding: 8px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const FloatButton = styled(FlatButton)`
  padding: 8px 12px;
  background: ${styles.colors.primary};
  color: ${styles.colors.white};
  border-radius: ${styles.radius}px;
`;
