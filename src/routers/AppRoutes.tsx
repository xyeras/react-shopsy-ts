import { Switch, Route } from 'react-router-dom';
// page components
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProductPage from '../pages/ProductPage';
// Components
import Navbar from '../components/Navbar';

const AppRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/products/:productId' component={ProductPage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    </div>
  );
};

export default AppRoutes;