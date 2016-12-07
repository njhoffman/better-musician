import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import css from './Counter.scss';

export const Counter = (props) => (
  <div className={css.counterContainer}>
    <h2>Counter: {props.counter}</h2>
    <RaisedButton className='btn btn-default' onClick={props.increment} label="Increment" />
    {' '}
    <RaisedButton className='btn btn-default' onClick={props.doubleAsync} label="Double (Async)" />
  </div>
);

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
};

export default Counter;
