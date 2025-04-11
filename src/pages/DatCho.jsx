import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

export default function DatCho() {
  const [selectedCabin, setSelectedCabin] = useState('soft-bed-ac-1');
  const [selectedSeat, setSelectedSeat] = useState('26');

  const cabins = [
    { id: 'hard-bed-ac', name: 'Giường nằm khoang 6 điều hòa', capacity: 20, priceRange: '520K - 657K' },
    { id: 'hard-bed-ac-3', name: 'Toa 3: Giường nằm khoang 6 điều hòa', capacity: 20, priceRange: '520K - 657K' },
    { id: 'soft-bed-ac-2', name: 'Toa 2: Nội mềm điều hòa', capacity: 7, priceRange: '369K - 389K' },
    { id: 'soft-bed-ac-1', name: 'Toa 1: Nội mềm điều hòa', capacity: 10, priceRange: '369K - 389K' },
  ];

  const generateSeats = () => {
    const seats = [];
    const availableSeats = ['6', '26', '38', '39', '43', '47', '58', '59', '60', '62'];

    // Hiển thị 4 hàng, mỗi hàng 12 ghế
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 10;col++) {
        if(row === 2){
            seats.push(
                <div key="row-gap" className="col-span-12 h-8 flex items-center justify-center bg-gray-100 text-gray-600 text-sm font-medium my-2">
                  Đường đi
                </div>
              );
            row++;
        } 
        else{
            const seatNumber = (row * 12 + col + 1).toString();
        const isAvailable = availableSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;

        seats.push(
          <div
            key={`seat-${seatNumber}`}
            className={`flex flex-col items-center justify-center p-2 rounded h-16 ${
              isSelected
                ? 'bg-blue-200 border-2 border-blue-500'
                : isAvailable
                ? 'bg-white border border-gray-300 cursor-pointer hover:bg-gray-100'
                : 'bg-gray-100 border border-gray-200 opacity-50'
            }`}
            onClick={() => isAvailable && setSelectedSeat(seatNumber)}
          >
            {isAvailable && (
              <>
                <div className={`text-sm font-bold ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                  {seatNumber}
                </div>
                <div className="text-xs text-gray-500">369k</div>
              </>
            )}
          </div>
        );
        }
        
      }
    }

    return seats;
  };

  const currentCabin = cabins.find(cabin => cabin.id === selectedCabin);

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="text-lg font-medium">Ga Nha Trang → Ga Sài Gòn | 11/04/2025</div>
        <div className="text-xl font-bold">Tàu Tốc Hành SE7</div>
        <button className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* Cabin Selection - Scrollable with train engine image */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max items-center">
          
          
          {/* Cabin buttons with spacing */}
          {cabins.map((cabin) => (
            <button
              key={cabin.id}
              className={`flex-shrink-0 w-70 py-6 px-2 text-center mx-1 ${
                selectedCabin === cabin.id
                  ? 'bg-blue-50 border-b-2 border-blue-500'
                  : 'bg-gray-50'
              }`}
              onClick={() => setSelectedCabin(cabin.id)}
            >
              <div className="text-sm font-medium">{cabin.name}</div>
              <div className="text-xs text-gray-500">
                Còn {cabin.capacity} chỗ | Giá từ {cabin.priceRange}
              </div>
            </button>
          ))}
          {/* Train engine image */}
          <div className="mr-5">
            <img
              src="https://res.ivivu.com/train/images/trainlist/head-train-desktop.svg"
              alt="Đầu tàu"
              className="w-28 h-28 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Cabin Name */}
      <div className="text-center py-4 text-lg font-bold">
        {currentCabin?.name}
      </div>

      {/* Seats Grid with proper column structure */}
      <div className="p-4">
        <div className="grid grid-cols-13 gap-1">
          {generateSeats()}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex flex-col">
          <div className="font-medium">Người lớn</div>
          <div className="text-sm text-gray-600">
            Chỗ {selectedSeat}, Toa 1 - 369.000
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center space-x-4 mr-4">
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 bg-white mr-2"></div>
              <span className="text-sm">Chỗ trống</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-gray-300 bg-gray-300 mr-2"></div>
              <span className="text-sm">Chỗ đã bán</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border border-blue-500 bg-blue-100 mr-2"></div>
              <span className="text-sm">Chỗ đang chọn</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm">Đã chọn: 1/1 chỗ</div>
            <div className="font-bold text-orange-500 text-lg">
              Tổng tiền: 369.000 đ
            </div>
          </div>

          <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded flex items-center">
            Tiếp tục chọn chiều về <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
        <div>Tàu du lịch</div>
        <div>Ga Nha Trang</div>
        <div>Ga Sài Gòn</div>
        <div>Từ 370.000 đ</div>
      </div>
    </div>
  );
}