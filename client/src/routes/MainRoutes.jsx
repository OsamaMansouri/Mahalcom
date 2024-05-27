import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import AuthGuard from 'utils/withAuth'; // Import the AuthGuard component
import { LivreurProvider } from 'contexts/livreur/LivreurContext';

const Users = Loadable(lazy(() => import('pages/users/list')));
const AddUser = Loadable(lazy(() => import('pages/users/add')));
const Clients = Loadable(lazy(() => import('pages/clients/list')));
const Categories = Loadable(lazy(() => import('pages/categories/list')));
const AddCategory = Loadable(lazy(() => import('pages/categories/add')));
const AddClient = Loadable(lazy(() => import('pages/clients/add')));
const Suppliers = Loadable(lazy(() => import('pages/suppliers/list')));
const AddSupplier = Loadable(lazy(() => import('pages/suppliers/add')));
const Products = Loadable(lazy(() => import('pages/products/list')));
const AddProduct = Loadable(lazy(() => import('pages/products/add')));
const Stocks = Loadable(lazy(() => import('pages/stocks/list')));
const AddStock = Loadable(lazy(() => import('pages/stocks/add')));
const EditProfile = Loadable(lazy(() => import('pages/profile/edit')));
const Livreurs = Loadable(lazy(() => import('pages/livreurs/list')));
const AddLivreur = Loadable(lazy(() => import('pages/livreurs/add')));

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
      path: 'profile/edit',
      element: <EditProfile />
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
      path: 'add-supplier',
      element: <AddSupplier />
    },
    {
      path: 'suppliers',
      element: <Suppliers />
    },
    {
      path: 'categories',
      element: <Categories />
    },
    {
      path: 'add-category',
      element: <AddCategory />
    },
    {
      path: 'products',
      element: <Products />
    },
    {
      path: 'add-product',
      element: <AddProduct />
    },
    {
      path: 'stocks',
      element: <Stocks />
    },
    {
      path: 'add-stock',
      element: <AddStock />
    },
    {
      path: 'livreurs',
      element: (
        <LivreurProvider>
          <Livreurs />
        </LivreurProvider>
      )
    },
    {
      path: 'add-livreur',
      element: (
        <LivreurProvider>
          <AddLivreur />
        </LivreurProvider>
      )
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
