import { RouteObject } from 'react-router-dom';
import Home from '../../components/pages/Home';
import PersonalAcc from '../../components/pages/PersonalAcc';
import WhatDidISell from '../../components/pages/WDIS';
import CreateAProductCard from '../../components/pages/CAPC';
import CourserCreate from '../../components/pages/CC';
import CourseTemplate from '../../components/pages/CT';
import SuccessBuy from '../../components/pages/SB';

export enum AppRoutes {
  Home = 'home',
  PersonalAcc = 'personal',
  WhatDidISell = 'wdis',
  CreateAProductCard = 'capc',
  CourserCreate = 'cc',
  CourseTemplate = 'ct',
  SuccessBuy = 'sb',
}

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.Home]: '/',
  [AppRoutes.PersonalAcc]: '/personal',
  [AppRoutes.WhatDidISell]: '/wdis',
  [AppRoutes.CreateAProductCard]: '/capc',
  [AppRoutes.CourserCreate]: '/cc',
  [AppRoutes.CourseTemplate]: '/ct',
  [AppRoutes.SuccessBuy]: '/sb',
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
    path: routePaths[AppRoutes.CourseTemplate],
    element: <CourseTemplate />,
  },
  [AppRoutes.SuccessBuy]: {
    path: routePaths[AppRoutes.SuccessBuy],
    element: <SuccessBuy />,
  },
};
