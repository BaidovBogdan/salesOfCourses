import { RouteObject } from 'react-router-dom';
import Home from '../../components/pages/Home';
import PersonalAcc from '../../components/pages/PersonalAcc';
import WhatDidISell from '../../components/pages/WDIS';
import CreateAProductCard from '../../components/pages/CAPC';
import CourserCreate from '../../components/pages/CC';
import CourseTemplate from '../../components/pages/CT';
import SuccessBuy from '../../components/pages/SB';
import MyShopping from '../../components/pages/MS';
import Login from '../../components/pages/Login';
import Registration from '../../components/pages/Registration';
import Preview from '../../components/pages/Preview';
import DemoBalance from '../../components/pages/demoBalance';

export enum AppRoutes {
  Home = 'home',
  PersonalAcc = 'personal',
  WhatDidISell = 'wdis',
  CreateAProductCard = 'capc',
  CourserCreate = 'cc',
  CourseTemplate = 'ct',
  SuccessBuy = 'sb',
  MyShopping = 'ms',
  Login = 'login',
  Registration = 'registration',
  Preview = 'preview',
  DemoBalance = 'demobalance',
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: '/',
  [AppRoutes.PersonalAcc]: '/personal',
  [AppRoutes.WhatDidISell]: '/wdis',
  [AppRoutes.CreateAProductCard]: '/capc',
  [AppRoutes.CourserCreate]: '/cc',
  [AppRoutes.CourseTemplate]: '/ct',
  [AppRoutes.SuccessBuy]: '/sb',
  [AppRoutes.MyShopping]: '/ms',
  [AppRoutes.Login]: '/login',
  [AppRoutes.Registration]: '/registration',
  [AppRoutes.Preview]: '/preview',
  [AppRoutes.DemoBalance]: '/demobalance',
};

export const routerConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.Home]: {
    path: routePaths[AppRoutes.Home],
    element: <Home />,
  },
  [AppRoutes.PersonalAcc]: {
    path: routePaths[AppRoutes.PersonalAcc],
    element: <PersonalAcc />,
  },
  [AppRoutes.WhatDidISell]: {
    path: routePaths[AppRoutes.WhatDidISell],
    element: <WhatDidISell />,
  },
  [AppRoutes.CreateAProductCard]: {
    path: routePaths[AppRoutes.CreateAProductCard],
    element: <CreateAProductCard />,
  },
  [AppRoutes.CourserCreate]: {
    path: routePaths[AppRoutes.CourserCreate],
    element: <CourserCreate />,
  },
  [AppRoutes.CourseTemplate]: {
    path: `${routePaths[AppRoutes.CourseTemplate]}/:id`,
    element: <CourseTemplate />,
  },
  [AppRoutes.SuccessBuy]: {
    path: `${routePaths[AppRoutes.SuccessBuy]}/:id`,
    element: <SuccessBuy />,
  },
  [AppRoutes.MyShopping]: {
    path: routePaths[AppRoutes.MyShopping],
    element: <MyShopping />,
  },
  [AppRoutes.Login]: {
    path: routePaths[AppRoutes.Login],
    element: <Login />,
  },
  [AppRoutes.Registration]: {
    path: routePaths[AppRoutes.Registration],
    element: <Registration />,
  },
  [AppRoutes.Preview]: {
    path: routePaths[AppRoutes.Preview],
    element: <Preview />,
  },
  [AppRoutes.DemoBalance]: {
    path: routePaths[AppRoutes.DemoBalance],
    element: <DemoBalance />,
  },
};
