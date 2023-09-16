import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { OS_on, A1_on, A2_on } from './svg';
import Image from 'next/image';

export default function NotationAlert() {
  return (
    <Alert>
      <QuestionMarkCircledIcon className='h-4 w-4' />
      <AlertTitle>Conventions:</AlertTitle>
      <AlertDescription className='flex flex-col gap-4 mt-4'>
        <div className='flex gap-8'>
          <span className='flex items-center gap-1'>
            <Image
              src={OS_on}
              alt={'Operating surgeon'}
            />
            — Operating surgeon
          </span>
          <span className='flex items-center gap-1'>
            <Image
              src={A1_on}
              alt={'1st surgical assistant'}
            />
            — 1st surgical assistant
          </span>
          <span className='flex items-center gap-1'>
            <Image
              src={A2_on}
              alt={'2nd surgical assistant'}
            />
            — 2nd surgical assistant
          </span>
        </div>
        <div className='flex gap-8 items-center'>
          <span>
            <strong>V</strong> — Vacation
          </span>
          <span>
            <strong>B</strong> — Business Trip
          </span>
          <span>
            <strong>D</strong> — Duty
          </span>
          <span>
            <strong>O (OPA)</strong> — Outpatient appointment
          </span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
