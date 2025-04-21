import { useState, useEffect } from 'react';
import { Clock, CheckCircle, HelpCircle, Phone, Download, Train, Copy } from 'lucide-react';

export default function TrainBookingPayment() {
  const [timeRemaining, setTimeRemaining] = useState({ minutes: 28, seconds: 34 });
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  
  // Booking data
  const bookingData = {
    bookingId: 'VTL0015626',
    paymentDetails: {
      totalAmount: 404000,
      currency: 'VND',
      paymentMethod: 'bankTransfer',
      isFeeExempt: true,
      paymentStatus: 'pending',
      paymentBreakdown: {
        ticketPrice: 393000,
        insuranceFee: 1000,
        serviceFee: 10000,
        processingFee: 0
      }
    },
    journeyDetails: {
      trainNumber: 'SE7',
      departureStation: 'Ga Nha Trang',
      arrivalStation: 'Ga Sài Gòn',
      departureTime: '09:53',
      departureDate: 'Thứ 2, 14/04',
      arrivalTime: '18:10',
      arrivalDate: 'Thứ 2, 14/04',
    },
    bankTransferDetails: {
      bankName: 'Vietcombank - Ngân hàng TMCP Ngoại thương VN',
      accountNumber: '007 1000 895 230',
      accountHolder: 'Công ty Cổ Phần iMVU.COM',
      transferAmount: 404000,
      reference: 'VTL0015626'
    }
  };
  
  // Timer countdown effect
  useEffect(() => {
    if (timeRemaining.minutes === 0 && timeRemaining.seconds === 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining]);
  
  const handlePaymentConfirmation = () => {
    setPaymentCompleted(true);
    // Here you would typically call your API to confirm payment
  };
  
  // Format number with thousand separators
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="bg-gray-100 p-2">
      <div className="max-w-6xl mx-auto">
        {/* Header with total and time remaining */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg">
            <span className="text-gray-700">Tổng tiền: </span>
            <span className="text-orange-500 font-bold text-2xl">{formatNumber(bookingData.paymentDetails.totalAmount)} đ</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Thời gian giữ vé còn lại: </span>
            <Clock className="text-orange-500 h-5 w-5 mr-1" />
            <span className="text-orange-500 font-bold">{timeRemaining.minutes}:{timeRemaining.seconds < 10 ? '0' : ''}{timeRemaining.seconds}</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex flex-row gap-4">
          {/* Payment section */}
          <div className="bg-white rounded-lg p-3 shadow-sm w-2/3">
            <div className="flex items-center mb-2">
              <CheckCircle className="text-teal-500 h-5 w-5 mr-2" />
              <span className="text-teal-500 font-medium text-lg">Chuyển khoản ngân hàng</span>
              <span className="text-gray-500 ml-2 text-sm">(Miễn phí tiện ích)</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="bg-yellow-50 p-3 rounded-lg mb-2">
                <p className="text-gray-700">
                  Chuyển khoản với nội dung <strong>{bookingData.bookingId}</strong> đã hoàn tất.
                  Vé điện tử sẽ được gửi qua email và SMS sau khi xác nhận.
                </p>
              </div>
              
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-blue-800 mb-2">{bookingData.bankTransferDetails.bankName}</h3>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="text-gray-600 text-sm">Số tài khoản:</div>
                      <div className="flex items-center">
                        <span className="text-blue-800 font-medium">{bookingData.bankTransferDetails.accountNumber}</span>
                        <button className="ml-1 text-gray-400">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-600 text-sm">Người thụ hưởng:</div>
                      <div className="flex items-center">
                        <span className="text-blue-800 font-medium">{bookingData.bankTransferDetails.accountHolder}</span>
                        <button className="ml-1 text-gray-400">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-600 text-sm">Số tiền:</div>
                      <div className="flex items-center">
                        <span className="text-blue-800 font-medium">{formatNumber(bookingData.paymentDetails.totalAmount)} đ</span>
                        <button className="ml-1 text-gray-400">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-gray-600 text-sm">Nội dung:</div>
                      <div className="flex items-center">
                        <span className="text-blue-800 font-medium">{bookingData.bookingId}</span>
                        <button className="ml-1 text-gray-400">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handlePaymentConfirmation} 
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg mt-4 w-full"
                  >
                    Tôi đã chuyển khoản
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="mb-2 text-gray-600 text-sm text-center">
                    hoặc mở App ngân hàng<br />để quét mã QR code thanh toán
                  </div>
                  <div className="text-blue-500 text-sm mb-2 text-center flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Hướng dẫn sử dụng
                  </div>
                  
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <img src="/api/placeholder/40/30" alt="ICHU" className="h-8" />
                    <div className="h-8 border-r border-gray-300"></div>
                    <img src="/api/placeholder/80/30" alt="napas 24/7" className="h-8" />
                    <div className="h-8 border-r border-gray-300"></div>
                    <img src="/api/placeholder/80/30" alt="Vietcombank" className="h-8" />
                  </div>
                  
                  <div className="border-2 border-gray-300 rounded-lg p-2 relative mb-2">
                    <div className="w-48 h-48 flex items-center justify-center bg-white">
                      <img src="/api/placeholder/160/160" alt="QR Code" className="max-w-full" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-500 mb-1">
                      Scan to Pay
                    </div>
                  </div>
                  
                  <button className="text-blue-500 flex items-center text-sm">
                    <Download className="h-4 w-4 mr-1" />
                    Lưu mã để thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking information */}
          <div className="bg-white rounded-lg p-3 shadow-sm w-1/3">
            <div className="mb-2">
              <span className="text-gray-700">Booking: </span>
              <span className="text-blue-500 font-medium">{bookingData.bookingId}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between items-center mb-1">
                <div>{bookingData.journeyDetails.departureStation} <span className="text-gray-400">→</span> {bookingData.journeyDetails.arrivalStation}</div>
                <div className="font-medium">{bookingData.journeyDetails.trainNumber}</div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-medium">{bookingData.journeyDetails.departureTime}</div>
                <div className="flex items-center">
                  <Train className="mx-2 text-gray-600" size={20} />
                </div>
                <div className="text-xl font-medium">{bookingData.journeyDetails.arrivalTime}</div>
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <div className="text-gray-600">{bookingData.journeyDetails.departureDate}</div>
                <div className="text-gray-600">{bookingData.journeyDetails.arrivalDate}</div>
              </div>
              
              <div className="space-y-1 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <div>Tổng tiền vé</div>
                  <div className="text-right">{formatNumber(bookingData.paymentDetails.paymentBreakdown.ticketPrice)}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center">
                    Phí bảo hiểm
                    <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                  </div>
                  <div className="text-right">+ {formatNumber(bookingData.paymentDetails.paymentBreakdown.insuranceFee)}</div>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center">
                    Phí dịch vụ
                    <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                  </div>
                  <div className="text-right">+ {formatNumber(bookingData.paymentDetails.paymentBreakdown.serviceFee)}</div>
                </div>
                
                <div className="flex justify-between">
                  <div>Phí tiện ích</div>
                  <div className="text-right text-green-600">Miễn phí</div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">Tổng tiền</div>
                  <div className="text-orange-500 text-xl font-bold">{formatNumber(bookingData.paymentDetails.totalAmount)} đ</div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-center text-blue-500">
                <div className="mr-2">Cần hỗ trợ, gọi ngay</div>
                <div className="flex items-center font-medium">
                  <Phone className="h-4 w-4 mr-1" />
                  1900 2087
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}