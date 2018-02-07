export const FALLBACK_THEME = { name: 'Default', className: '' };
export const AVAILABLE_THEMES_PROP = '--available-themes';
export const CURRENT_THEME_NAME_KEY = 'current-theme-name';

export default class ThemeManager {
  constructor() {
    let themes;
    let currentTheme;

    const isValidThemeObject = (theme) => {
      if (!theme) return false;
      if (typeof theme.name === 'undefined') return false;
      if (typeof theme.className === 'undefined') return false;
      if (!theme.name) return false;
      if (!theme.className) return false;

      return true;
    };

    const loadThemes = () => {
      themes = getComputedStyle(document.documentElement)
        .getPropertyValue(AVAILABLE_THEMES_PROP)
        .trim();

      themes = themes.substring(1, themes.length - 2).replace(/\\/g, '');

      if (themes === '') {
        themes = [FALLBACK_THEME];
        return;
      }

      themes = themes.split(';');

      themes = themes.map((th) => {
        try {
          const theme = JSON.parse(th);
          return isValidThemeObject(theme) ? theme : null;
        } catch (e) {
          return null;
        }
      });

      themes = themes.filter(th => th !== null);

      if (themes.length === 0) {
        themes = [FALLBACK_THEME];
      }
    };

    const getSavedThemeName = () => {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem(CURRENT_THEME_NAME_KEY);
    };

    const saveThemeName = (name) => {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(CURRENT_THEME_NAME_KEY, name);
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
