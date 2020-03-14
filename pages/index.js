import Dashboard from '@views/Dashboard';
import { Main as Layout } from '@layouts';
import Head from 'next/head';

const Home = () => (
  <Layout>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Dashboard />
  </Layout>
);

export default Home;
