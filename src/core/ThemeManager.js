export const FALLBACK_THEME = { name: 'Default', className: '' };
export const AVAILABLE_THEMES_PROP = '--available-themes';
export const CURRENT_THEME_NAME_KEY = 'current-theme-name';

function isValidThemeObject(theme) {
  if (!theme) return false;
  if (typeof theme.name === 'undefined') return false;
  if (typeof theme.className === 'undefined') return false;
  if (!theme.name) return false;
  if (!theme.className) return false;

  return true;
}

function loadThemes() {
  let themes = getComputedStyle(document.documentElement)
    .getPropertyValue(AVAILABLE_THEMES_PROP)
    .trim();

  themes = themes.substring(1, themes.length - 2).replace(/\\/g, '');

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

  return themes;
}

function getSavedThemeName() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(CURRENT_THEME_NAME_KEY);
}

function saveThemeName(name) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(CURRENT_THEME_NAME_KEY, name);
}

function getDefaultTheme(themes) {
  let defaultTheme;
  const savedThemeName = getSavedThemeName();

  if (savedThemeName) {
    defaultTheme = themes.find(th => th.name === savedThemeName);
  }

  if (!defaultTheme) {
    [defaultTheme] = themes;
  }

  return defaultTheme;
}

function applyTheme(theme) {
  document.documentElement.className = theme.className;
  saveThemeName(theme.name);
}

export default class ThemeManager {
  constructor() {
    const themes = loadThemes();
    let currentTheme = getDefaultTheme(themes);

    applyTheme(currentTheme);

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
        currentTheme = theme;
        applyTheme(theme);
      }
    };
  }
}
