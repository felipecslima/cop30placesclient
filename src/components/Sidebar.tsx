// src/app/page.tsx
'use client';

import { SidebarUi } from '@/components/ui/sidebar';

export function Sidebar() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarUi/>
    </div>
  );
}
