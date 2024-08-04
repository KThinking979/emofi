import { lazyLoad } from 'utils/loadable';

const BasicMenu = lazyLoad(
  () => import('./BasicMenu'),
  module => module.BasicMenu,
);

const Header = lazyLoad(
  () => import('./Header'),
  module => module.Header,
);

export { BasicMenu, Header };
