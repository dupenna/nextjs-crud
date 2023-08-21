import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { Pagination } from './components/Pagination';
import { List } from './components/List';

interface ResourceProps {
  params: {
    resource: string;
  },
  searchParams: SearchParamsProps
}

export interface SearchParamsProps {
  page?: string;
  sort_field?: string;
  sort_type?: string;
  filters?: [{field: string, value: string}];
}

export default async function Resource({ params, searchParams }: ResourceProps) {
  const { resource } = params;
  const { page = 1, sort_field, sort_type, filters } = searchParams;
  
  const model = Prisma.dmmf.datamodel.models.find(model => model.name == resource);

  if (!model) {
    return(<h1>Resource not found</h1>)
  }

  const limit = 10;
  const offset = limit * (Number(page) - 1);

  let order = [];
  if (sort_field) {
    order.push({
      [sort_field]: sort_type
    })
  }

  let where: any = {};
  if (filters) {
    filters.forEach(filter => {
      where[filter.field] = filter.value;
    })
  }
  console.log({where})
  
  //@ts-ignore
  const items = await prisma[resource].findMany({
    skip: offset,
    take: limit,
    orderBy: order,
  });

  return (
    <div className='box-border p-6 h-full w-full overflow-hidden flex flex-col gap-4'>
      <h1 className='text-2xl'>{resource}</h1>

      <div className='overflow-x-scroll flex-1'>
        <List
          resource={resource}
          items={items}
          fields={model.fields}
          searchParams={searchParams}
        />
      </div>

      <Pagination 
        resource={resource} 
        searchParams={searchParams}
      />
    </div>
  )
}