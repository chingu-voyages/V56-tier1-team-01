import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className='min-h-screen bg-blue-50 flex items-center justify-center px-4 sm:px-6'>
      <section className='max-w-xl w-full text-center bg-white rounded-2xl shadow-lg border border-blue-100 p-8 sm:p-10'>
        <h1 className='text-4xl sm:text-5xl font-bold text-blue-700 tracking-tight'>
          Peace of mind,
          <br /> one update at a time.
        </h1>
        <p className='my-10 text-md sm:text-lg text-slate-600'>
          Get real-time updates on your loved one's surgery.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 mt-6 justify-center'>
          <Link to='/patient-status'>
            <Button size='lg' variant='outline' className='w-full sm:w-auto'>
              Enter as Guest
            </Button>
          </Link>
          <Link to='/login'>
            <Button size='lg' className='w-full sm:w-auto'>
              Authorized Login
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
