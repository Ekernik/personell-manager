import { SearchParams } from '@/types/searchParams';

export const generateUrl = (path: string, searchParams?: SearchParams) => {
  const today = new Date();

  let chosenDate = searchParams?.date || today.toISOString().split('T')[0];
  const filter = searchParams?.filter || 'all';

  const [thisYear, thisMonth, thisDay] = today
    .toISOString()
    .split('T')[0]
    .split('-');

  const [chosenYear, chosenMonth] = chosenDate.split('.')[0].split('-')!;

  let resultDate = chosenDate;

  if (path.includes('day')) {
    resultDate = `${thisYear}-${thisMonth}-${thisDay}`;
  }

  if (path.includes('week')) {
    if (thisYear === chosenYear && thisMonth === chosenMonth) {
      const [year, month, day] = chosenDate.split('-');
      const dayOffset = new Date(chosenDate).getDay() - 1;
      resultDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day) - dayOffset,
        0,
        0 - new Date(chosenDate).getTimezoneOffset()
      )
        .toISOString()
        .split('T')[0];
    } else {
      resultDate = chosenDate!;
    }
  }

  if (path.includes('month')) {
    if (thisYear === chosenYear && thisMonth === chosenMonth) {
      resultDate = `${thisYear}-${thisMonth}-01`;
    } else {
      resultDate = `${chosenYear}-${chosenMonth}-01`;
    }
  }

  const current = new URLSearchParams({ date: resultDate, filter });
  const search = current.toString();

  const query = search ? `?${search}` : '';
  const url = `${path}${query}`;

  return url;
};
