import React from 'react';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 px-4 py-6 max-w-5xl w-full mx-auto'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
