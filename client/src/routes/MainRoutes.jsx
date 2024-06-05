import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import AuthGuard from 'utils/withAuth'; // Import the AuthGuard component
import { LivreurProvider } from 'contexts/livreur/LivreurContext';
import { StockProvider } from 'contexts/stock/StockContext';
import { ProductProvider } from 'contexts/product/ProductContext';
import { SupplierProvider } from 'contexts/supplier/SupplierContext';
import { UserProvider } from 'contexts/user/UserContext';
import { OrderProvider } from 'contexts/order/OrderContext';
import { ClientProvider } from 'contexts/client/ClientContext';
import { CategoryProvider } from 'contexts/category/CategoryContext';
import { LivraisonProvider } from 'contexts/delivery/deliveryContext';

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
const AddLivraison = Loadable(lazy(()=>import ('pages/deliveries/add')))
const Livraisons = Loadable(lazy(()=>import ('pages/deliveries/List')))


const UserProfile = Loadable(lazy(() => import('pages/profile/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/profile/TabPersonal')));
const UserTabPassword = Loadable(lazy(() => import('sections/profile/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/profile/TabSettings')));

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
          <UserProvider>
            <Users />
          </UserProvider>
      )
    },
    {
      path: 'add-user',
      element: (
<UserProvider>
            <AddUser />
          </UserProvider>
      )
    },
    {
      path: 'clients',
      element: (
<ClientProvider>
            <Clients />
          </ClientProvider>
      )
    },
    {
      path: 'add-client',
      element:(
 <ClientProvider>
            <AddClient />
          </ClientProvider>
      ) 
    },
    {
      path: 'add-supplier',
      element: (
          <SupplierProvider>
            <AddSupplier />
          </SupplierProvider>
      )
    },
    {
      path: 'suppliers',
      element: (
          <SupplierProvider>
            <Suppliers />
          </SupplierProvider>
      )
    },
    {
      path: 'categories',
      element: (
<CategoryProvider>
            <Categories />
          </CategoryProvider>
      )
    },
    {
      path: 'add-category',
      element: (
<CategoryProvider>
        <AddCategory />
      </CategoryProvider>
      )
    },
    {
      path: 'products',
      element: (
          <ProductProvider>
            <Products />
          </ProductProvider>
      )
    },
    {
      path: 'add-product',
      element: (
          <ProductProvider>
            <AddProduct />
          </ProductProvider>
      )
    },
    {
      path: 'stocks',
      element: (
          <StockProvider>
            <Stocks />
          </StockProvider>
      )
    },
    {
      path: 'add-stock',
      element: (
          <StockProvider>
            <AddStock />
          </StockProvider>
      )
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
      path: 'orders',
      element: (
          <ClientProvider>
            <OrderProvider>
              <Orders />
            </OrderProvider>
          </ClientProvider>
      )
    },
    {
      path: 'add-order',
      element: (
          <ProductProvider>
            <ClientProvider>
              <OrderProvider>
                <AddOrder />
              </OrderProvider>
            </ClientProvider>
          </ProductProvider>
      )
    },
    {
      path: 'livraisons',
      element: (

          <LivraisonProvider>
            <Livraisons />
          </LivraisonProvider>
      )
    },
    {
      path: 'add-livraison',
      element: (
          <LivreurProvider>
          <OrderProvider>
            <LivraisonProvider>
            <AddLivraison />
          </LivraisonProvider>
            </OrderProvider>
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

export default MainRoutes;