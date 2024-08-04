import { lazyLoad } from 'utils/loadable';

const PageLayout = lazyLoad(
  () => import('./PageLayout'),
  module => module.PageLayout,
);

export { PageLayout };
