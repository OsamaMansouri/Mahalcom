import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import AuthGuard from 'utils/withAuth'; // Import the AuthGuard component

const Users = Loadable(lazy(() => import('pages/users/list')));
const AddUser = Loadable(lazy(() => import('pages/users/add')));
const Clients = Loadable(lazy(() => import('pages/clients/list')));
const AddClient = Loadable(lazy(() => import('pages/clients/add')));


const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <AuthGuard>{<Dashboard />}</AuthGuard>,
  children: [
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'add-user',
      element: <AddUser />
    },
    {
      path: 'clients',
      element: <Clients />
    },
    {
      path: 'add-client',
      element: <AddClient />
    },
    {
      path: 'color',
      element: <Color />
    },

    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    }
  ]
};

export default MainRoutes;
