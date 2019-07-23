import styled from 'styled-components';

import { styles } from '../styles/vars';
import { AppLink } from '../../containers/AppLink';

export const FlatButton = styled.button`
  display: inline-block;
  padding: 8px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const FlatLink = styled(AppLink)`
  display: inline-block;
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
