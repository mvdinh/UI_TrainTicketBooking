// components/DanhSachGhe.jsx
export default function DanhSachGhe({ 
    currentToa, 
    activePassengerType, 
    selectedSeats, 
    handleSeatSelection,
    basePrice
  }) {
    const generateSeats = () => {
      if (!currentToa) return [];
      
      const seats = [];
      const availableSeats = currentToa.danhSachGhe
        .filter(ghe => ghe.trangThai === "Trống")
        .map(ghe => ghe.tenGhe);
  
      // Hiển thị ghế theo layout của toa
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 10; col++) {
          if (row === 2) {
            seats.push(
              <div key="row-gap" className="col-span-10 h-6 flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-medium my-1">
                Đường đi
              </div>
            );
            row++;
          } else {
            const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
            const isAvailable = availableSeats.includes(seatNumber);
            
            // Kiểm tra xem ghế này đã được chọn trong TOA HIỆN TẠI hay chưa
            const selectedSeatIndex = selectedSeats.findIndex(
              seat => seat.number === seatNumber && seat.cabinId === currentToa.maToa
            );
            
            const isSelected = selectedSeatIndex !== -1;
            const seatType = isSelected ? selectedSeats[selectedSeatIndex].type : null;
            const isActiveType = isSelected && seatType === activePassengerType;
            const isClickable = isAvailable && (!isSelected || isActiveType);
  
            // Lấy giá ghế từ API nếu có
            const seatData = currentToa.danhSachGhe.find(ghe => ghe.tenGhe === seatNumber);
            const seatPrice = seatData?.giaTien || basePrice;
  
            seats.push(
              <div
                key={`seat-${seatNumber}`}
                className={`flex flex-col items-center justify-center p-1 rounded h-10 ${
                  isSelected
                    ? 'bg-blue-200 border-2 border-blue-500'
                    : isAvailable
                    ? 'bg-white border border-gray-300 hover:bg-gray-100'
                    : 'bg-gray-100 border border-gray-200 opacity-50'
                } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => handleSeatSelection(seatNumber, isAvailable, currentToa.maToa)}
              >
                {isAvailable && (
                  <>
                    <div className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                      {seatNumber}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isSelected && seatType !== 'adult' ? 
                        `${(seatType === 'child' ? '30' : '20')}%` : 
                        `${(seatPrice / 1000).toFixed(0)}k`}
                    </div>
                  </>
                )}
              </div>
            );
          }
        }
      }
  
      return seats;
    };
  
    return (
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">{currentToa?.tenToa}</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              Đang chọn: {activePassengerType === 'adult' ? 'Người lớn' : activePassengerType === 'child' ? 'Trẻ em (-30%)' : 'Người già (-20%)'}
            </span>
          </div>
          <span className="text-xs text-gray-600">
            * Chỉ có thể bỏ chọn ghế khi đang ở đúng loại hành khách
          </span>
        </div>
        
        <div className="grid grid-cols-10 gap-1 mb-3">
          {generateSeats()}
        </div>
        
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 border border-gray-300 bg-white mr-1"></div>
            <span className="text-xs">Chỗ trống</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-gray-300 bg-gray-300 mr-1"></div>
            <span className="text-xs">Chỗ đã bán</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border border-blue-500 bg-blue-100 mr-1"></div>
            <span className="text-xs">Chỗ đang chọn</span>
          </div>
        </div>
      </div>
    );
  }