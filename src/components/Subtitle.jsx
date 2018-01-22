import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

export default function Subtitle(props) {
  return <h2 className="Subtitle">{props.children}</h2>;
}

Subtitle.propTypes = propTypes;
Subtitle.defaultProps = defaultProps;
