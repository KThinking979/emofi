import { lazyLoad } from 'utils/loadable';

const DashboardIcon = lazyLoad(
  () => import('./DashboardIcon'),
  module => module.DashboardIcon,
);

const WalletIcon = lazyLoad(
  () => import('./WalletIcon'),
  module => module.WalletIcon,
);

const MessageIcon = lazyLoad(
  () => import('./MessageIcon'),
  module => module.MessageIcon,
);

const AccountIcon = lazyLoad(
  () => import('./AccountIcon'),
  module => module.AccountIcon,
);

const ActiveIcon = lazyLoad(
  () => import('./ActiveIcon'),
  module => module.ActiveIcon,
);
const TrashIcon = lazyLoad(
  () => import('./TrashIcon'),
  module => module.TrashIcon,
);
const ArrowLeft = lazyLoad(
  () => import('./ArrowLeft'),
  module => module.ArrowLeft,
);

const ArrowRight = lazyLoad(
  () => import('./ArrowRight'),
  module => module.ArrowRight,
);

const ArrowDown = lazyLoad(
  () => import('./ArrowDown'),
  module => module.ArrowDown,
);

const AddCircle = lazyLoad(
  () => import('./AddCircle'),
  module => module.AddCircle,
);

const Dot = lazyLoad(
  () => import('./Dot'),
  module => module.Dot,
);

export {
  DashboardIcon,
  WalletIcon,
  MessageIcon,
  AccountIcon,
  ActiveIcon,
  TrashIcon,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  AddCircle,
  Dot,
};
