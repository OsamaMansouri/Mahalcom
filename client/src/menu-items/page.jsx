import React from 'react';
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

const pages = () => {
  const userRole = localStorage.getItem('userRole'); // Default role is 'manager' if not found

  const menuItems = [
    userRole === 'Admin' && {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: icons.ApartmentOutlined
    },
    userRole === 'Admin' && {
      id: 'suppliers',
      title: 'Suppliers',
      type: 'item',
      url: '/suppliers',
      icon: icons.SolutionOutlined
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'clients',
      title: 'Clients',
      type: 'item',
      url: '/clients',
      icon: icons.UserOutlined
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categories',
      icon: icons.CategoryOutlinedIcon
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.DollarOutlined
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.SkinOutlined
    },
    userRole === 'Admin' && {
      id: 'stocks',
      title: 'Stocks',
      type: 'item',
      url: '/stocks',
      icon: icons.Inventory2OutlinedIcon
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'deliverymen',
      title: 'Delivery men',
      type: 'item',
      url: '/livreurs',
      icon: icons.TeamOutlined
    },
    (userRole === 'Admin' || userRole === 'Manager') && {
      id: 'deliveries',
      title: 'Deliveries',
      type: 'item',
      url: '/deliveries',
      icon: icons.TruckOutlined
    },
    userRole === 'Livreur' && {
      id: 'deliveries',
      title: 'Deliveries',
      type: 'item',
      url: '/deliveries_m',
      icon: icons.TruckOutlined
    }
  ].filter(Boolean);

  return {
    id: 'features',
    title: 'Features',
    type: 'group',
    children: menuItems.map((item) => ({
      ...item,
      key: item.id
    }))
  };
};

export default pages();
