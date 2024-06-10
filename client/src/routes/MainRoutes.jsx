import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import AuthGuard from 'utils/withAuth';
import { LivreurProvider } from 'contexts/livreur/LivreurContext';
import { StockProvider } from 'contexts/stock/StockContext';
import { ProductProvider } from 'contexts/product/ProductContext';
import { SupplierProvider } from 'contexts/supplier/SupplierContext';
import { UserProvider } from 'contexts/user/UserContext';
import { OrderProvider } from 'contexts/order/OrderContext';
import { ClientProvider } from 'contexts/client/ClientContext';
import { CategoryProvider } from 'contexts/category/CategoryContext';
import { LivraisonProvider } from 'contexts/livraison/LivraisonContext';

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
const Livreurs = Loadable(lazy(() => import('pages/livreurs/list')));
const AddLivreur = Loadable(lazy(() => import('pages/livreurs/add')));
const AddOrder = Loadable(lazy(() => import('pages/orders/add')));
const Orders = Loadable(lazy(() => import('pages/orders/list')));
const AddLivraison = Loadable(lazy(() => import('pages/livraisons/add')));
const Livraisons = Loadable(lazy(() => import('pages/livraisons/list')));

const LivraisonsManagement = Loadable(lazy(() => import('pages/livraisons/listmanagment')));

const UserProfile = Loadable(lazy(() => import('pages/profile/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/profile/TabPersonal')));
const UserTabPassword = Loadable(lazy(() => import('sections/profile/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/profile/TabSettings')));

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Unauthorized = Loadable(lazy(() => import('pages/Unauthorized'))); // Import the Unauthorized component
const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  ),
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
      path: 'profiles',
      children: [
        {
          path: 'user',
          element: <UserProfile />,
          children: [
            {
              path: 'personal',
              element: (
                <UserProvider>
                  <UserTabPersonal />
                </UserProvider>
              )
            },
            {
              path: 'password',
              element: (
                <UserProvider>
                  <UserTabPassword />
                </UserProvider>
              )
            },
            {
              path: 'settings',
              element: <UserTabSettings />
            }
          ]
        }
      ]
    },
    {
      path: 'users',
      element: (
        <AuthGuard allowedRoles={['Admin']}>
          <UserProvider>
            <Users />
          </UserProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-user',
      element: (
        <AuthGuard allowedRoles={['Admin']}>
          <UserProvider>
            <AddUser />
          </UserProvider>
        </AuthGuard>
      )
    },
    {
      path: 'clients',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ClientProvider>
            <Clients />
          </ClientProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-client',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ClientProvider>
            <AddClient />
          </ClientProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-supplier',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <SupplierProvider>
            <AddSupplier />
          </SupplierProvider>
        </AuthGuard>
      )
    },
    {
      path: 'suppliers',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <SupplierProvider>
            <Suppliers />
          </SupplierProvider>
        </AuthGuard>
      )
    },
    {
      path: 'categories',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <CategoryProvider>
            <Categories />
          </CategoryProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-category',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <CategoryProvider>
            <AddCategory />
          </CategoryProvider>
        </AuthGuard>
      )
    },
    {
      path: 'products',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ProductProvider>
            <Products />
          </ProductProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-product',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ProductProvider>
            <AddProduct />
          </ProductProvider>
        </AuthGuard>
      )
    },
    {
      path: 'stocks',
      element: (
        <AuthGuard allowedRoles={['Admin']}>
          <StockProvider>
            <Stocks />
          </StockProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-stock',
      element: (
        <AuthGuard allowedRoles={['Admin']}>
          <StockProvider>
            <AddStock />
          </StockProvider>
        </AuthGuard>
      )
    },
    {
      path: 'livreurs',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <LivreurProvider>
            <Livreurs />
          </LivreurProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-livreur',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <LivreurProvider>
            <AddLivreur />
          </LivreurProvider>
        </AuthGuard>
      )
    },
    {
      path: 'orders',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ClientProvider>
            <OrderProvider>
              <Orders />
            </OrderProvider>
          </ClientProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-order',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <ProductProvider>
            <ClientProvider>
              <OrderProvider>
                <AddOrder />
              </OrderProvider>
            </ClientProvider>
          </ProductProvider>
        </AuthGuard>
      )
    },
    {
      path: 'deliveries',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager', 'Livreur']}>
          <LivreurProvider>
            <LivraisonProvider>
              <Livraisons />
            </LivraisonProvider>
          </LivreurProvider>
        </AuthGuard>
      )
    },
    {
      path: 'add-delivery',
      element: (
        <AuthGuard allowedRoles={['Admin', 'Manager']}>
          <LivreurProvider>
            <OrderProvider>
              <LivraisonProvider>
                <AddLivraison />
              </LivraisonProvider>
            </OrderProvider>
          </LivreurProvider>
        </AuthGuard>
      )
    },
    {
      path: 'deliveries_m',
      element: (
        <AuthGuard allowedRoles={['Livreur']}>
          <LivreurProvider>
            <LivraisonProvider>
              <LivraisonsManagement />
            </LivraisonProvider>
          </LivreurProvider>
        </AuthGuard>
      )
    },
    {
      path: 'unauthorized',
      element: <Unauthorized />
    }
  ]
};

export default MainRoutes;
