import React from 'react';
import Content from './Content';
import Layout from "./Layout";

function Home(): JSX.Element {
  return (
    <Layout pageName="Feedbacks">
      <Content/>
    </Layout>
  );
}

export default Home;