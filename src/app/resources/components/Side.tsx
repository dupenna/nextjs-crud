import { Prisma } from '@prisma/client';
import Link from 'next/link';

interface SideProps {
  models: Prisma.DMMF.Model[];
}

export default function Side({ models }: SideProps) {
  return (
    <aside className='w-60 bg-slate-200 p-6'>
      <ul>
        {models.map(model => {
          return(
            <li key={model.name}>
              <Link href={`/resources/${model.name}`}>{model.name}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
