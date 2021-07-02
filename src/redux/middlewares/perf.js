import Perf from 'react-addons-perf';

/* eslint-disable */
export default () => next => action => {
  const key = `Performance: ${action.type}`;

  Perf.start();
  const result = next(action);
  Perf.stop();

  console.group(key);
  Perf.printWasted();
  console.groupEnd(key);

  return result;
};
