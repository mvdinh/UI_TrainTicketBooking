import React, { useEffect, useCallback } from 'react';

export default function ChiTietDatCho({ selectedSeats, trainData, basePrice, onGenerateVeTaus }) {
  // Lấy thông tin toa dựa trên mã toa
  const getCabinName = (cabinId) => {
    const cabin = trainData?.danhSachToaTau.find(toa => toa.maToa === cabinId);
    return cabin ? cabin.tenToa : cabinId;
  };

  // Lấy thông tin giá ghế từ dữ liệu tàu
  const getSeatData = (cabinId, seatNumber) => {
    const cabin = trainData?.danhSachToaTau.find(toa => toa.maToa === cabinId);
    if (!cabin) return null;
    
    return cabin.danhSachGhe.find(ghe => ghe.tenGhe === seatNumber);
  };

  // Chuyển đổi dữ liệu selectedSeats sang định dạng veTaus
  const convertToVeTaus = useCallback(() => {
    if (!selectedSeats || selectedSeats.length === 0 || !trainData) return [];
    
    return selectedSeats.map(seat => {
      const seatData = getSeatData(seat.cabinId, seat.number);
      const price = seatData?.giaTien || basePrice;
      let finalPrice = price;
      let maLoaiCho = 1;
      let tenLoaiCho = 'nguoi lon';

      switch (seat.type) {
        case 'child':
          finalPrice = price * 0.7;
          maLoaiCho = 2;
          tenLoaiCho = 'trẻ em';
          break;
        case 'elderly':
          finalPrice = price * 0.8;
          maLoaiCho = 3;
          tenLoaiCho = 'nguoi cao tuoi';
          break;
        default:
          break;
      }

      return {
        maCho: seat.number,
        tenCho: seat.number,
        tenToa: getCabinName(seat.cabinId),
        soTien: finalPrice,
        maLoaiCho: maLoaiCho,
        tenLoaiCho: tenLoaiCho
      };
    });
  }, [selectedSeats, trainData, basePrice]);

  useEffect(() => {
    if (onGenerateVeTaus && selectedSeats.length > 0 && trainData) {
      const veTausData = convertToVeTaus();
      onGenerateVeTaus(veTausData);
    }
  }, [selectedSeats, trainData, basePrice, onGenerateVeTaus, convertToVeTaus]);

  if (!trainData || selectedSeats.length === 0) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-sm mb-4">
        <div className="text-base font-bold mb-3">Thông tin ghế đã chọn</div>
        <div className="text-gray-500 py-3 text-center text-sm">Chưa có chỗ nào được chọn</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 border border-gray-200 shadow-sm mb-4">
      <div className="text-base font-bold mb-3">Thông tin ghế đã chọn</div>
      
      <div className="space-y-2">
        {selectedSeats.filter(seat => seat.type === 'adult').length > 0 && (
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-sm font-medium">Người lớn</div>
            <div className="text-xs text-gray-600 mt-1">
              {selectedSeats
                .filter(seat => seat.type === 'adult')
                .map(seat => {
                  const seatData = getSeatData(seat.cabinId, seat.number);
                  return (
                    <div key={`adult-${seat.cabinId}-${seat.number}`} className="flex justify-between items-center my-1">
                      <span>Chỗ {seat.number}, Toa {getCabinName(seat.cabinId)}</span>
                      <span className="font-medium">{(seatData?.giaTien || basePrice).toLocaleString('vi-VN')}đ</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {selectedSeats.filter(seat => seat.type === 'child').length > 0 && (
          <div className="p-2 bg-green-50 rounded-lg border border-green-100">
            <div className="text-sm font-medium">Trẻ em (-30%)</div>
            <div className="text-xs text-gray-600 mt-1">
              {selectedSeats
                .filter(seat => seat.type === 'child')
                .map(seat => {
                  const seatData = getSeatData(seat.cabinId, seat.number);
                  const discountedPrice = (seatData?.giaTien || basePrice) * 0.7;
                  return (
                    <div key={`child-${seat.cabinId}-${seat.number}`} className="flex justify-between items-center my-1">
                      <span>Chỗ {seat.number}, Toa {getCabinName(seat.cabinId)}</span>
                      <span className="font-medium">{discountedPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        
        {selectedSeats.filter(seat => seat.type === 'elderly').length > 0 && (
          <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="text-sm font-medium">Người già (-20%)</div>
            <div className="text-xs text-gray-600 mt-1">
              {selectedSeats
                .filter(seat => seat.type === 'elderly')
                .map(seat => {
                  const seatData = getSeatData(seat.cabinId, seat.number);
                  const discountedPrice = (seatData?.giaTien || basePrice) * 0.8;
                  return (
                    <div key={`elderly-${seat.cabinId}-${seat.number}`} className="flex justify-between items-center my-1">
                      <span>Chỗ {seat.number}, Toa {getCabinName(seat.cabinId)}</span>
                      <span className="font-medium">{discountedPrice.toLocaleString('vi-VN')}đ</span>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}