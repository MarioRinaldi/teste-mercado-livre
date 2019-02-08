import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import queryString from 'query-string';
import { PropTypes } from 'prop-types';

import Header from '../../components/Header';
import Item from '../../components/Item';
import Breadcrumb from '../../components/Breadcrumb';

import * as SearchActions from '../../actions/SearchActions';

import './itemsList.scss';

class ItemsList extends Component {
  componentDidMount() {
    const { search } = queryString.parse(this.props.location.search);
    this.props.buscaItems(search);
    this.props.termoBusca(search);
  }

  render() {
    console.log('asds', this);
    return (
      <Fragment>
        <Header />
        <main className="container">
          <Breadcrumb />
          <div className="row">
            <div className="col-10 offset-1">
              <div className="itemsList container border border-light rounded bg-white">
                {
                  this.props.search.items && this.props.search.items.map(item => {
                    return <Item item={item} key={item.id} />;
                  })

                }
                {
                  !this.props.search.items.length && this.props.search.breadcrumb && <p className="mt-3">Não há anúncios que coincidam com a sua busca.</p>
                }
              </div>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

ItemsList.propTypes = {
  termoBusca: PropTypes.func.isRequired,
  buscaItems: PropTypes.func.isRequired,
  history: PropTypes.object,
  search: PropTypes.object,
  location: PropTypes.shape({
    search: PropTypes.object
  })
};

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
