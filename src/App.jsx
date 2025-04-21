import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Layout from './Layout/Layout';
import DatCho from './pages/DatCho';
import PaymentInfo from './pages/PaymentInfo';
import TrainBookingPayment from './pages/TrainBookingPayment';

import {Provider} from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="tra-cuu-ve" element={<Search/>} />
            <Route path="dat-cho" element={<DatCho/>} />
            <Route path="payment-inf" element={<PaymentInfo/>} />
            <Route path="payment" element={<TrainBookingPayment/>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
