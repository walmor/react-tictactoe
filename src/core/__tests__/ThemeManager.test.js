import ThemeManager, * as constants from '../ThemeManager';

function getThemesString(themes) {
  let themeStr = '';

  themes.forEach((theme) => {
    themeStr += JSON.stringify(theme).replace(/"/g, '\\"');
    themeStr += ';';
  });

  if (themeStr) themeStr = ` "${themeStr}"`;
  return themeStr;
}

function mockGetComputedStyle(themes) {
  const oldGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (element) => {
    const cssStyleDecl = oldGetComputedStyle(element);

    if (element === document.documentElement) {
      cssStyleDecl.getPropertyValue = (propname) => {
        if (propname === constants.AVAILABLE_THEMES_PROP) {
          return getThemesString(themes);
        }
        return null;
      };
    }

    return cssStyleDecl;
  };
}

function mockLocalStorage(savedThemeName, setItemSpy) {
  window.localStorage = {
    getItem: (name) => {
      if (name === constants.CURRENT_THEME_NAME_KEY) {
        return savedThemeName;
      }
      return null;
    },
    setItem: (name, value) => {
      if (setItemSpy) {
        setItemSpy(name, value);
      }
    },
  };
}

function getThemeManager(themes, savedThemeName, setItemSpy) {
  mockGetComputedStyle(themes);
  mockLocalStorage(savedThemeName, setItemSpy);
  return new ThemeManager();
}

function createTheme(name, className) {
  return {
    name,
    className,
  };
}

describe('when loading themes', () => {
  describe('when themes are available', () => {
    const availableThemes = [
      createTheme('Dark', 'u-darkTheme'),
      createTheme('Light', 'u-lightTheme'),
    ];

    it('should load all themes', () => {
      const manager = getThemeManager(availableThemes);
      const themes = manager.getThemes();

      expect(themes).toHaveLength(availableThemes.length);
      availableThemes.forEach((theme) => {
        expect(themes).toContainEqual(theme);
      });
    });
  });

  describe('when themes are not available', () => {
    const availableThemes = [];

    it('should have a list with the fallback theme', () => {
      const manager = getThemeManager(availableThemes);
      const themes = manager.getThemes();

      expect(themes).toHaveLength(1);
      expect(themes[0].name).toBe(constants.FALLBACK_THEME.name);
    });
  });

  describe('when there are broken themes', () => {
    const brokenThemesTests = [
      { reason: 'is falsy', theme: '' },
      { reason: 'has invalid JSON syntax', theme: '{ name = "name" }' },
      { reason: 'is a primitive type', theme: 'string value' },
      { reason: 'is missing the name', theme: { className: 'u-brokenTheme' } },
      { reason: 'is missing the className', theme: { name: 'BrokenTheme' } },
      { reason: 'has an empty name', theme: { name: '', className: 'u-brokenTheme' } },
      { reason: 'has an empty className', theme: { name: 'BrokenTheme', className: '' } },
    ];

    brokenThemesTests.forEach((test) => {
      it(`should not include the theme in the list when it ${test.reason}`, () => {
        const manager = getThemeManager([test.theme]);
        const themes = manager.getThemes();

        expect(themes).not.toContainEqual(test.theme);
      });
    });

    describe('when there are no other valid themes', () => {
      it('should have a list with the fallback theme', () => {
        const manager = getThemeManager(brokenThemesTests);
        const themes = manager.getThemes();

        expect(themes).toHaveLength(1);
        expect(themes[0].name).toBe(constants.FALLBACK_THEME.name);
      });
    });

    describe('when there are other valid themes', () => {
      it('should create a list with only valid themes', () => {
        const validThemes = [createTheme('Dark', 'u-darkTheme')];

        const availableThemes = [...brokenThemesTests, ...validThemes];

        const manager = getThemeManager(availableThemes);
        const themes = manager.getThemes();

        expect(themes).toHaveLength(validThemes.length);

        validThemes.forEach((theme) => {
          expect(themes).toContainEqual(theme);
        });
      });
    });
  });
});

describe('when loading the current theme', () => {
  describe('when there is no available theme', () => {
    it('should set the current theme as the fallback theme', () => {
      const manager = getThemeManager([]);
      const currentTheme = manager.getCurrentTheme();

      expect(currentTheme).toBeDefined();
      expect(currentTheme).not.toBeNull();
      expect(currentTheme.name).toBe(constants.FALLBACK_THEME.name);
    });
  });

  describe('when there is available themes', () => {
    describe('and there is a previously saved theme', () => {
      const savedThemeName = 'Light';

      describe('and the saved theme exists on the list', () => {
        it('should set the current theme as the saved one', () => {
          const themes = [createTheme('Dark', 'u-darkTheme'), createTheme('Light', 'u-lightTheme')];
          const manager = getThemeManager(themes, savedThemeName);

          const currentTheme = manager.getCurrentTheme();

          expect(currentTheme.name).toBe(savedThemeName);
        });
      });

      describe('and the saved them does not exist on the list', () => {
        it('should set the current theme as the first available theme', () => {
          const themes = [createTheme('Dark', 'u-darkTheme')];
          const manager = getThemeManager(themes, savedThemeName);

          const currentTheme = manager.getCurrentTheme();

          expect(currentTheme.name).toBe(themes[0].name);
        });
      });
    });

    describe('and there is no previously saved theme', () => {
      const savedThemeName = null;

      it('should set the current theme as the first available theme', () => {
        const themes = [createTheme('Dark', 'u-darkTheme'), createTheme('Light', 'u-lightTheme')];
        const manager = getThemeManager(themes, savedThemeName);

        const currentTheme = manager.getCurrentTheme();

        expect(currentTheme.name).toBe(themes[0].name);
      });
    });

    it('should save the theme name to the localStorage', () => {
      const themes = [createTheme('Dark', 'u-darkTheme'), createTheme('Light', 'u-lightTheme')];
      const localStorageSetItem = jest.fn();

      getThemeManager(themes, null, localStorageSetItem);

      expect(localStorageSetItem).toBeCalledWith(constants.CURRENT_THEME_NAME_KEY, 'Dark');
    });

    it('should set the root elementʼs className property equals to themeʼs className property', () => {
      const className = 'u-darkTheme';
      const themes = [createTheme('Dark', className), createTheme('Light', 'u-lightTheme')];

      getThemeManager(themes);

      expect(document.documentElement.className).toBe(className);
    });
  });
});

describe('when changing the current theme', () => {
  const themes = [createTheme('Dark', 'u-darkTheme'), createTheme('Light', 'u-lightTheme')];

  describe('when the given name is available', () => {
    const newThemeName = themes[1].name;
    const newThemeClass = themes[1].className;

    it('should change the current theme', () => {
      const manager = getThemeManager(themes);

      manager.setCurrentTheme(newThemeName);
      const currentTheme = manager.getCurrentTheme();

      expect(currentTheme.name).toBe(newThemeName);
    });

    it('should save the theme name to the localStorage', () => {
      const localStorageSetItem = jest.fn();

      const manager = getThemeManager(themes, null, localStorageSetItem);
      localStorageSetItem.mockClear();

      manager.setCurrentTheme(newThemeName);

      expect(localStorageSetItem).toBeCalledWith(constants.CURRENT_THEME_NAME_KEY, newThemeName);
    });

    it('should set the root elementʼs className property equals to themeʼs className property', () => {
      const manager = getThemeManager(themes);

      manager.setCurrentTheme(newThemeName);

      expect(document.documentElement.className).toBe(newThemeClass);
    });
  });

  describe('when the given name is not available', () => {
    const currentThemeName = themes[0].name;
    const currentThemeClass = themes[0].className;
    const unavailabeThemeName = 'Blue';

    it('should not change the current theme', () => {
      const manager = getThemeManager(themes);

      manager.setCurrentTheme(unavailabeThemeName);
      const currentTheme = manager.getCurrentTheme();

      expect(currentTheme.name).toBe(currentThemeName);
    });

    it('should not save the theme name to the localStorage', () => {
      const localStorageSetItem = jest.fn();

      const manager = getThemeManager(themes, null, localStorageSetItem);
      localStorageSetItem.mockClear();

      manager.setCurrentTheme(unavailabeThemeName);

      expect(localStorageSetItem).not.toBeCalled();
    });

    it('should not set the root elementʼs className property equals to themeʼs className property', () => {
      const manager = getThemeManager(themes);

      manager.setCurrentTheme(unavailabeThemeName);

      expect(document.documentElement.className).toBe(currentThemeClass);
    });
  });
});
