import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routerConfig } from './routeConfig';

export default function AppRouter() {
  return (
    <Suspense fallback={'[Loading...]'}>
      <Routes>
        {Object.values(routerConfig).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  );
}
