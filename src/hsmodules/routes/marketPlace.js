import Buy from '../Patientportal/Buy';
import ProductDetails from '../Patientportal/components/Marketplace/productDetails';

export const marketPlaceRoutes = [
  {
    path: '/app/market-place',
    Component: Buy,
  },

  {
    path: '/app/market-place/buy/:productId',
    Component: ProductDetails,
  },
];
