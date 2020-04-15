import ColorList from '@views/ColorList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Colors = props => (
  <Layout>
    <Head>
      <title>Colors </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ColorList colors={props.colors} />
  </Layout>
);


Colors.getInitialProps = async function() {
  const res = await fetch('/api/colors');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    colors: data.map(entry => entry)
  };
};


export default Colors;
