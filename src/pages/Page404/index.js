import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import Header from '../../components/Header';

const Page404 = () => (
  <Fragment>
    <Header />
    <main className="container p-3">
      <div className="row">
        <div className="col-12  border border-light rounded bg-white ">
          <p className="h1">Parece que esta página não existe</p>
          <Link className="text-dark" to="/">Ir para a página principal</Link>
        </div>
      </div>
    </main>
  </Fragment>
);

export default Page404;
