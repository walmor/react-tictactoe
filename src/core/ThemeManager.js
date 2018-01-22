export default class ThemeManager {
  constructor() {
    let themes;
    let currentTheme;

    const loadThemes = () => {
      themes = getComputedStyle(document.documentElement)
        .getPropertyValue('--available-themes')
        .trim();

      themes = themes.substring(1, themes.length - 2).replace(/\\/g, '');
      themes = themes.split(';');

      themes = themes.map(th => JSON.parse(th));
    };

    const getDefaultTheme = () => {
      let defaultTheme;
      const savedThemeName = localStorage.getItem('current-theme-name');

      if (savedThemeName !== null) {
        defaultTheme = themes.find(th => th.name === savedThemeName);
      }

      if (defaultTheme === undefined) {
        defaultTheme = themes[0];
      }

      return defaultTheme;
    };

    const setCurrentTheme = (theme) => {
      currentTheme = theme;
      document.documentElement.className = currentTheme.className;
      localStorage.setItem('current-theme-name', theme.name);
    };

    loadThemes();

    setCurrentTheme(getDefaultTheme());

    /**
     * Gets all available themes.
     */
    this.getThemes = () => themes;

    /**
     * Gets the current selected theme.
     */
    this.getCurrentTheme = () => currentTheme;

    /**
     * Determines whether a theme is currently selected.
     * @param theme The theme to be checked.
     */
    this.isCurrentTheme = theme => currentTheme === theme;

    /**
     * Sets the current theme by name. If there is no theme with the given name, nothing happens.
     * @param {string} name The name of theme to be set as the current theme.
     */
    this.setCurrentTheme = (name) => {
      const theme = themes.find(th => th.name === name);

      if (theme !== undefined) {
        setCurrentTheme(theme);
      }
    };
  }
}
