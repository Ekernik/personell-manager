import { redirect } from 'next/navigation';
import { generateUrl } from '../utils/urlGenerator';
import { ViewFilterOptions, ZoomFilterOptions } from '@/types/context';

interface SearchParams extends URLSearchParams {
  zoom: ZoomFilterOptions;
  date: string;
  filter: ViewFilterOptions;
}

interface Props {
  searchParams: SearchParams;
}

export default function IndexPage({ searchParams }: Props) {
  redirect(generateUrl('/dashboard/month', searchParams));
}
