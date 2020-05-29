import CategoryList from '@views/CategoryList';
import { Main as Layout } from '@layouts';
import Head from 'next/head';
import * as fetch from 'isomorphic-fetch'

const Category = props => (
  <Layout>
    <Head>
      <title>Categories </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <CategoryList categories={props.categories} />
  </Layout>
);

Category.getInitialProps = async ({ req }) => {
	
	const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
	const res = await fetch(baseUrl + '/api/categories');
	const data = await res.json();
	return {
		categories: data
	};
};
export default Category;
