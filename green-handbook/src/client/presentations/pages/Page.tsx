import * as React from 'react';
import ReactHelmet from 'react-helmet';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export const Page: React.SFC<Props> = (props: Props) => {
  React.useEffect(() => {
    console.log('update page', props);
  });

  return (
    <>
      <ReactHelmet>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </ReactHelmet>
      {props.children}
    </>
  );
};
