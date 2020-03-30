import ColorList from '@views/ColorList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';

const Colors = () => (
  <Layout>
    <Head>
      <title>Colors </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ColorList />
  </Layout>
);

export default Colors;
