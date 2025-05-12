import React from 'react';
import { Sidebar } from './Sidebar';
export const Layout = ({
  children
}) => {
  return <div className="flex h-screen bg-gray-50 dark:bg-dark-100">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>;
};