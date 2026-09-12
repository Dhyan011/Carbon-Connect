import { Outlet } from 'react-router';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
