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
  const userRole = localStorage.getItem('userRole') || 'Manager'; // Default role is 'manager' if not found

  const menuItems = [
    userRole === 'Admin' && {
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
    userRole === 'Admin' && {
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
    userRole === 'Admin' && {
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
    userRole === 'Admin' && {
      id: 'invoices',
      title: 'Invoices',
      type: 'item',
      url: '/invoices',
      icon: icons.FileDoneOutlined
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
