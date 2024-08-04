import { lazyLoad } from 'utils/loadable';

const TitleMenu = lazyLoad(
  () => import('./TitleMenu'),
  module => module.TitleMenu,
);

export { TitleMenu };
