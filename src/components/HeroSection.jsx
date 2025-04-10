import React from 'react'
import { useState } from 'react';
import { Search, ChevronRight, Phone, Calendar, Train, Users, MapPin, ArrowRight, Plus, Minus } from 'lucide-react';

const HeroSection = ({banner}) => {
    const [ticketCount, setTicketCount] = useState(1);
  
  const handleTicketIncrement = () => {
    setTicketCount(prev => prev + 1);
  };

  const handleTicketDecrement = () => {
    setTicketCount(prev => prev > 1 ? prev - 1 : 1);
  };
  return (
    <>
        <div 
        className="relative py-16 px-4 md:px-8 lg:px-12 flex items-center"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Đặt vé tàu hỏa online</h2>
            <p className="text-white text-lg">Nhận ngay vé điện tử, không cần ra ga đổi vé!</p>
          </div>
          
          <div className="relative z-10 w-full flex flex-col md:flex-row items-center">
            {/* Left side - Booking Form */}
            <div className="md:w-3/5 lg:w-1/2">
              <div className="custom-bg rounded-lg shadow-xl p-4" >
                {/* From & To */}
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="border border-gray-300 rounded-md p-2 flex items-center bg-white bg-opacity-50 shadow-sm hover:border-gray-400 hover:bg-opacity-60 transition duration-200">
                    <MapPin size={18} className="text-gray-500 mr-2" />
                    <div className="w-full">
                      <label className="text-xs text-gray-500 block">Ga đi</label>
                      <input 
                        type="text" 
                        defaultValue="Sài Gòn (SGO)" 
                        className="font-medium text-sm w-full outline-none text-gray-700 bg-transparent"
                      />
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded-md p-2 flex items-center bg-white bg-opacity-50 shadow-sm hover:border-gray-400 hover:bg-opacity-60 transition duration-200">
                    <MapPin size={18} className="text-gray-500 mr-2" />
                    <div className="w-full">
                      <label className="text-xs text-gray-500 block">Ga đến</label>
                      <input 
                        type="text" 
                        defaultValue="Nha Trang (NTR)" 
                        className="font-medium text-sm w-full outline-none text-gray-700 bg-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Ticket quantity */}
                <div className="flex mb-2">
                  <div className="border border-gray-300 rounded-md p-2 w-full flex items-center bg-white bg-opacity-50 shadow-sm hover:border-gray-400 hover:bg-opacity-60 transition duration-200">
                    <Users size={18} className="text-gray-500 mr-2" />
                    <div className="w-full flex items-center justify-between">
                      <div>
                        <label className="text-xs text-gray-500 block">Số lượng vé</label>
                        <span className="font-medium text-sm text-gray-700">{ticketCount} vé</span>
                      </div>
                      <div className="flex items-center bg-gray-100 bg-opacity-70 rounded-md">
                        <button 
                          onClick={handleTicketDecrement}
                          className="p-1 rounded-l-md hover:bg-gray-200 transition duration-200"
                          aria-label="Giảm số lượng vé"
                        >
                          <Minus size={16} className="text-gray-600" />
                        </button>
                        <span className="mx-2 font-medium text-gray-700">{ticketCount}</span>
                        <button 
                          onClick={handleTicketIncrement}
                          className="p-1 rounded-r-md hover:bg-gray-200 transition duration-200"
                          aria-label="Tăng số lượng vé"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Date and Search Button */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-300 rounded-md p-2 flex items-center bg-white bg-opacity-50 shadow-sm hover:border-gray-400 hover:bg-opacity-60 transition duration-200">
                    <Calendar size={18} className="text-gray-500 mr-2" />
                    <div className="w-full">
                      <label className="text-xs text-gray-500 block">Ngày đi</label>
                      <input 
                        type="date" 
                        className="font-medium text-sm w-full outline-none text-gray-700 bg-transparent"
                      />
                    </div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition duration-200 flex items-center justify-center h-full shadow-md hover:shadow-lg">
                    <span className="mr-2">Tìm chuyến tàu</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
