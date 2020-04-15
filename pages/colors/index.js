import ColorList from '@views/ColorList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Colors = props => (
  <Layout>
    <Head>
      <title>Colors </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ColorList colors={props.colors} />
  </Layout>
);


Colors.getInitialProps = async ({ req }) => {
	
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const res = await fetch(baseUrl + '/api/colors');
	const data = await res.json();
	
	console.log(`Show data fetched. Count: ${data.length}`);
	return {
		colors: data
	};
};
export default Colors;
