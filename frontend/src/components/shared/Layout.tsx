import React from 'react';
import Header from './Header';
import Loading from './Loading';

interface LayoutProps {
  children: React.ReactNode;
  loading: boolean;
}

export function Layout({ children, loading }: LayoutProps) {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header type="home" />

      <div
        className="h-[93vh] overflow-y-auto
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        {children}
      </div>

      {loading && <Loading />}
    </div>
  );
}

export default Layout;
