import React from 'react';
import { useSelector } from 'react-redux';

export default function TicketInfo() {
  // Lấy dữ liệu từ Redux store
  const thongTinTau = useSelector(state => state.datVe.thongTinTau);
  const veTaus = useSelector(state => state.datVe.veTaus);

  // Phân loại vé theo loại chỗ
  const veNguoiLon = veTaus.filter(ve => ve.maLoaiCho === 1);
  const veTreEm = veTaus.filter(ve => ve.maLoaiCho === 2);
  const veNguoiCaoTuoi = veTaus.filter(ve => ve.maLoaiCho === 3);

  // Tính tổng tiền
  const calculateTotal = () => {
    return veTaus.reduce((total, ve) => total + ve.soTien, 0);
  };

  // Format ngày khởi hành
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Nếu chưa có dữ liệu, hiển thị thông báo
  if (!thongTinTau || veTaus.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-center text-gray-500">Chưa có thông tin vé</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Thông tin chuyến đi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tuyến đường:</span>
            <span className="font-medium">{thongTinTau.gaDi} → {thongTinTau.gaDen}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tàu:</span>
            <span className="font-medium">{thongTinTau.tenTau}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày khởi hành:</span>
            <span className="font-medium">{formatDate(thongTinTau.ngayKhoiHanh)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Mã chuyến tàu:</span>
            <span className="font-medium">{thongTinTau.maChuyenTau}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin hành khách</h2>
        <div className="space-y-4">
          {veTaus.map(ve => (
            <div key={`${ve.maLoaiCho}-${ve.maCho}`} className={`p-4 rounded-lg border ${
              ve.maLoaiCho === 1 ? 'bg-blue-50 border-blue-100' :
              ve.maLoaiCho === 2 ? 'bg-green-50 border-green-100' :
              'bg-yellow-50 border-yellow-100'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">
                  {ve.tenLoaiCho} - Chỗ {ve.tenCho}, {ve.tenToa}
                  {ve.maLoaiCho !== 1 && (
                    <span className={`ml-2 text-xs ${
                      ve.maLoaiCho === 2 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      ({ve.maLoaiCho === 2 ? '-30%' : '-20%'})
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium">
                  {ve.soTien.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                
                {(ve.maLoaiCho === 1 || ve.maLoaiCho === 3) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số CMND/CCCD <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      className="w-full p-2.5 text-sm border border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                      placeholder="Nhập số CMND/CCCD"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tóm tắt thanh toán</h3>
        
        <div className="space-y-3 mb-4">
          {veNguoiLon.length > 0 && (
            <div className="flex justify-between">
              <span>Người lớn x{veNguoiLon.length}</span>
              <span className="font-medium">
                {veNguoiLon.reduce((sum, ve) => sum + ve.soTien, 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
          )}
          
          {veTreEm.length > 0 && (
            <div className="flex justify-between">
              <span>Trẻ em x{veTreEm.length} <span className="text-green-600 text-xs">(-30%)</span></span>
              <span className="font-medium">
                {veTreEm.reduce((sum, ve) => sum + ve.soTien, 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
          )}
          
          {veNguoiCaoTuoi.length > 0 && (
            <div className="flex justify-between">
              <span>Người cao tuổi x{veNguoiCaoTuoi.length} <span className="text-yellow-600 text-xs">(-20%)</span></span>
              <span className="font-medium">
                {veNguoiCaoTuoi.reduce((sum, ve) => sum + ve.soTien, 0).toLocaleString('vi-VN')}đ
              </span>
            </div>
          )}
        </div>
        
        <div className="pt-3 border-t border-gray-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Tổng số chỗ:</span>
            <span className="font-medium">{veTaus.length} chỗ</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">Tổng tiền:</span>
            <span className="font-bold text-orange-600 text-xl">
              {calculateTotal().toLocaleString('vi-VN')}đ
            </span>
          </div>
          <div className="text-xs text-gray-500 italic mt-1 text-right">
            (Đã bao gồm thuế VAT)
          </div>
        </div>
      </div>
    </div>
  );
}