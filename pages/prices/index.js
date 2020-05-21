import PriceList from '@views/PriceList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Prices = props => (
	<Layout>
		<Head>
			<title>Price Manager </title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<PriceList />
	</Layout>
);
export default Prices;
