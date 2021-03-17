import localeQueryParamsMiddleware from '../localeQueryParamsMiddleware';

describe('localeQueryParamsMiddleware', () => {
  it('does nothing on unknown actions', () => {
    const middleware = localeQueryParamsMiddleware()();
    const nextFn = jest.fn();
    const action = { type: 'UNKNOWN' };

    middleware(nextFn)(action);

    expect(nextFn).toBeCalledWith(action);
    expect(action).toEqual({
      type: 'UNKNOWN',
    });
  });

  it('does nothing when there s no i18n.localized key in the action', () => {
    const middleware = localeQueryParamsMiddleware()();
    const nextFn = jest.fn();
    const action = {
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
      contentType: { pluginOptions: {} },

      initialParams: {},
    };

    middleware(nextFn)(action);

    expect(nextFn).toBeCalledWith(action);
    expect(action).toEqual({
      contentType: { pluginOptions: {} },
      initialParams: {},
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
    });
  });

  it('creates a plugins key with a locale when initialParams does not have a plugins key and the field is localized', () => {
    const middleware = localeQueryParamsMiddleware()();
    const nextFn = jest.fn();
    const action = {
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
      contentType: {
        pluginOptions: {
          i18n: { localized: true },
        },
      },
      initialParams: {},
    };

    middleware(nextFn)(action);

    expect(nextFn).toBeCalledWith(action);
    expect(action).toEqual({
      contentType: { pluginOptions: { i18n: { localized: true } } },
      initialParams: { plugins: { i18n: { locale: 'en' } } },
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
    });
  });

  it('adds a key to plugins with a locale when initialParams has a plugins key and the field is localized', () => {
    const middleware = localeQueryParamsMiddleware()();
    const nextFn = jest.fn();
    const action = {
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
      contentType: {
        pluginOptions: {
          i18n: { localized: true },
        },
      },
      initialParams: {
        plugins: {
          hello: 'world',
        },
      },
    };

    middleware(nextFn)(action);

    expect(nextFn).toBeCalledWith(action);
    expect(action).toEqual({
      contentType: { pluginOptions: { i18n: { localized: true } } },
      initialParams: { plugins: { i18n: { locale: 'en' }, hello: 'world' } },
      type: 'ContentManager/ListView/SET_LIST_LAYOUT ',
    });
  });
});