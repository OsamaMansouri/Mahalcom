// pages/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div>
    <h1>Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
    <Link to="/">Go to Home</Link>
  </div>
);

export default Unauthorized;
