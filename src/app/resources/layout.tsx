import type { Metadata } from 'next'

import { Prisma } from '@prisma/client';
import Side from './components/Side';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function Layout({ children }: LayoutProps) {
  const models = Prisma.dmmf.datamodel.models;

  return (
    <div className='flex min-h-screen'>
      <Side
        models={models}
      />

      <main className='flex-1 overflow-hidden bg-slate-100'>
        {children}
      </main>
    </div>
  )
}
