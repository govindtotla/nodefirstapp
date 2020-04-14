import StoneList from '@views/StoneList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Stones = props => (
  <Layout>
    <Head>
      <title>Stones </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <StoneList stones={props.stones} />
  </Layout>
);


Stones.getInitialProps = async function() {
  const res = await fetch('http://localhost:8080/api/stones');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    stones: data
  };
};


export default Stones;
