import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string,
  isWinnerSquare: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};

export default function Square({ value, isWinnerSquare, onClick }) {
  const className = `square${isWinnerSquare ? ' winner' : ''}`;

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = propTypes;
Square.defaultProps = defaultProps;
