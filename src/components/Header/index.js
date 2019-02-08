import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import * as SearchActions from '../../actions/SearchActions';

import './header.scss';

const Header = props => {
  const search = e => {
    e.preventDefault();
    const { search } = e.target.elements;
    props.termoBusca(search.value);
    props.buscaItems(search.value);
    props.history.push(`/items?search=${search.value}`);
  }
  return (
    <header className="nav-header">
      <div className="container">
        <div className="row no-gutters">
          <div className="col-1 offset-1">
            <h1><a href="/"><img src="/img/Logo_ML.png" alt=""/></a></h1>
          </div>
          <div className="col-9 align-self-start">
            <form onSubmit={search} className="w-100 border border-white rounded my-2">
              <input type="text" name="search" placeholder="Nunca dejes de buscar" defaultValue={props.search.text} className="w-100 h-100 border-0 p-2 rounded-right" />
              <button type="submit" role="img" className="text-hide rounded-right">Buscar</button>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  termoBusca: PropTypes.func.isRequired,
  buscaItems: PropTypes.func.isRequired,
  history: PropTypes.object,
  search: PropTypes.object
};

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
