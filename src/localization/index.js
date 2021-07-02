import store from '../redux/store';

const languages = {
  en: require('./en.json'), // eslint-disable-line global-require
  fr: require('./fr.json')  // eslint-disable-line global-require
};

export default class I18n {
  static translate(key) {
    return languages[store.getState().global.language || 'en'][key];
  }
}
