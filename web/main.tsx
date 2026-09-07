import {createRoot} from 'react-dom/client';
import {lazy, Suspense} from 'react';
import {routeFromLocation, withBase} from '../app/base-path';
import '../app/globals.css';

const AtlasViewer = lazy(() => import('../app/page'));
const model = routeFromLocation();

document.title = model
  ? `${model === 'female' ? 'Female' : 'Male'} anatomy · Human Atlas`
  : 'Page not found · Human Atlas';

createRoot(document.getElementById('root')!).render(
  model ? (
    <Suspense fallback={<main className="route-loading" role="status">Opening {model} anatomy…</main>}>
      <AtlasViewer model={model} onModelChange={next => window.location.assign(withBase(next))}/>
    </Suspense>
  ) : (
    <main className="route-loading">
      <h1>Page not found</h1>
      <a href={withBase('/')}>Return to Human Atlas</a>
    </main>
  ),
);
