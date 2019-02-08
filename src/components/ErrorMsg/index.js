import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMsg = () => (
  <div className="container p-0">
    <div className="row no-gutters">
      <div className="col-10 offset-1  border border-light rounded p-3 bg-white">
        <p className="h1">Parece que esta página não existe</p>
        <Link className="text-dark" to="/">Ir para a página principal</Link>
      </div>
    </div>
  </div>
);

export default ErrorMsg;
