import appConfig from '../../config/app.json';

export default [{
  id: 1,
  href: `${appConfig.app.ROOT_PATH}/`,
  icon: 'iconsize icon-home-icon',
  navName: 'Dashboard',
}, {
  id: 2,
  href: `${appConfig.app.ROOT_PATH}/rewards`,
  icon: 'iconsize icon-reward-icon',
  navName: 'Rewards'
}, {
  id: 3,
  href: `${appConfig.app.ROOT_PATH}/overlays`,
  icon: 'iconsize icon-overlay-icon',
  navName: 'Overlays'
}, {
  id: 4,
  href: `${appConfig.app.ROOT_PATH}/competitions`,
  icon: 'iconsize icon-competition-icon',
  navName: 'Competitions'
}, {
  id: 5,
  href: `${appConfig.app.ROOT_PATH}/contests`,
  icon: 'iconsize icon-contest-icon',
  navName: 'Contests'
}, {
  id: 6,
  href: `${appConfig.app.ROOT_PATH}/giveaways`,
  icon: 'iconsize icon-givaaway-icon',
  navName: 'Giveaways'
}, {
  id: 7,
  href: `${appConfig.app.ROOT_PATH}/connections`,
  icon: 'iconsize icon-conection-icon',
  navName: 'Connections'
}, {
  id: 8,
  href: `${appConfig.app.ROOT_PATH}/settings`,
  icon: 'iconsize icon-cog-icon',
  navName: 'Settings'
}];
