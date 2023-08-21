import { Prisma } from '@prisma/client';
import Link from 'next/link';

export default async function Home() {

  const models = Prisma.dmmf.datamodel.models;

  return (
    <h1>
      NextJS Crud
    </h1>
  )
}