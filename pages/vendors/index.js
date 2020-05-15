import VendorList from '@views/VendorList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Vendors = props => (
  <Layout>
    <Head>
      <title>Vendors Manufacturer </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <VendorList />
  </Layout>
);


// Vendors.getInitialProps = async ({ req }) => { };
export default Vendors;
