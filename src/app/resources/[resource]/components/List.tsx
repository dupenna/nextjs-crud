'use client'

import { Prisma } from "@prisma/client";
import Link from "next/link";
import { SearchParamsProps } from "../page";
import buildLinkParams from "@/utils/buildLinkParams";

import { useRouter } from 'next/navigation'

interface ListProps {
  resource: string;
  fields: Prisma.DMMF.Field[];
  items: any[];
  searchParams: SearchParamsProps;
}

export const List = ({ resource, fields, items, searchParams }: ListProps) => {
  const { sort_field, sort_type, filters } = searchParams;

  const router = useRouter()

  const handleFilterBlur = () => {

    const filterLink: string = buildLinkParams({
      base: `/resources/${resource}`,
      params: { 
        ...searchParams,
        page: String(1),
        filters: [
          {
            field: 'id',
            value: '0013a359'
          }
        ]
      } 
    })

    router.push(filterLink);
  }

  return (
    <table className='w-full overflow-x-scroll mb-4'>
      <thead>
        <tr>
          {fields.map(field => {
            let sortLink: string = buildLinkParams({
              base: `/resources/${resource}`,
              params: { 
                ...searchParams,
                page: String(1),
                sort_field: field.name,
                sort_type: sort_field === field.name ? (sort_type === 'asc' ? 'desc' : 'asc') : 'asc'
              } 
            })

            return (
              <th key={field.name}>
                <Link
                  href={sortLink}
                >
                  {field.name}
                </Link>
              </th>
            )
          })}
        </tr>
        <tr>
          {fields.map(field => {
            return (
              <td key={field.name}>
                <input className="border w-full border-gray-600 rounded-md" type="search" onBlur={handleFilterBlur} />
              </td>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {items.map((item: any, i: number) => {
          const cells: any[] = [];

          {fields.map(field => {
            switch (field.type) {
              case "DateTime":
                cells.push(new Date(item[field.name]).toISOString());
                break;
              case "Boolean":
                cells.push(item[field.name] ? 'Yes' : 'No');
                break;
              default:
                cells.push(item[field.name]);
              }
          })}

          return (
            <tr key={i}>
              {cells.map((cell, j) => 
                <td className='border-b border-gray-300' key={j}>
                  <div className='max-w-[300px] py-3 px-5 box-border overflow-hidden whitespace-nowrap text-ellipsis'>
                    {cell}
                  </div>
                </td>
              )}
            </tr>
          )

        })}
      </tbody>
    </table>
  )
}