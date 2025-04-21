import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChuyenTaus } from '../redux/Slices/ChuyenTauSlice';

import BenefitsSection from '../components/BenefitsSection';
import HeroSection from '../components/HeroSection';
import ListTicket from '../components/ListTicket';
import banner from '../assets/banner.jpg';
import bando from '../assets/bando.webp';

const Home = () => {
  const dispatch = useDispatch();

  // Lấy state từ Redux
  const { chuyenTaus, loading, error } = useSelector((state) => state.chuyenTau);
  
  // UseEffect để dispatch action fetchChuyenTaus
  useEffect(() => {
    dispatch(fetchChuyenTaus());
  }, [dispatch]);
  
  // UseEffect riêng để theo dõi khi chuyenTaus thay đổi
  useEffect(() => {
    console.log("chuyenTaus đã được cập nhật:", chuyenTaus);
  }, [chuyenTaus]);
  
  return (
    <>
      <HeroSection banner={banner} />
      <BenefitsSection />

      {/* Bản đồ tuyến đường */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bản đồ tuyến đường sắt Việt Nam</h1>
        <p className="text-gray-600 mb-6 text-md">
          Xem thông tin chi tiết về các tuyến tàu hỏa, lịch trình và điểm dừng
        </p>
        <img src={bando} alt="Bản đồ tuyến đường sắt" className="rounded-2xl w-full max-w-5xl mx-auto" />
      </div>

      {/* Hành trình phổ biến */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Các hành trình tàu hỏa phổ biến</h1>
        <p className="text-gray-600 mb-6">
          Khám phá những tuyến đường được yêu thích nhất và đặt vé ngay với giá ưu đãi!
        </p>

        {loading && <p className="text-xl font-semibold">Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500 text-xl">Lỗi: {error}</p>}
        {!loading && !error && chuyenTaus && chuyenTaus.length > 0 ? (
          <ListTicket chuyenTaus={chuyenTaus} />
        ) : (
          !loading && !error && <p className="text-gray-500 text-xl">Không có dữ liệu chuyến tàu</p>
        )}
      </div>
    </>
  );
};

export default Home;