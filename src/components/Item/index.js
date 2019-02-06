import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import * as SearchActions from '../../actions/SearchActions';

import './item.scss';

const Item = props => {
  const goToItem = () => {
    props.buscaItem(props.item.id);
    props.history.push(`/items/${props.item.id}`)
  };
  return (
    <div className="item row no-gutters py-md-3 border-bottom text-decoration-none" onClick={goToItem} >
      <div className="item__image col-md-auto ">
        <img src={props.item.picture} className="rounded" />
      </div>
      <div className="item__description col-md px-md-3">
        <p className="item__description__price d-block mb-3 pb-3">
          {`${props.item.price.currency} ${props.item.price.amount},${props.item.price.decimals < 10 ? "0" : ""}${props.item.price.decimals}`}
          {
            props.item.free_shipping && <span className="item__shipping--free">&nbsp;</span>
          }
        </p>
        <p className="item__description__title">
          {props.item.title}
        </p>
      </div>
      <div className="item__city col-md-2">
        {props.item.city}
      </div>
    </div>
  );
};
Item.propTypes = {
  termoBusca: PropTypes.func.isRequired,
  buscaItem: PropTypes.func.isRequired,
  search: PropTypes.func,
  history: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      currency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      decimals: PropTypes.number.isRequired
    }),
    picture: PropTypes.string.isRequired,
    condition: PropTypes.string.isRequired,
    free_shipping: PropTypes.bool.isRequired,
    sold_quantity: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    description: PropTypes.string
  })
};

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Item));
