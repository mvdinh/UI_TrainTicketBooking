// components/ThongTinHanhKhach.jsx
import { Plus, Minus } from 'lucide-react';

export default function ThongTinHanhKhach({ 
  passengers, 
  updatePassengerCount, 
  activePassengerType, 
  setActivePassengerType,
  selectedSeats
}) {
  return (
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
                disabled={passengers.adults <= 1}
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
  );
}