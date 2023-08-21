import Link from "next/link";
import { SearchParamsProps } from "../page";
import buildLinkParams from "@/utils/buildLinkParams";

interface PaginationProps {
  resource: string;
  searchParams: SearchParamsProps;
}

export const Pagination = ({ resource,   searchParams }: PaginationProps) => {
  const { page = 1 } = searchParams;

  const previousPage = Number(page) == 1 ? 1 : Number(page) - 1;
  const nextPage = Number(page) + 1;

  const previousLink = buildLinkParams({
    base: `/resources/${resource}`,
    params: { ...searchParams, page: String(previousPage)} 
  })

  const nextLink = buildLinkParams({
    base: `/resources/${resource}`,
    params: { ...searchParams, page: String(nextPage)} 
  })

  return (
    <div>
      <Link href={previousLink}>
        Previous
      </Link>

      <span className="min-w-[60px] px-3 inline-block text-center">
        {page}
      </span>
      
      <Link href={nextLink}>
        Next
      </Link>
    </div>
  )
}