'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import ScrollToTopButton from './ScrollToTopButton/ScrollToTopButton';
import ChatButton from './ChatButton/ChatButton';
import LoadingWrapper from './LoadingWrapper';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isClientRoute = pathname.startsWith('/client');

  return (
    <LoadingWrapper>
      {!isClientRoute && <Navbar />}
      <ScrollToTopButton />
      <ChatButton /> 
      {children}
      {!isClientRoute && <Footer />}
    </LoadingWrapper>
  );
}
