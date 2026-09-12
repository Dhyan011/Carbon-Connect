import { createBrowserRouter } from 'react-router';
import Root from './pages/Root';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Marketplace from './pages/Marketplace';
import Logistics from './pages/Logistics';
import Analytics from './pages/Analytics';
import PSAMInsights from './pages/PSAMInsights';
import PSAMSimulator from './pages/PSAMSimulator';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'login', Component: Login },
      { path: 'seller', Component: SellerDashboard },
      { path: 'buyer', Component: BuyerDashboard },
      { path: 'marketplace', Component: Marketplace },
      { path: 'logistics', Component: Logistics },
      { path: 'analytics', Component: Analytics },
      { path: 'psam', Component: PSAMInsights },
      { path: 'psam/simulator', Component: PSAMSimulator },
      { path: '*', Component: NotFound },
    ],
  },
]);
