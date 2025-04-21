import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import DanhSachToa from './DatCho/DanhSachToa';
import DanhSachGhe from './DatCho/DanhSachGhe';
import ThongTinHanhKhach from './DatCho/ThongTinHanhKhach';
import ChiTietDatCho from './DatCho/ChiTietDatCho';
import ThanhToan from './DatCho/ThanhToan';
import TieuDeChuyen from './DatCho/TieuDeChuyen';

export default function DatCho() {
  const [selectedCabin, setSelectedCabin] = useState('');
  // Thay đổi cấu trúc để lưu ghế theo toa
  const [selectedSeats, setSelectedSeats] = useState([]); // mỗi phần tử: { number, type, cabinId }
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    elderly: 0
  });
  const [activePassengerType, setActivePassengerType] = useState('adult');
  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dữ liệu tàu từ API
  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/chuyentau/1');
        setTrainData(response.data);
        setSelectedCabin(response.data.danhSachToaTau[0]?.maToa || '');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainData();
  }, []);

  // Giá vé và tỷ lệ giảm giá
  const basePrice = 369000;
  const prices = {
    adult: basePrice,
    child: basePrice * 0.7, // Giảm 30% cho trẻ em
    elderly: basePrice * 0.8 // Giảm 20% cho người già
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    if (!trainData) return 0;
    
    let total = 0;
    selectedSeats.forEach(seat => {
      const cabinData = trainData.danhSachToaTau.find(toa => toa.maToa === seat.cabinId);
      if (!cabinData) return;
      
      const seatData = cabinData.danhSachGhe.find(ghe => ghe.tenGhe === seat.number);
      const seatBasePrice = seatData?.giaTien || basePrice;
      
      if (seat.type === 'adult') {
        total += seatBasePrice;
      } else if (seat.type === 'child') {
        total += seatBasePrice * 0.7;
      } else if (seat.type === 'elderly') {
        total += seatBasePrice * 0.8;
      }
    });
    
    return total;
  };

  // Cập nhật số lượng hành khách
  const updatePassengerCount = (type, delta) => {
    const newCount = passengers[type] + delta;
    
    if (newCount >= 0) {
      setPassengers({...passengers, [type]: newCount});
      
      if (delta < 0) {
        const passengerType = type === 'adults' ? 'adult' : type === 'children' ? 'child' : 'elderly';
        const updatedSeats = [...selectedSeats];
        const index = updatedSeats.findIndex(seat => seat.type === passengerType);
        if (index !== -1) {
          updatedSeats.splice(index, 1);
          setSelectedSeats(updatedSeats);
        }
      }
    }
  };

  // Xử lý khi chọn ghế
  const handleSeatSelection = (seatNumber, isAvailable, currentToaId) => {
    if (!isAvailable) return;

    // Kiểm tra xem ghế này đã được chọn trong toa hiện tại chưa
    const selectedSeatIndex = selectedSeats.findIndex(
      seat => seat.number === seatNumber && seat.cabinId === currentToaId
    );
    
    const isSelected = selectedSeatIndex !== -1;
    
    if (isSelected) {
      // Ghế đã được chọn, kiểm tra xem có phải loại hành khách đang chọn không
      const seat = selectedSeats[selectedSeatIndex];
      if (seat.type !== activePassengerType) {
        alert(`Ghế này đã được chọn cho ${seat.type === 'adult' ? 'người lớn' : seat.type === 'child' ? 'trẻ em' : 'người già'}. Vui lòng chọn loại hành khách tương ứng để bỏ chọn.`);
        return;
      }
      
      // Bỏ chọn ghế
      const newSelectedSeats = [...selectedSeats];
      newSelectedSeats.splice(selectedSeatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      // Ghế chưa được chọn, kiểm tra số lượng từng loại hành khách
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

      // Thêm ghế mới với thông tin toa tàu
      setSelectedSeats([
        ...selectedSeats, 
        { 
          number: seatNumber, 
          type: activePassengerType,
          cabinId: currentToaId 
        }
      ]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Lỗi: {error}</div>
      </div>
    );
  }

  if (!trainData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Không tìm thấy dữ liệu chuyến tàu</div>
      </div>
    );
  }

  const currentToa = trainData.danhSachToaTau.find(toa => toa.maToa === selectedCabin);
  const totalPassengers = passengers.adults + passengers.children + passengers.elderly;
  const totalSelectedSeats = selectedSeats.length;

  return (
    <div className="bg-white w-full min-h-screen">
      {/* Tiêu đề */}
      <TieuDeChuyen trainData={trainData} />

      {/* Nội dung chính */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Cột trái */}
        <div className="w-full md:w-3/5 p-3 border-r border-gray-200">
          {/* Chọn hành khách */}
          <ThongTinHanhKhach 
            passengers={passengers}
            updatePassengerCount={updatePassengerCount}
            activePassengerType={activePassengerType}
            setActivePassengerType={setActivePassengerType}
            selectedSeats={selectedSeats}
          />
          
          {/* Chọn toa tàu */}
          <DanhSachToa 
            trainData={trainData}
            selectedCabin={selectedCabin}
            setSelectedCabin={setSelectedCabin}
          />
          
          {/* Chọn ghế */}
          <DanhSachGhe 
            currentToa={currentToa}
            activePassengerType={activePassengerType}
            selectedSeats={selectedSeats}
            handleSeatSelection={handleSeatSelection}
            basePrice={basePrice}
          />
        </div>
        
        {/* Cột phải */}
        <div className="w-full md:w-2/5 p-3 bg-gray-50">
          <div className="sticky top-4">
            {/* Chi tiết đặt chỗ */}
            <ChiTietDatCho
              selectedSeats={selectedSeats}
              trainData={trainData}
              basePrice={basePrice}
            />
            
            {/* Thông tin thanh toán */}
            <ThanhToan
              totalSelectedSeats={totalSelectedSeats}
              totalPassengers={totalPassengers}
              calculateTotal={calculateTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}