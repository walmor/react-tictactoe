export default class ThemeManager {
  constructor() {
    let themes;
    let currentTheme;

    const loadThemes = () => {
      themes = getComputedStyle(document.documentElement)
        .getPropertyValue('--available-themes')
        .trim();

      themes = themes.substring(1, themes.length - 2).replace(/\\/g, '');

      if (themes === '') {
        themes = [];
        return;
      }

      themes = themes.split(';');

      themes = themes.map((th) => {
        try {
          return JSON.parse(th);
        } catch (e) {
          return null;
        }
      });

      themes = themes.filter(th => th !== null);
    };

    const getSavedThemeName = () => {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem('current-theme-name');
    };

    const saveThemeName = (name) => {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem('current-theme-name', name);
    };

    const getDefaultTheme = () => {
      let defaultTheme;
      const savedThemeName = getSavedThemeName();

      if (savedThemeName) {
        defaultTheme = themes.find(th => th.name === savedThemeName);
      }

      if (!defaultTheme) {
        [defaultTheme] = themes;
      }

      if (!defaultTheme) {
        defaultTheme = { name: 'Default', className: '' };
      }

      return defaultTheme;
    };

    const setCurrentTheme = (theme) => {
      currentTheme = theme;
      document.documentElement.className = currentTheme.className;
      saveThemeName(theme.name);
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
     * Sets the current theme by name. If there is no theme with the given name, nothing happens.
     * @param {string} name The name of theme to be set as the current theme.
     */
    this.setCurrentTheme = (name) => {
      const theme = themes.find(th => th.name === name);

      if (theme) {
        setCurrentTheme(theme);
      }
    };
  }
}
