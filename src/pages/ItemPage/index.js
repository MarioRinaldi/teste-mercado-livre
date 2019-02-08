import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';

import Header from '../../components/Header';
import Breadcrumb from '../../components/Breadcrumb';
import ErrorMsg from '../../components/ErrorMsg';

import * as SearchActions from '../../actions/SearchActions';

import './itemPage.scss';

class ItemPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    this.props.buscaItem(id);
  }

  render() {
    return (
      <Fragment>
        <Header />
        <main className="container">
          <Breadcrumb />
          {
            this.props.search.item !== {} && this.id && this.props.search.item.id === this.id &&
            <div className="itemPage container p-0">
              <div className="row no-gutters">
                <div className="col-10 offset-1  border border-light rounded py-3 bg-white">
                  <div className="container">
                    <div className="row">
                      <div className="col-8">
                          {
                            <img src={this.props.search.item.picture} className="w-100 h-auto rounded"/>
                          }
                      </div>
                      <div className="col-4">
                          <p className="condition mt-3">
                            {
                              this.props.search.item.condition === 'new' ? 'Nuevo' : 'Usado'
                            } - {
                              `${this.props.search.item.sold_quantity} ${ this.props.search.item.sold_quantity === 1 ? 'vendido' : 'vendidos'}`
                            }
                          </p>
                          <p className="title h3 mb-3 pb-3">
                            {
                              this.props.search.item.title
                            }
                          </p>
                          {
                              this.props.search.item.price &&
                            <p className="price h2 mb-3 pb-3">
                              {
                                this.props.search.item.price.currency
                              } {
                                this.props.search.item.price.amount
                              }
                              <sup>{`${this.props.search.item.price.decimals < 10 ? "0" : ""}${this.props.search.item.price.decimals}`}</sup>
                            </p>
                          }
                          <button type="button" className="btn btn-primary w-75">Comprar</button>
                      </div>
                    </div>

                    <div className="row mt-5 mx-3">
                      <div className="col-12 p-0">
                        <p className="h3 mb-3 pb-3">descripción del producto</p>
                        <p className="text-secondary text-justify">
                          {
                            this.props.search.item.description
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          }
          {
            !Object.keys(this.props.search.item).length && <ErrorMsg />
          }
        </main>
      </Fragment>
    );
  }
}

ItemPage.propTypes = {
  termoBusca: PropTypes.func.isRequired,
  buscaItems: PropTypes.func.isRequired,
  buscaItem: PropTypes.func.isRequired,
  history: PropTypes.object,
  search: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
