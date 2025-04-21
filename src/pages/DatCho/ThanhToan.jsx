// components/ThanhToan.jsx
import { ChevronRight } from 'lucide-react';

export default function ThanhToan({ totalSelectedSeats, totalPassengers, calculateTotal }) {
  return (
    <>
      <div className="px-4 py-3 bg-white border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <span>Tổng số chỗ</span>
          <span>{totalSelectedSeats}/{totalPassengers} chỗ</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-bold">Tổng tiền</span>
          <span className="font-bold text-orange-600 text-lg">
            {calculateTotal().toLocaleString('vi-VN')}đ
          </span>
        </div>
      </div>
      
      <button 
        className={`w-full py-2 px-4 rounded flex items-center justify-center text-sm mt-3 ${
          totalSelectedSeats === totalPassengers 
            ? 'bg-orange-500 hover:bg-orange-600 text-white' 
            : 'bg-gray-300 text-gray-600'
        }`}
        disabled={totalSelectedSeats !== totalPassengers}
      >
        <span className="font-medium">Tiếp tục chọn chiều về</span> <ChevronRight size={14} className="ml-2" />
      </button>
      
      {totalSelectedSeats !== totalPassengers && (
        <div className="text-center text-orange-600 text-xs mt-2">
          Vui lòng chọn đủ {totalPassengers} chỗ để tiếp tục
        </div>
      )}
    </>
  );
}