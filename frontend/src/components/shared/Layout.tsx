import React from 'react';
import Header from './Header';
import Loading from './Loading';

type LayoutType = 'home' | 'login' | 'create';

interface LayoutProps {
  children: React.ReactNode;
  loading: boolean;
  type?: LayoutType;
}

export function Layout({ children, loading, type = 'home' }: LayoutProps) {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header type={type} />

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
