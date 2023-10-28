import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <h1 className='text-4xl font-bold flex justify-center items-center h-screen'>NearPick Homepage</h1>;
}
