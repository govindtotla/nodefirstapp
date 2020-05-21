import BrandList from '@views/BrandList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Brands = props => (
  <Layout>
    <Head>
      <title>Brands  </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <BrandList />
  </Layout>
);


// Vendors.getInitialProps = async ({ req }) => { };
export default Brands;
