import { redirect } from 'next/navigation';

export default function Home() {
  // In a real application, we would check if the user is authenticated here
  // and redirect to login if not authenticated
  redirect('/dashboard');
}
