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
        <select className="ThemeSelector" onChange={this.handleChange}>
          {this.themeManager.getThemes().map(theme => (
            <option
              key={theme.name}
              value={theme.name}
              selected={this.themeManager.isCurrentTheme(theme)}
            >
              {theme.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
