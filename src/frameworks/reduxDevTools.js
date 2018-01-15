/* eslint import/no-mutable-exports:0, no-console:0, arrow-parens: 0, no-undef: 0 */

let devTools;
if (process.env.NODE_ENV === 'development') {
  devTools = createStore => {
    // If we're in Chrome or Firefox, provide a download link if not installed.
    if (
      navigator.userAgent.indexOf('Chrome') > -1 && (
      navigator.userAgent.indexOf('Edge') === -1 ||
      navigator.userAgent.indexOf('Firefox') > -1)
    ) {
      console.debug('Download the Redux DevTools for a better development experience: ' +
                    'https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en');
    }
    return createStore;
  };
} else {
  devTools = createStore => createStore;
}

export default devTools;
