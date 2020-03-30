import { useRouter } from 'next/router';
import { Main as Layout } from '@layouts';
import Head from 'next/head';

const Colors = (
  <Layout>
    <Head>
      <title>Colors </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
   
    <h1>{props.id}</h1>
    
    <FeesForm showForm={this.state.showForm} closeForm={this.openFeesForm(false)} edit={this.state.editForm} data={this.state.editData} /> 
    
  </Layout>
);

export default Colors;

Colors.getInitialProps = async function(context) {
  //const id = context.req.params.cid;
  
 console.log(context.query);
  
  return { };
}; 
