import * as React from 'react';
import styled from 'styled-components';

import { ResourceWithAllLocalesShapeWithRelations } from '../../../types';

const Wrapper = styled.button<{ selected: boolean; disabled: boolean }>`
  display: inline-block;
  background: ${props => (props.selected ? '#aaccdd' : '#eee')};
  ${props => (props.disabled ? 'color: #fff' : '')};
  padding: 4px 8px;
  border-radius: 2px;
  margin: 4px;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
`;

export interface Props {
  resource: ResourceWithAllLocalesShapeWithRelations;
  locales: string[];
  selected: boolean;
  disabled: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, props: Props) => void;
}

export function RelationLabel(props: Props) {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick && !props.disabled) {
      props.onClick(event, props);
    }
  };

  return (
    <Wrapper selected={props.selected} disabled={props.disabled} onClick={onClick}>
      {props.resource.id}. {props.locales.map((locale: string) => props.resource.name[locale]).join(' / ')}
    </Wrapper>
  );
}
