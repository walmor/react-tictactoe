import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: '',
};

export default function Title(props) {
  return <h1 className="Title">{props.children}</h1>;
}

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;
