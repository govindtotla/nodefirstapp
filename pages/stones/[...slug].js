import StoneAdd from '@views/StoneList/StoneAdd';
import { Main as Layout } from '@layouts';
import useRouter from 'next/router'
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Stones = props => (
  <Layout>
    <Head>
      <title>Edit Stones </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

	<StoneAdd preData={props.preData} />
  </Layout>
);


Stones.getInitialProps = async ({ req, query }) => {
	
	const eid  = query.slug[1];
	
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const res = await fetch(baseUrl + '/api/color_list');
	const colors = await res.json();
	
	
	const res2 = await fetch(baseUrl + '/api/faux');
	const faux = await res2.json();
	
	const res3 		= await fetch('http://3.6.69.208:21004/crons/read_stones');
	const web_stones	= await res3.json();

	const res4 = await fetch(baseUrl + '/api/stones/' + eid);
	const formData = await res4.json();
	
	return {
		preData: {faux : faux, colors : colors, web_stones : web_stones, formData : formData.stone, eid : eid }
	};
};

export default Stones;
