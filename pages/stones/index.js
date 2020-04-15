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

/*
Stones.getInitialProps = async function() {
  const res = await fetch('http://localhost:8080/api/stones');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    stones: data
  };
};
*/



Stones.getInitialProps = async ctx => {
  if (ctx.req) {
    const host = ctx.req.headers['x-forwarded-host'];
    const proto = ctx.req.headers['x-forwarded-proto'];
    const port =  ctx.req.headers['x-forwarded-port'];

    const res = await fetch(`${proto}//${host}:${port}/api/stones`);
    const json = await res.json();
    
    return { stones: json };
  } else {
    // otherwise we are in the browser
    const res = await fetch(`/api/posts`);

    const json = await res.json();
    return { stones: json };
  }
}




export default Stones;
