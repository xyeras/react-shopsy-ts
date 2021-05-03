import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

const ProductPage = () => {
    const { product, getSingleProduct } = useContext(GlobalContext);
    const { productId } = useParams<{ productId: string }>();
    
    useEffect(() => {
        getSingleProduct(+productId);
    }, [productId]);

    return (
        <div id="product">
            <div className="row text-center">
                <div className="col">
                    <h2>{product?.title}</h2>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;