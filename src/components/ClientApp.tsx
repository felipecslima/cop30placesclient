// src/components/ClientApp.tsx
'use client';

import dynamic from 'next/dynamic';
import { Sidebar } from '@/components/Sidebar';
import { PButton } from '@porsche-design-system/components-react/ssr';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export function ClientApp() {
  return (
    <div className="relative h-screen flex flex-col">
      <main className="flex-1 flex overflow-hidden">
        <Sidebar/>
        <div className="flex-1 relative">
          <MapView/>
        </div>
      </main>

      {/* Mobile Footer Navbar */ }
      <nav className="md:hidden h-16 border-t bg-white flex items-center justify-around z-50">
        <PButton compact={ true } variant="secondary" icon="home">Home</PButton>
        <PButton compact={ true } variant="secondary" icon="information">Sobre</PButton>
        <PButton compact={ true } variant="secondary" icon="email">Contato</PButton>
      </nav>
    </div>
  );
}
