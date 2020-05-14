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

    <StoneList preData={props.preData} />
  </Layout>
);


Stones.getInitialProps = async ({ req }) => {
	
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const res = await fetch(baseUrl + '/api/stones');
	const data = await res.json();
	
	const res3 = await fetch(baseUrl + '/api/color_list');
	const color_list = await res3.json();
	
	const res2 = await fetch(baseUrl + '/api/faux_list');
	const faux_list = await res2.json();
	
	return {
		preData: {faux_list : faux_list, color_list : color_list, stones : data }
	};
};

export default Stones;
