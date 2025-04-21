import { useState } from 'react';
import { X, ChevronRight, Plus, Minus } from 'lucide-react';

export default function DatCho() {
  const [selectedCabin, setSelectedCabin] = useState('soft-bed-ac-1');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 1,
    elderly: 1
  });
  const [activePassengerType, setActivePassengerType] = useState('adult'); // 'adult', 'child', hoặc 'elderly'

  const cabins = [
    { id: 'hard-bed-ac', name: 'Giường nằm khoang 6 điều hòa', capacity: 20, priceRange: '520K - 657K' },
    { id: 'hard-bed-ac-3', name: 'Toa 3: Giường nằm khoang 6 điều hòa', capacity: 20, priceRange: '520K - 657K' },
    { id: 'soft-bed-ac-2', name: 'Toa 2: Nội mềm điều hòa', capacity: 7, priceRange: '369K - 389K' },
    { id: 'soft-bed-ac-1', name: 'Toa 1: Nội mềm điều hòa', capacity: 10, priceRange: '369K - 389K' },
    { id: 'soft-bed-ac-5', name: 'Toa 5: Nội mềm điều hòa', capacity: 8, priceRange: '369K - 389K' },
    { id: 'soft-bed-ac-6', name: 'Toa 6: Nội mềm điều hòa', capacity: 9, priceRange: '369K - 389K' },
  ];

  // Giá vé và tỷ lệ giảm giá
  const basePrice = 369000;
  const prices = {
    adult: basePrice,
    child: basePrice * 0.7, // Giảm 30% cho trẻ em
    elderly: basePrice * 0.8 // Giảm 20% cho người già
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    let adultTotal = selectedSeats.filter(seat => seat.type === 'adult').length * prices.adult;
    let childTotal = selectedSeats.filter(seat => seat.type === 'child').length * prices.child;
    let elderlyTotal = selectedSeats.filter(seat => seat.type === 'elderly').length * prices.elderly;
    return adultTotal + childTotal + elderlyTotal;
  };

  // Thay đổi số lượng hành khách
  const updatePassengerCount = (type, delta) => {
    const newCount = passengers[type] + delta;
    
    if (newCount >= 0) {
      // Cập nhật số lượng hành khách
      setPassengers({...passengers, [type]: newCount});
      
      // Nếu giảm số lượng, xóa ghế đã chọn của loại hành khách đó
      if (delta < 0) {
        const updatedSeats = [...selectedSeats];
        const passengerType = type === 'adults' ? 'adult' : type === 'children' ? 'child' : 'elderly';
        const index = updatedSeats.findIndex(seat => seat.type === passengerType);
        if (index !== -1) {
          updatedSeats.splice(index, 1);
          setSelectedSeats(updatedSeats);
        }
      }
    }
  };

  const generateSeats = () => {
    const seats = [];
    const availableSeats = ['6', '26', '38', '39', '43', '47', '58', '59', '60', '62'];

    // Hiển thị 4 hàng, mỗi hàng 12 ghế
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
          const seatNumber = (row * 12 + col + 1).toString();
          const isAvailable = availableSeats.includes(seatNumber);
          const selectedSeatIndex = selectedSeats.findIndex(seat => seat.number === seatNumber);
          const isSelected = selectedSeatIndex !== -1;
          const seatType = isSelected ? selectedSeats[selectedSeatIndex].type : null;
          
          // Kiểm tra nếu ghế thuộc về loại hành khách đang active
          const isActiveType = isSelected && seatType === activePassengerType;
          
          // Ghế có thể được bấm (clickable) nếu là ghế trống hoặc là ghế của loại hành khách đang active
          const isClickable = isAvailable && (!isSelected || isActiveType);

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
              onClick={() => handleSeatSelection(seatNumber, isAvailable, isSelected, selectedSeatIndex, isActiveType)}
            >
              {isAvailable && (
                <>
                  <div className={`text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                    {seatNumber}
                  </div>
                  <div className="text-xs text-gray-500">
                    {isSelected && seatType !== 'adult' ? 
                      `${(seatType === 'child' ? '30' : '20')}%` : 
                      '369k'}
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

  const handleSeatSelection = (seatNumber, isAvailable, isSelected, selectedSeatIndex, isActiveType) => {
    if (!isAvailable) return;

    // Nếu ghế đã được chọn nhưng không thuộc loại hành khách đang active, không cho phép bỏ chọn
    if (isSelected && !isActiveType) {
      alert(`Ghế này đã được chọn cho ${selectedSeats[selectedSeatIndex].type === 'adult' ? 'người lớn' : selectedSeats[selectedSeatIndex].type === 'child' ? 'trẻ em' : 'người già'}. Vui lòng chọn loại hành khách tương ứng để bỏ chọn.`);
      return;
    }

    if (isSelected && isActiveType) {
      // Bỏ chọn ghế nếu thuộc loại hành khách đang active
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(selectedSeatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      // Kiểm tra xem đã đủ số lượng ghế cho loại hành khách được chọn chưa
      const totalAdultSeats = selectedSeats.filter(seat => seat.type === 'adult').length;
      const totalChildSeats = selectedSeats.filter(seat => seat.type === 'child').length;
      const totalElderlySeats = selectedSeats.filter(seat => seat.type === 'elderly').length;

      if (activePassengerType === 'adult' && totalAdultSeats >= passengers.adults) {
        alert('Bạn đã chọn đủ số ghế cho người lớn');
        return;
      }

      if (activePassengerType === 'child' && totalChildSeats >= passengers.children) {
        alert('Bạn đã chọn đủ số ghế cho trẻ em');
        return;
      }

      if (activePassengerType === 'elderly' && totalElderlySeats >= passengers.elderly) {
        alert('Bạn đã chọn đủ số ghế cho người già');
        return;
      }

      // Thêm ghế mới
      setSelectedSeats([...selectedSeats, { number: seatNumber, type: activePassengerType }]);
    }
  };

  const currentCabin = cabins.find(cabin => cabin.id === selectedCabin);
  const totalPassengers = passengers.adults + passengers.children + passengers.elderly;
  const totalSelectedSeats = selectedSeats.length;

  // Lấy toa tàu hiện tại từ id cabin
  const getCurrentCoach = () => {
    if (currentCabin?.id.includes('1')) return '1';
    if (currentCabin?.id.includes('2')) return '2';
    if (currentCabin?.id.includes('3')) return '3';
    if (currentCabin?.id.includes('5')) return '5';
    if (currentCabin?.id.includes('6')) return '6';
    return '';
  };

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Header - Tên chuyến tàu ở giữa */}
    <div className="relative flex items-center p-3 border-b border-gray-200 bg-gray-50">
      {/* Tên chuyến tàu ở giữa */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold whitespace-nowrap">
        Tàu Tốc Hành SE7
      </div>

      {/* Thông tin ga bên phải */}
      <div className="ml-auto text-base font-medium whitespace-nowrap text-right">
        Ga Nha Trang → Ga Sài Gòn | 11/04/2025
      </div>
    </div>

      {/* Main Content - Chia làm 2 cột */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Cột bên trái - Chọn số lượng vé và ghế */}
        <div className="w-full md:w-3/5 p-3 border-r border-gray-200">
          {/* Passenger Selection - Kích thước nhỏ hơn */}
          <div className="mb-4">
            <div className="text-base font-medium mb-2">Chọn số lượng hành khách:</div>
            <div className="flex gap-2">
              <div 
                className={`flex-1 p-2 border rounded-lg cursor-pointer ${activePassengerType === 'adult' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setActivePassengerType('adult')}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Người lớn</div>
                  <div className="flex items-center">
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('adults', -1);
                      }}
                      disabled={passengers.adults <= 0}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="mx-2 font-bold text-sm">{passengers.adults}</span>
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('adults', 1);
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Đã chọn: {selectedSeats.filter(seat => seat.type === 'adult').length}/{passengers.adults} chỗ
                </div>
              </div>
              
              <div 
                className={`flex-1 p-2 border rounded-lg cursor-pointer ${activePassengerType === 'child' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setActivePassengerType('child')}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Trẻ em <span className="text-green-600 text-xs">-30%</span></div>
                  <div className="flex items-center">
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('children', -1);
                      }}
                      disabled={passengers.children <= 0}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="mx-2 font-bold text-sm">{passengers.children}</span>
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('children', 1);
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Đã chọn: {selectedSeats.filter(seat => seat.type === 'child').length}/{passengers.children} chỗ
                </div>
              </div>
              
              <div 
                className={`flex-1 p-2 border rounded-lg cursor-pointer ${activePassengerType === 'elderly' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setActivePassengerType('elderly')}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium">Người già <span className="text-green-600 text-xs">-20%</span></div>
                  <div className="flex items-center">
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('elderly', -1);
                      }}
                      disabled={passengers.elderly <= 0}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="mx-2 font-bold text-sm">{passengers.elderly}</span>
                    <button 
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        updatePassengerCount('elderly', 1);
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Đã chọn: {selectedSeats.filter(seat => seat.type === 'elderly').length}/{passengers.elderly} chỗ
                </div>
              </div>
            </div>
          </div>
          
          {/* Cabin Selection with Train Engine Image */}
          <div className="mb-4">
            <div className="text-base font-medium mb-2">Chọn toa tàu:</div>
            
            {/* Train Layout with Engine and Cabins */}
            <div className="flex items-start">
              
              {/* Scrollable Cabin Selection */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex space-x-2 pb-2 min-w-max">
                  {cabins.map((cabin) => (
                    <button
                      key={cabin.id}
                      className={`flex-shrink-0 min-w-36 w-36 py-2 px-3 border text-sm ${
                        selectedCabin === cabin.id
                          ? 'bg-blue-50 border-blue-500'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedCabin(cabin.id)}
                    >
                      <div className="text-xs font-medium truncate">{cabin.name}</div>
                      <div className="text-xs text-gray-500">
                        Còn {cabin.capacity} chỗ | {cabin.priceRange}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Train Engine Image */}
              <div className="flex-shrink-0 mr-2">
                <img
                  src="https://res.ivivu.com/train/images/trainlist/head-train-desktop.svg"
                  alt="Đầu tàu"
                  className="w-22 ml-2 object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Seats Selection - Kích thước ghế nhỏ hơn */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">{currentCabin?.name}</span>
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
        </div>
        
        {/* Cột bên phải - Thông tin ghế và thanh toán */}
        <div className="w-full md:w-2/5 p-3 bg-gray-50">
          <div className="sticky top-4">
            <div className="bg-white p-4 border border-gray-200 shadow-sm mb-4">
              <div className="text-base font-bold mb-3">Thông tin ghế đã chọn</div>
              
              {selectedSeats.length === 0 ? (
                <div className="text-gray-500 py-3 text-center text-sm">Chưa có chỗ nào được chọn</div>
              ) : (
                <div className="space-y-2">
                  {selectedSeats.filter(seat => seat.type === 'adult').length > 0 && (
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-sm font-medium">Người lớn</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {selectedSeats
                          .filter(seat => seat.type === 'adult')
                          .map(seat => (
                            <div key={`adult-${seat.number}`} className="flex justify-between items-center my-1">
                              <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                              <span className="font-medium">{prices.adult.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSeats.filter(seat => seat.type === 'child').length > 0 && (
                    <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-sm font-medium">Trẻ em (-30%)</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {selectedSeats
                          .filter(seat => seat.type === 'child')
                          .map(seat => (
                            <div key={`child-${seat.number}`} className="flex justify-between items-center my-1">
                              <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                              <span className="font-medium">{prices.child.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSeats.filter(seat => seat.type === 'elderly').length > 0 && (
                    <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="text-sm font-medium">Người già (-20%)</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {selectedSeats
                          .filter(seat => seat.type === 'elderly')
                          .map(seat => (
                            <div key={`elderly-${seat.number}`} className="flex justify-between items-center my-1">
                              <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                              <span className="font-medium">{prices.elderly.toLocaleString('vi-VN')}đ</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-4 pt-2 border-t border-gray-200">
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
            </div>
            
            <button 
              className={`w-full py-2 px-4 rounded flex items-center justify-center text-sm ${
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
          </div>
        </div>
      </div>
    </div>
  );
}