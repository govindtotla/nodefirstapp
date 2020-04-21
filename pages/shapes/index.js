import ShapeList from '@views/ShapeList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Shapes = props => (
  <Layout>
    <Head>
      <title>Stone Shapes </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ShapeList shapes={props.shapes} />
  </Layout>
);


Shapes.getInitialProps = async ({ req }) => {
	
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const res = await fetch(baseUrl + '/api/shapes');
	const data = await res.json();
	
	console.log(`Show data fetched. Count: ${data.length}`);
	return {
		shapes: data
	};
};


export default Shapes;
