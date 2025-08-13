import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 content-center px-6 py-16 max-w-6xl w-full mx-auto'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
