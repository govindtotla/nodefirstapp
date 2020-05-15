import ShapeList from '@views/ShapeList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';

const Shapes = props => (
  <Layout>
    <Head>
      <title>Stone Shapes </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ShapeList />
  </Layout>
);
export default Shapes;
