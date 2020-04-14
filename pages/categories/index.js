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


Category.getInitialProps = async function() {
  const res = await fetch('https://images.gemexi.com/frontend/crons/read_sold');
  const data = await res.json();
  console.log(`Show data fetched. Count: ${data.length}`);
  return {
    categories: data.map(entry => entry)
  };
};


export default Category;
