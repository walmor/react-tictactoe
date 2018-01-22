import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  cssClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  cssClass: '',
  onClick: null,
  children: '',
};

export default function Button({ cssClass, onClick, children }) {
  return (
    <button className={`Button ${cssClass}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
