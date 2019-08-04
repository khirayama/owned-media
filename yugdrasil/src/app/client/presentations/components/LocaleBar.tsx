import * as React from 'react';
import styled from 'styled-components';

import { supportLocales } from '../locales';

type Props = {
  value: string;
  onChange: (event: React.FormEvent<HTMLSelectElement>) => void;
};

const StyledSelect = styled.select`
  padding: 4px 8px;
  margin: 0 4px;
`;

export function LocaleBar(props: Props) {
  return (
    <>
      <label>Language</label>
      <StyledSelect value={props.value} onChange={props.onChange}>
        {supportLocales.map(locale => (
          <option key={locale.value} value={locale.value}>
            {locale.display}
          </option>
        ))}
      </StyledSelect>
    </>
  );
}
