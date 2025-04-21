import { useState, useEffect } from 'react';
import { AlertCircle, Clock, ArrowLeft } from 'lucide-react';

function PaymentForm({ onSubmit, isSubmitting, onBack, errors, handleChange, paymentData }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin thanh toán</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            name="email"
            value={paymentData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'}`}
            placeholder="example@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
          <input
            type="tel"
            name="phone"
            value={paymentData.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'}`}
            placeholder="0912345678"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
          <select
            name="paymentMethod"
            value={paymentData.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
          >
            <option value="credit_card">Thẻ tín dụng/ghi nợ</option>
            <option value="momo">Ví điện tử MoMo</option>
            <option value="zalopay">Ví ZaloPay</option>
            <option value="bank_transfer">Chuyển khoản ngân hàng</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
          <textarea
            name="notes"
            value={paymentData.notes}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 h-24"
            placeholder="Thông tin bổ sung (nếu có)"
          ></textarea>
        </div>

        <div className="pt-2">
          <label className="flex items-start select-none">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={paymentData.agreeTerms}
              onChange={handleChange}
              className={`mt-1 mr-2 h-4 w-4 ${errors.agreeTerms ? 'border-red-500 text-red-500' : 'border-gray-300 text-blue-600'}`}
            />
            <span className="text-sm text-gray-700">
              Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">điều khoản và điều kiện</a> đặt vé
            </span>
          </label>
          {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Quay lại
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg text-white font-medium ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md'
          } transition-all duration-200`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang xử lý...
            </span>
          ) : (
            'Thanh toán ngay'
          )}
        </button>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start">
          <AlertCircle size={20} className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800 mb-1">Lưu ý quan trọng</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li className="flex items-start">
                <span className="mr-1">•</span>
                <span>Vé sẽ được gửi qua email sau khi thanh toán thành công</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1">•</span>
                <span>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</span>
              </li>
              <li className="flex items-start">
                <span className="mr-1">•</span>
                <span>Mang theo giấy tờ tùy thân khi lên tàu</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



function TicketInfo({ thongTinTau, veTaus }) {
  const [passengerForms, setPassengerForms] = useState({});
  const [passengerErrors, setPassengerErrors] = useState({});

  // Group tickets by passenger type
  const adultTickets = veTaus.filter(ticket => ticket.maLoaiCho === 1);
  const childTickets = veTaus.filter(ticket => ticket.maLoaiCho === 2);
  const elderlyTickets = veTaus.filter(ticket => ticket.maLoaiCho === 3);

  // Format date from "YYYY-MM-DD" to "DD/MM/YYYY"
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Calculate total price
  const calculateTotal = () => {
    return veTaus.reduce((total, ticket) => total + ticket.soTien, 0);
  };

  // Handle passenger information changes
  const handlePassengerChange = (seatId, field, value) => {
    setPassengerForms({
      ...passengerForms,
      [seatId]: {
        ...passengerForms[seatId],
        [field]: value
      }
    });
    
    const errorKey = `${field}-${seatId}`;
    if (passengerErrors[errorKey]) {
      setPassengerErrors({ ...passengerErrors, [errorKey]: null });
    }
  };

  // Get coach number from "ToaX" format
  const getCoachNumber = (tenToa) => {
    if (!tenToa) return '';
    const match = tenToa.match(/Toa(\d+)/);
    return match ? match[1] : '';
  };

  // Map passenger type based on maLoaiCho
  const getPassengerTypeLabel = (maLoaiCho) => {
    switch (maLoaiCho) {
      case 1: return 'Người lớn';
      case 2: return 'Trẻ em';
      case 3: return 'Người già';
      default: return 'Hành khách';
    }
  };

  // Get CSS class based on passenger type
  const getPassengerTypeClass = (maLoaiCho) => {
    switch (maLoaiCho) {
      case 1: return 'bg-blue-50 border-blue-100';
      case 2: return 'bg-green-50 border-green-100';
      case 3: return 'bg-yellow-50 border-yellow-100';
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  // Get discount text based on passenger type
  const getDiscountText = (maLoaiCho) => {
    switch (maLoaiCho) {
      case 2: return <span className="ml-2 text-xs text-green-600">(-30%)</span>;
      case 3: return <span className="ml-2 text-xs text-yellow-600">(-20%)</span>;
      default: return null;
    }
  };

  // Calculate subtotal for a specific passenger type
  const calculateSubtotal = (tickets) => {
    return tickets.reduce((sum, ticket) => sum + ticket.soTien, 0);
  };

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
            <span className="text-gray-600">Loại toa:</span>
            <span className="font-medium">Nội mềm điều hòa</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin hành khách</h2>
        <div className="space-y-4">
          {veTaus.map(ticket => (
            <div 
              key={`${ticket.maLoaiCho}-${ticket.maCho}`} 
              className={`p-4 rounded-lg border ${getPassengerTypeClass(ticket.maLoaiCho)}`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">
                  {getPassengerTypeLabel(ticket.maLoaiCho)} - Chỗ {ticket.tenCho}, Toa {getCoachNumber(ticket.tenToa)}
                  {getDiscountText(ticket.maLoaiCho)}
                </span>
                <span className="text-sm font-medium">
                  {ticket.soTien.toLocaleString('vi-VN')}đ
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name={`fullName-${ticket.maCho}`}
                    value={passengerForms[ticket.maCho]?.fullName || ''}
                    onChange={(e) => handlePassengerChange(ticket.maCho, 'fullName', e.target.value)}
                    className={`w-full p-2.5 text-sm border rounded-lg ${
                      passengerErrors[`fullName-${ticket.maCho}`] ? 'border-red-500' : 
                      'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                    }`}
                    placeholder="Nhập họ và tên"
                  />
                  {passengerErrors[`fullName-${ticket.maCho}`] && (
                    <p className="text-red-500 text-xs mt-1">{passengerErrors[`fullName-${ticket.maCho}`]}</p>
                  )}
                </div>
                
                {(ticket.maLoaiCho === 1 || ticket.maLoaiCho === 3) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số CMND/CCCD <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name={`idNumber-${ticket.maCho}`}
                      value={passengerForms[ticket.maCho]?.idNumber || ''}
                      onChange={(e) => handlePassengerChange(ticket.maCho, 'idNumber', e.target.value)}
                      className={`w-full p-2.5 text-sm border rounded-lg ${
                        passengerErrors[`idNumber-${ticket.maCho}`] ? 'border-red-500' : 
                        'border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-200'
                      }`}
                      placeholder="Nhập số CMND/CCCD"
                    />
                    {passengerErrors[`idNumber-${ticket.maCho}`] && (
                      <p className="text-red-500 text-xs mt-1">{passengerErrors[`idNumber-${ticket.maCho}`]}</p>
                    )}
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
          {adultTickets.length > 0 && (
            <div className="flex justify-between">
              <span>Người lớn x{adultTickets.length}</span>
              <span className="font-medium">{calculateSubtotal(adultTickets).toLocaleString('vi-VN')}đ</span>
            </div>
          )}
          
          {childTickets.length > 0 && (
            <div className="flex justify-between">
              <span>Trẻ em x{childTickets.length} <span className="text-green-600 text-xs">(-30%)</span></span>
              <span className="font-medium">{calculateSubtotal(childTickets).toLocaleString('vi-VN')}đ</span>
            </div>
          )}
          
          {elderlyTickets.length > 0 && (
            <div className="flex justify-between">
              <span>Người già x{elderlyTickets.length} <span className="text-yellow-600 text-xs">(-20%)</span></span>
              <span className="font-medium">{calculateSubtotal(elderlyTickets).toLocaleString('vi-VN')}đ</span>
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



export default function PaymentInfo() {
  const thongTinTau = {
    maChuyenTau: 1,
    gaDi: "Nha Trang",
    gaDen: "Sài Gòn",
    ngayKhoiHanh: "2025-05-24",
    tenTau: "SE1"
  };
  
  const veTaus = [
    {
      maCho: 1,
      tenCho: "B2",
      tenToa: "Toa2",
      soTien: 200000,
      maLoaiCho: 1,
      tenLoaiCho: "nguoi lon"
    },
    // {
    //   maCho: 2,
    //   tenCho: "B3",
    //   tenToa: "Toa3",
    //   soTien: 140000,
    //   maLoaiCho: 2,
    //   tenLoaiCho: "trẻ em"
    // },
    {
      maCho: 3,
      tenCho: "B4",
      tenToa: "Toa2",
      soTien: 160000,
      maLoaiCho: 3,
      tenLoaiCho: "nguoi cao tuoi"
    }
  ];

  const selectedSeats = [
    { number: 'A1', type: 'adult' },
    { number: 'A2', type: 'adult' },
    { number: 'B1', type: 'child' },
    { number: 'C1', type: 'elderly' }
  ];
  const currentCabin = { id: 'cabin-2', name: 'Nội mềm điều hòa' };
  const [timeLeft, setTimeLeft] = useState(600);
  const [paymentData, setPaymentData] = useState({
    email: '',
    phone: '',
    notes: '',
    agreeTerms: false,
    paymentMethod: 'credit_card'
  });
  const [passengerForms, setPassengerForms] = useState({});
  const [errors, setErrors] = useState({});
  const [passengerErrors, setPassengerErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeoutModalVisible, setIsTimeoutModalVisible] = useState(false);
  
  useEffect(() => {
    const initialPassengerForms = {};
    selectedSeats.forEach(seat => {
      initialPassengerForms[seat.number] = {
        fullName: '',
        idNumber: ''
      };
    });
    setPassengerForms(initialPassengerForms);
  }, []);

  const getCurrentCoach = () => currentCabin?.id.includes('2') ? '2' : '';

  const prices = {
    adult: 369000,
    child: Math.round(369000 * 0.7),
    elderly: Math.round(369000 * 0.8)
  };

  const onBack = () => console.log('Going back to seat selection');
  const onComplete = () => console.log('Payment completed');
  const handleReturnToBooking = () => window.location.href = "/";

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeoutModalVisible(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handlePassengerChange = (seatNumber, field, value) => {
    setPassengerForms({
      ...passengerForms,
      [seatNumber]: {
        ...passengerForms[seatNumber],
        [field]: value
      }
    });
    const errorKey = `${field}-${seatNumber}`;
    if (passengerErrors[errorKey]) {
      setPassengerErrors({ ...passengerErrors, [errorKey]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const newPassengerErrors = {};
    let isValid = true;

    if (!paymentData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(paymentData.email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }
    
    if (!paymentData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(paymentData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }
    
    if (!paymentData.agreeTerms) {
      newErrors.agreeTerms = 'Vui lòng đồng ý với điều khoản';
      isValid = false;
    }

    selectedSeats.forEach(seat => {
      if (!passengerForms[seat.number]?.fullName?.trim()) {
        newPassengerErrors[`fullName-${seat.number}`] = 'Vui lòng nhập họ tên';
        isValid = false;
      }
      
      if ((seat.type === 'adult' || seat.type === 'elderly') && 
          !passengerForms[seat.number]?.idNumber?.trim()) {
        newPassengerErrors[`idNumber-${seat.number}`] = 'Vui lòng nhập số CMND/CCCD';
        isValid = false;
      }
    });

    setErrors(newErrors);
    setPassengerErrors(newPassengerErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold text-gray-800 mb-2 md:mb-0">Nhập thông tin thanh toán</div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">Ga Nha Trang → Ga Sài Gòn</span>
            <span className="mx-2">|</span>
            <span>11/04/2025</span>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="bg-orange-50 border-y border-orange-200">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center">
          <Clock size={16} className="text-orange-600 mr-2" />
          <span className="text-sm font-medium text-orange-700">
            Thời gian còn lại: <span className="font-bold ml-1">{formatTime(timeLeft)}</span>
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
          <TicketInfo thongTinTau={thongTinTau} veTaus={veTaus} />
          </div>
          
          <div className="lg:col-span-1">
            <PaymentForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onBack={onBack}
              errors={errors}
              handleChange={handleChange}
              paymentData={paymentData}
            />
          </div>
        </div>
      </div>

      {/* Timeout Modal */}
      {isTimeoutModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Hết thời gian thanh toán</h2>
              <p className="text-gray-600 mb-6">
                Thời gian đặt vé của bạn đã hết. Vui lòng thực hiện lại quá trình đặt vé.
              </p>
              <button
                onClick={handleReturnToBooking}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-md transition-all duration-200"
              >
                Quay lại đặt vé
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}