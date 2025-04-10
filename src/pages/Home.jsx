import BenefitsSection from '../components/BenefitsSection';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import ListTicket from '../components/ListTicket';
import banner from '../assets/banner.jpg';

import { FaComments, FaApple, FaGooglePlay } from 'react-icons/fa';
import { SiViber } from 'react-icons/si';
import { RiQrCodeLine } from 'react-icons/ri';

import bando from '../assets/bando.webp';

const Home = () => {
  const routes = [
    {
      from: 'Sài Gòn',
      to: 'Nha Trang',
      price: '385.000 đ',
      duration: '8h20p',
      flightCode: 'SNT2'
    },
    {
      from: 'Hà Nội',
      to: 'Lào Cai',
      price: '375.000 đ',
      duration: '7h45p',
      flightCode: 'SP3'
    },
    {
      from: 'Sài Gòn',
      to: 'Đà Nẵng',
      price: '577.000 đ',
      duration: '17h42p',
      flightCode: 'SE22'
    },
    {
      from: 'Hà Nội',
      to: 'Đà Nẵng',
      price: '1.112.000 đ',
      duration: '16h18p',
      flightCode: 'SE19'
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-160">
      {/* Header */}
      <Header />
      
      {/* Hero Section with Search Form */}
      <HeroSection banner={banner}/>
      
      {/* Benefits Section */}
      <BenefitsSection />

      {/* Bản đồ tuyến đường sắt Việt Nam */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bản đồ tuyến đường sắt Việt Nam</h1>
        <p className="text-gray-600 mb-6 text-md">
          Xem thông tin chi tiết về các tuyến tàu hỏa, lịch trình và điểm dừng
        </p>
        <img src={bando} alt="Bản đồ tuyến đường sắt" className="rounded-2xl w-full max-w-5xl mx-auto" />
      </div>

      {/* Các hành trình tàu hỏa phổ biến */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Các hành trình tàu hỏa phổ biến</h1>
        <p className="text-gray-600 mb-6">
          Khám phá những tuyến đường được yêu thích nhất và đặt vé ngay với giá ưu đãi!
        </p>
        
        {/* Changed to 2 columns on larger screens to increase width of items */}
        <ListTicket routes={routes} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;