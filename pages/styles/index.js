import StyleList from '@views/StyleList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Styles = props => (
  <Layout>
    <Head>
      <title>Styles </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <StyleList />
  </Layout>
);


// Vendors.getInitialProps = async ({ req }) => { };
export default Styles;
