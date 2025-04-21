import { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, Clock } from 'lucide-react';

export default function PaymentInfo() {
  // Hardcoded data instead of props
  const selectedSeats = [
    { number: 'A1', type: 'adult' },
    { number: 'A2', type: 'adult' },
    { number: 'B1', type: 'child' },
    { number: 'C1', type: 'elderly' }
  ];
  const currentCabin = { id: 'cabin-2', name: 'Nội mềm điều hòa' };
  const totalPassengers = selectedSeats.length;

  const [timeLeft, setTimeLeft] = useState(2); // 10 minutes in seconds
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    notes: '',
    agreeTerms: false,
    paymentMethod: 'credit_card' // Default payment method
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeoutModalVisible, setIsTimeoutModalVisible] = useState(false);
  
  // Get current coach from cabin ID
  const getCurrentCoach = () => {
    if (currentCabin?.id.includes('1')) return '1';
    if (currentCabin?.id.includes('2')) return '2';
    if (currentCabin?.id.includes('3')) return '3';
    if (currentCabin?.id.includes('5')) return '5';
    if (currentCabin?.id.includes('6')) return '6';
    return '';
  };

  // Prices configuration
  const prices = {
    adult: 369000,
    child: 369000 * 0.7, // 30% discount
    elderly: 369000 * 0.8 // 20% discount
  };

  // Group seats by passenger type
  const adultSeats = selectedSeats.filter(seat => seat.type === 'adult');
  const childSeats = selectedSeats.filter(seat => seat.type === 'child');
  const elderlySeats = selectedSeats.filter(seat => seat.type === 'elderly');

  // Calculate total
  const calculateTotal = () => {
    return (
      prices.adult * adultSeats.length +
      prices.child * childSeats.length +
      prices.elderly * elderlySeats.length
    );
  };

  // Mock functions for navigation
  const onBack = () => {
    console.log('Going back to seat selection');
  };

  const onComplete = () => {
    console.log('Payment completed');
  };

  const handleReturnToBooking = () => {
    // Navigate back to the home/booking page
    window.location.href = "/";
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      // Time's up - show timeout modal
      setIsTimeoutModalVisible(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    if (!formData.idNumber.trim()) newErrors.idNumber = 'Vui lòng nhập số CMND/CCCD';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'Vui lòng đồng ý với điều khoản';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Mock API call
      setTimeout(() => {
        setIsSubmitting(false);
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen relative">
      {/* Header */}
      <div className="relative flex items-center p-3 border-b border-gray-200 bg-gray-50">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold whitespace-nowrap">
          Nhập thông tin thanh toán
        </div>
        <div className="ml-auto text-base font-medium whitespace-nowrap text-right">
          Ga Nha Trang → Ga Sài Gòn | 11/04/2025
        </div>
      </div>

      {/* Timer */}
      <div className="bg-orange-50 border-b border-orange-200 p-2 flex justify-center items-center text-orange-700">
        <Clock size={16} className="mr-2" />
        <span className="text-sm font-medium">Thời gian còn lại để hoàn tất thanh toán: </span>
        <span className="ml-1 font-bold">{formatTime(timeLeft)}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full p-4 gap-4">
        {/* Left Column - User Information Form */}
        <div className="w-full md:w-3/5">
          <form onSubmit={handleSubmit} className="bg-white p-4 border border-gray-200 rounded shadow-sm">
            <h2 className="text-lg font-bold mb-4">Thông tin người đặt vé</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Nhập họ và tên"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="0912345678"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số CMND/CCCD <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  className={`w-full p-2 border ${errors.idNumber ? 'border-red-500' : 'border-gray-300'} rounded`}
                  placeholder="Nhập số CMND/CCCD"
                />
                {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  placeholder="Thông tin bổ sung (nếu có)"
                ></textarea>
              </div>

              <div className="col-span-2 mt-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={`mt-0.5 mr-2 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-gray-700">
                    Tôi đồng ý với <a href="#" className="text-blue-600 hover:underline">điều khoản và điều kiện</a> đặt vé
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded text-white font-medium text-sm ${
                  isSubmitting ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {isSubmitting ? 'Đang xử lý...' : 'Thanh toán ngay'}
              </button>
            </div>
          </form>

          <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-4">
            <div className="flex items-start">
              <AlertCircle size={18} className="text-blue-600 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-700">Lưu ý quan trọng</h3>
                <ul className="text-xs text-blue-700 mt-1 ml-5 list-disc">
                  <li>Vé sẽ được gửi qua email sau khi thanh toán thành công</li>
                  <li>Vui lòng kiểm tra kỹ thông tin trước khi thanh toán</li>
                  <li>Mang theo giấy tờ tùy thân khi lên tàu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Pricing Information */}
        <div className="w-full md:w-2/5">
          <div className="sticky top-4">
            <div className="bg-white p-4 border border-gray-200 shadow-sm">
              <div className="text-base font-bold mb-3">Thông tin chuyến đi</div>
              
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Tuyến đường:</span>
                  <span className="font-medium">Nha Trang → Sài Gòn</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Tàu:</span>
                  <span className="font-medium">SE7</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Ngày khởi hành:</span>
                  <span className="font-medium">11/04/2025</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Loại toa:</span>
                  <span className="font-medium">{currentCabin?.name}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-2 border-t border-gray-200">
                <div className="text-base font-bold mb-3">Thông tin ghế đã chọn</div>
                <div className="space-y-2">
                  {adultSeats.length > 0 && (
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-sm font-medium">Người lớn ({adultSeats.length})</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {adultSeats.map(seat => (
                          <div key={`adult-${seat.number}`} className="flex justify-between items-center my-1">
                            <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                            <span className="font-medium">{prices.adult.toLocaleString('vi-VN')}đ</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-1 border-t border-blue-200 mt-1">
                          <span>Tổng tiền:</span>
                          <span>{(prices.adult * adultSeats.length).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {childSeats.length > 0 && (
                    <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                      <div className="text-sm font-medium">Trẻ em ({childSeats.length}) <span className="text-green-600 text-xs">-30%</span></div>
                      <div className="text-xs text-gray-600 mt-1">
                        {childSeats.map(seat => (
                          <div key={`child-${seat.number}`} className="flex justify-between items-center my-1">
                            <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                            <span className="font-medium">{prices.child.toLocaleString('vi-VN')}đ</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-1 border-t border-green-200 mt-1">
                          <span>Tổng tiền:</span>
                          <span>{(prices.child * childSeats.length).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {elderlySeats.length > 0 && (
                    <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="text-sm font-medium">Người già ({elderlySeats.length}) <span className="text-green-600 text-xs">-20%</span></div>
                      <div className="text-xs text-gray-600 mt-1">
                        {elderlySeats.map(seat => (
                          <div key={`elderly-${seat.number}`} className="flex justify-between items-center my-1">
                            <span>Chỗ {seat.number}, Toa {getCurrentCoach()}</span>
                            <span className="font-medium">{prices.elderly.toLocaleString('vi-VN')}đ</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-medium pt-1 border-t border-yellow-200 mt-1">
                          <span>Tổng tiền:</span>
                          <span>{(prices.elderly * elderlySeats.length).toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-300">
                <div className="flex justify-between items-center text-sm">
                  <span>Tổng số chỗ:</span>
                  <span className="font-medium">{selectedSeats.length} chỗ</span>
                </div>
                <div className="flex justify-between items-center mt-2 pb-2">
                  <span className="text-base font-bold">Tổng tiền:</span>
                  <span className="font-bold text-orange-600 text-lg">
                    {calculateTotal().toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <div className="text-xs text-gray-500 italic mt-1 text-right">
                  (Đã bao gồm thuế VAT)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeout Modal */}
      {/* Timeout Modal */}
{isTimeoutModalVisible && (
  <div className="fixed inset-0 custom-bg bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div className="text-center">
        <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Hết thời gian thanh toán</h2>
        <p className="text-gray-600 mb-6">
          Thời gian đặt vé của bạn đã hết. Vui lòng thực hiện lại quá trình đặt vé.
        </p>
        <button
          onClick={handleReturnToBooking}
          className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg"
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