import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const HomePage = () => {
  const { products, getProducts } = useContext(GlobalContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div id='home'>
      <div className='row text-center'>
        <div className='col'>
          <h2>Home Page!</h2>
          <h3>You have {products.length} items to sell!</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <ul className='list-group'>
            {products.map((product, i) => {
              return (
                <li className='list-group-item' key={i}>
                  {product.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;