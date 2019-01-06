import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SearchActions from '../../actions/SearchActions';

import './breadcrumb.scss';

const Breadcrumb = props => (
  <div className="breadcrumb row no-gutters p-0 m-0 bg-transparent">
    <div className="col-11 offset-1">
      <p className="my-md-3">
        {
          props.search.breadcrumb
        }
      </p>
    </div>
  </div>
);

const mapStateToProps = state => ({ search: state.search })
const mapDispatchToProps = dispatch => bindActionCreators(SearchActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
