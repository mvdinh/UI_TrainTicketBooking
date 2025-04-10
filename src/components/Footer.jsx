import { FaComments, FaApple, FaGooglePlay } from 'react-icons/fa';
import { SiViber } from 'react-icons/si';
import { RiQrCodeLine } from 'react-icons/ri';

import tmgLogo from '../assets/tmg_logo.webp';
import bocongthuong from '../assets/bocongthuong.webp';
import certification2 from '../assets/chinhanhds.webp';

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-sm text-gray-600">
  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Cột 1 */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Về iVIVU.com</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Chúng tôi</a></li>
          <li><a href="#" className="hover:underline">iVIVU Blog</a></li>
          <li><a href="#" className="hover:underline">Điều kiện & Điều khoản</a></li>
        </ul>
      </div>

      {/* Cột 2 */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Thông Tin Cần Biết</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
          <li><a href="#" className="hover:underline">Quy định hàng không</a></li>
          <li><a href="#" className="hover:underline">Câu hỏi thường gặp</a></li>
        </ul>
      </div>

      {/* Cột 3 */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Đối tác</h3>
        <ul className="space-y-2">
          <li><a href="#" className="hover:underline">Quy chế bảo hiểm Cathay</a></li>
          <li><a href="#" className="hover:underline">Yêu cầu bồi thường Cathay</a></li>
          <li><a href="#" className="hover:underline">Quy chế trả góp</a></li>
        </ul>
      </div>

      {/* Cột 4 */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Hỗ trợ</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <FaComments className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <p className="font-semibold text-gray-700">iVIVU Tickets</p>
              <p className="text-sm">7h30 → 21h</p>
            </div>
          </div>
          <div className="flex items-center">
            <SiViber className="h-5 w-5 mr-2 text-purple-600" />
            <p className="font-semibold text-gray-700">iVIVU Viber</p>
          </div>
        </div>
      </div>
    </div>

    {/* Địa chỉ + Chứng nhận */}
    <div className="pt-6 mt-8 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <p>ĐKKD: 0312789481, Ngày cấp: 21/05/2014, Sở KHĐT TP.HCM</p>
        <p><strong>HCM:</strong> 215 Nam Kỳ Khởi Nghĩa, Q.3 (<a href="#" className="text-blue-500">Xem bản đồ</a>)</p>
        <p><strong>Hà Nội:</strong> 2 Chương Dương Độ, Hoàn Kiếm (<a href="#" className="text-blue-500">Xem bản đồ</a>)</p>
        <p><strong>Cần Thơ:</strong> STS Tower, 11B Hòa Bình (<a href="#" className="text-blue-500">Xem bản đồ</a>)</p>
      </div>
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Thành viên của</h4>
        <img src={tmgLogo} alt="TMG Logo" className="h-10 mb-4" />
        <h4 className="font-semibold text-gray-700 mb-2">Được chứng nhận</h4>
        <div className="flex space-x-4 items-center">
          <img src={bocongthuong} alt="Bộ Công Thương"  />
          <img src={certification2} alt="Chứng nhận 2" className="h-14" />
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;