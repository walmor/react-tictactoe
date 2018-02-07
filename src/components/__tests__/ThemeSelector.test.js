import React from 'react';
import { shallow } from 'enzyme';
import ThemeSelector from '../ThemeSelector';

describe('<ThemeSelector/>', () => {
  const themes = [{ name: 'theme1' }, { name: 'theme2' }, { name: 'theme3' }];
  const currentTheme = { name: 'theme2' };
  const setCurrentTheme = jest.fn();

  function getThemeSelector() {
    const manager = {
      getThemes() {
        return themes;
      },
      getCurrentTheme() {
        return currentTheme;
      },
      setCurrentTheme,
    };

    return shallow(<ThemeSelector themeManager={manager} />);
  }

  it('should create a select with all available themes', () => {
    const themeSelector = getThemeSelector();

    const options = themeSelector.find('option');

    expect(options).toHaveLength(themes.length);

    options.forEach((option, i) => {
      expect(option.props().value).toBe(themes[i].name);
      expect(option.text()).toBe(themes[i].name);
    });
  });

  it('should select the current theme', () => {
    const themeSelector = getThemeSelector();
    expect(themeSelector.find('select').props().defaultValue).toBe(currentTheme.name);
  });

  it('should change the current theme', () => {
    const themeSelector = getThemeSelector();
    const selectedTheme = 'theme3';

    themeSelector.find('select').simulate('change', { target: { value: selectedTheme } });

    expect(setCurrentTheme).toBeCalledWith(selectedTheme);
  });
});
