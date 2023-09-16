import DayTable from '@/components/TableViews/DayTable';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function DayViewPage({ searchParams }: Props) {
  const date: string =
    (searchParams?.date as string) || new Date().toISOString().split('T')[0];

  return <DayTable date={date} />;
}
