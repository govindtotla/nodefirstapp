import SignIn from '@views/SignIn';
import { Minimal as Layout } from '@layouts';
import Head from 'next/head';

const Login = () => (
  <Layout>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SignIn />
  </Layout>
);

export default Login;
