import React, { Fragment } from 'react';
import Header from '../../components/Header';
import ErrorMsg from '../../components/ErrorMsg';

const Page404 = () => (
  <Fragment>
    <Header />
    <main className="container mt-3">
      <ErrorMsg />
    </main>
  </Fragment>
);

export default Page404;
