import * as styled from 'styled-components';

import { styles } from '../styles/vars';

export const Table = styled.default.table`
  width: 100%;
`;

export const TableHead = styled.default.thead`
  color: ${styles.colors.secondaryText};
`;

export const TableBody = styled.default.tbody`
`;

export const TableRow = styled.default.tr`
  border-bottom: ${styles.border};
`;

export const TableHeadCell = styled.default.th`
  & > div {
    padding: 4px 8px;
  }
`;

export const TableCell = styled.default.td`
  & > div {
    padding: 4px 8px;
  }
`;
