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
  ApartmentOutlined
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
      id: 'managers',
      title: 'Managers',
      type: 'item',
      url: '/managers',
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
      id: 'deliveries',
      title: 'Deliveries',
      type: 'item',
      url: '/deliveries',
      icon: icons.TruckOutlined
    },
    {
      id: 'deliverymen',
      title: 'Delivery men',
      type: 'item',
      url: '/deliverymen',
      icon: icons.TeamOutlined
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
