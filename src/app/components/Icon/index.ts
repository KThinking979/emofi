import { lazyLoad } from 'utils/loadable';

const ActiveIcon = lazyLoad(
  () => import('./ActiveIcon'),
  module => module.ActiveIcon,
);

export { ActiveIcon };
