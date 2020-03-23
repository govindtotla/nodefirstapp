import UserList from '@views/UserList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';

const Users = () => (
  <Layout>
    <Head>
      <title>Users </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <UserList />
  </Layout>
);

export default Users;
