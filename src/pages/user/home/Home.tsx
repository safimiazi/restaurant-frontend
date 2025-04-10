import { Carousel } from '../../../components/common/Carousel';
import OfferProductsSection from '../../../components/pages/Home/OfferProducts';
import ProductMenu from '../../../components/pages/Home/ProductMenu';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <ProductMenu/>
            <OfferProductsSection/>
        </div>
    );
};

export default Home;