import { Carousel } from '../../../components/common/Carousel';
import BestSellingSection from '../../../components/pages/Home/BestSellingSection';
import BrandSection from '../../../components/pages/Home/BrandSection';
import OfferProductsSection from '../../../components/pages/Home/OfferProducts';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <BrandSection/>
            <BestSellingSection/>
            <OfferProductsSection/>
        </div>
    );
};

export default Home;