import React from 'react'
import { Search, ChevronRight, Phone, Calendar, Train, Users, MapPin } from 'lucide-react';
const BenefitsSection = () => {
  return (
    <div className="">
        <div className="container mx-auto px-4 pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="">
                <Search className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Tìm chuyến tàu phù hợp</h3>
                <p className="text-gray-600">Lựa chọn lịch trình linh hoạt</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-blue-500 mr-3">
                <Train className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Đặt vé nhanh, dễ dàng</h3>
                <p className="text-gray-600">Nhận vé ngay sau khi đặt</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="text-blue-500 mr-3">
                <Phone className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Luôn sẵn sàng hỗ trợ</h3>
                <p className="text-gray-600">Phản hồi trong 15 phút qua điện thoại, zalo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BenefitsSection
