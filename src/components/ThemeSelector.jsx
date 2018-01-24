import React from 'react';
import Subtitle from './Subtitle';
import ThemeManager from '../core/ThemeManager';

export default class ThemeSelector extends React.Component {
  constructor() {
    super();
    this.themeManager = new ThemeManager();
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
