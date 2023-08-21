import { SearchParamsProps } from "@/app/resources/[resource]/page";

interface BuildLinkParamsProps {
  base: string;
  params: SearchParamsProps
}

export default function buildLinkParams({base, params}: BuildLinkParamsProps) {
  const paramsLink: string[] = [];

  (Object.keys(params) as (keyof typeof params)[]).forEach((key, index) => {
    if (params[key]) {
      paramsLink.push(`${key}=${params[key]}`);
    }
  });

  if (paramsLink.length > 0) {
    return `${base}?${paramsLink.join('&')}`;
  }

  return base;
}