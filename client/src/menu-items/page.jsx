// assets
import {
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  DollarOutlined,
  FileDoneOutlined,
  SkinOutlined,
  TruckOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  DollarOutlined,
  FileDoneOutlined,
  SkinOutlined,
  TruckOutlined,
  ApartmentOutlined,
  CategoryOutlinedIcon,
  Inventory2OutlinedIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'features',
  title: 'Features',
  type: 'group',
  children: [
    /*{
      id: 'login1',
      title: 'Login',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
   
    } */
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.ApartmentOutlined
    },
    {
      id: 'suppliers',
      title: 'Suppliers',
      type: 'item',
      url: '/suppliers',
      icon: icons.SolutionOutlined
    },
    {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/clients',
      icon: icons.UserOutlined
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.CategoryOutlinedIcon
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.DollarOutlined
    },

    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.SkinOutlined
    },

    {
      id: 'stocks',
      title: 'Stocks',
      type: 'item',
      url: '/stocks',
      icon: icons.Inventory2OutlinedIcon
    },

    {
      id: 'deliverymen',
      title: 'Delivery men',
      type: 'item',
      url: '/livreurs',
      icon: icons.TeamOutlined
    },
    {
      id: 'deliveries',
      title: 'Deliveries',
      type: 'item',
      url: '/deliveries',
      icon: icons.TruckOutlined
    },
    {
      id: 'invoices',
      title: 'Invoices',
      type: 'item',
      url: '/invoices',
      icon: icons.FileDoneOutlined
    }
  ]
};

export default pages;
