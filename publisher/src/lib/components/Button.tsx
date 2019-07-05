import * as styled from 'styled-components';

import { styles } from '../components/styles';

export const FlatButton = styled.default.button`
  color: ${styles.colors.primary};
  padding: 8px 0;
  font-weight: bold;
  cursor: pointer;
`;

export const FloatButton = styled.default(FlatButton)`
  padding: 8px 12px;
  background: ${styles.colors.primary};
  color: ${styles.colors.white};
  border-radius: ${styles.radius}px;
`;
