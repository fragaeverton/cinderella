import HomePage from './pages/home';
import SearchPage from './pages/search';
import User from './pages/user';
import ProductDetailsPage from './pages/detail';
import ProductDetailsNotFound from './pages/productDetailsNotFound';
import Root from './components/root';
import Cookies from 'universal-cookie';
import Cart from './pages/cart';

// Add react-router-dom imports
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const cookies = new Cookies(null, { path: '/' });

// create router with JSX Route elements
const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root/>}>
    <Route index element={<HomePage/>} />
    <Route path=":type" element={<HomePage/>} />
    <Route path=":type/:id" element={<ProductDetailsPage/>} />
    <Route path="search" element={<SearchPage/>} />
    <Route path="auth" element={<User/>} />
    <Route path="cart" element={<Cart/>} />
    <Route path="product-details-not-fount" element={<ProductDetailsNotFound/>} />

  </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
