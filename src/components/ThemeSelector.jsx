import React from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle';

const propTypes = {
  themeManager: PropTypes.shape({
    setCurrentTheme() {},
    getCurrentTheme() {},
    getThemes() {},
  }).isRequired,
};

export default class ThemeSelector extends React.Component {
  constructor({ themeManager }) {
    super();
    this.themeManager = themeManager;
  }

  handleChange = (e) => {
    this.themeManager.setCurrentTheme(e.target.value);
  };

  render() {
    return (
      <div>
        <Subtitle>Theme</Subtitle>
        <select
          className="ThemeSelector"
          defaultValue={this.themeManager.getCurrentTheme().name}
          onChange={this.handleChange}
        >
          {this.themeManager.getThemes().map(theme => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

ThemeSelector.propTypes = propTypes;
