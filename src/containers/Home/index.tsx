import { Slider } from '../../components/common/Slider';
import { Order } from '../../components/common/Order';
import { Category } from '../../components/common/Category';
import Product from '../../components/common/Product';
import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Slider />
      <Order />
      <Category />
      <Product />
      <Footer />
    </>
  );
}
