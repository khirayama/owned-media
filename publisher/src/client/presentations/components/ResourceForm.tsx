/* eslint-disable @typescript-eslint/camelcase */
import * as React from 'react';
import styled from 'styled-components';

import { styles } from '../styles/vars';
import { ResourceInfo } from '../components/ResourceInfo';
import { FloatButton } from '../components/Button';
import { Props as RelationLabelProps } from '../components/RelationLabel';
import { ResourceWithAllLocalesShapeWithRelations } from '../../../types';

export interface Props {
  resourceId: string | null;
  resource: ResourceWithAllLocalesShapeWithRelations;
  resources: {
    [key: string]: ResourceWithAllLocalesShapeWithRelations;
  };
  locale: string;
  onMount?: (props: Props) => void;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>, props: Props) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, props: Props) => void;
  onClickRelationLabel?: (event: React.MouseEvent<HTMLButtonElement>, props: RelationLabelProps) => void;
}

const Wrapper = styled.div`
  input,
  select {
    font-weight: bold;
    padding: 4px;
    background: #eee;
  }

  .text-center {
    text-align: center;
  }

  table {
    width: 100%;
    border: ${styles.border};

    th {
      padding: 4px;
      font-weight: bold;
      width: 35%;
      text-align: left;
      border: ${styles.border};
      vertical-align: top;
    }

    td {
      border: ${styles.border};

      img {
        width: auto;
        max-height: 240px;
      }

      p {
        padding: 4px;
      }

      select,
      input {
        width: 100%;
        padding: 4px;
      }
    }
  }
`;

export function ResourceForm(props: Props) {
  React.useEffect(() => {
    if (props.onMount) {
      props.onMount(props);
    }
  }, []);

  const resource = props.resource;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (props.onSubmit) {
      props.onSubmit(event, props);
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (props.onChange) {
      props.onChange(event, props);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <ResourceInfo
          resource={resource}
          resources={props.resources}
          locale={props.locale}
          onChange={onChange}
          onClickRelationLabel={props.onClickRelationLabel}
        />
        <FloatButton>SUBMIT</FloatButton>
      </form>
    </Wrapper>
  );
}
