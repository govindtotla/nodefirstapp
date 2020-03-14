import SignUp from '@views/SignUp';
import { Minimal as Layout } from '@layouts';
import Head from 'next/head';

const Login = () => (
  <Layout>
    <Head>
      <title>Login</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SignUp />
  </Layout>
);

export default Login;
