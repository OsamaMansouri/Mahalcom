import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { UserProvider } from 'contexts/user/UserContext';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: (
        <UserProvider>
          <AuthLogin />
        </UserProvider>
      )
    },
    {
      path: '/register',
      element: (
        <UserProvider>
          <AuthRegister />
        </UserProvider>
      )
    }
  ]
};

export default LoginRoutes;
