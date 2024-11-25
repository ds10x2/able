import { createBrowserRouter } from 'react-router-dom';

import HomePage from '@pages/home/home.page';
import CanvasPage from '@pages/canvas/canvas.page';
import TrainPage from '@pages/train/train.page';
import DeployPage from '@pages/deploy/deploy.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/canvas',
    element: <CanvasPage />,
  },
  {
    path: '/train',
    element: <TrainPage />,
  },
  {
    path: '/deploy',
    element: <DeployPage />,
  },
]);
