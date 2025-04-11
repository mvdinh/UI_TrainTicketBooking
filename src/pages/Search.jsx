import React from 'react'
import { MapPin, Calendar } from 'lucide-react'

const Search = () => {
  // Sample train data
  const trainData = [
    {
      id: "SE11",
      availableSeats: 96,
      departure: {
        station: "Ga Nha Trang",
        time: "03:00",
        date: "11 tháng 04"
      },
      arrival: {
        station: "Ga Sài Gòn",
        time: "11:30",
        date: "11 tháng 04"
      },
      duration: "8h30p",
      price: "459.000"
    },
    {
      id: "SE7",
      availableSeats: 52,
      departure: {
        station: "Ga Nha Trang",
        time: "19:20",
        date: "11 tháng 04"
      },
      arrival: {
        station: "Ga Sài Gòn",
        time: "04:15",
        date: "12 tháng 04"
      },
      duration: "8h55p",
      price: "375.000"
    },
    {
      id: "SE3",
      availableSeats: 78,
      departure: {
        station: "Ga Nha Trang",
        time: "06:45",
        date: "11 tháng 04"
      },
      arrival: {
        station: "Ga Sài Gòn",
        time: "15:20",
        date: "11 tháng 04"
      },
      duration: "8h35p",
      price: "425.000"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Improved search form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From station */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đi</label>
            <div className="flex items-center border border-gray-300 rounded-md hover:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-500 bg-gray-50 hover:bg-gray-100">
              <MapPin size={18} className="text-gray-500 ml-3" />
              <input 
                type="text" 
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value="Nha Trang (NTR)" 
                readOnly 
              />
            </div>
          </div>
          
          {/* To station */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đến</label>
            <div className="flex items-center border border-gray-300 rounded-md hover:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-500 bg-gray-50 hover:bg-gray-100">
              <MapPin size={18} className="text-gray-500 ml-3" />
              <input 
                type="text" 
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value="Sài Gòn (SGO)" 
                readOnly 
              />
            </div>
          </div>
          
          {/* Date selection */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
            <div className="flex items-center border border-gray-300 rounded-md hover:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-500 bg-gray-50 hover:bg-gray-100">
              <Calendar size={18} className="text-gray-500 ml-3" />
              <input 
                type="date" 
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value="2025-04-11" 
              />
            </div>
          </div>
          
          {/* Search button */}
          <div className="md:col-span-3 flex justify-center md:justify-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition duration-200 w-full md:w-auto h-10">
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>

      {/* Train list - improved responsive design with data mapping */}
      <div className="mt-8 space-y-6">
        {trainData.map((train, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 md:p-6">
            {/* Desktop layout */}
            <div className="hidden md:flex md:flex-nowrap md:justify-between md:items-center">
              <div className="w-1/5">
                <div className="font-semibold text-xl">{train.id}</div>
                <div className="text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded text-xs mt-2">
                  Còn {train.availableSeats} chỗ
                </div>
              </div>
              <div className="text-center w-1/5">
                <div className="text-sm text-gray-600">{train.departure.station}</div>
                <div className="text-xl font-bold">{train.departure.time}</div>
                <div className="text-sm text-gray-500">{train.departure.date}</div>
              </div>
              <div className="text-center text-gray-500 w-16">
                <div>{train.duration}</div>
                <div className="text-2xl">→</div>
              </div>
              <div className="text-center w-1/5">
                <div className="text-sm text-gray-600">{train.arrival.station}</div>
                <div className="text-xl font-bold">{train.arrival.time}</div>
                <div className="text-sm text-gray-500">{train.arrival.date}</div>
              </div>
              <div className="text-right w-1/5">
                <div className="text-sm text-gray-500">Từ</div>
                <div className="text-orange-600 font-bold text-xl">{train.price} đ</div>
                <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                  Chọn chỗ
                </button>
              </div>
            </div>
            
            {/* Mobile layout - improved width */}
            <div className="md:hidden">
              {/* Top section - Train ID and availability */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="font-semibold text-xl">{train.id}</div>
                  <div className="text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded text-xs mt-1">
                    Còn {train.availableSeats} chỗ
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Từ</div>
                  <div className="text-orange-600 font-bold text-xl">{train.price} đ</div>
                </div>
              </div>
              
              {/* Journey details */}
              <div className="flex items-center py-4 border-t border-b border-gray-200">
                <div className="w-4/12 pr-1">
                  <div className="text-sm text-gray-600">{train.departure.station}</div>
                  <div className="text-lg font-bold">{train.departure.time}</div>
                  <div className="text-xs text-gray-500">{train.departure.date}</div>
                </div>
                <div className="w-4/12 flex flex-col items-center px-1">
                  <div className="text-xs text-gray-500 mb-1">{train.duration}</div>
                  <div className="w-full h-px bg-gray-300 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                     
                    </div>
                  </div>
                </div>
                <div className="w-4/12 pl-1 text-right">
                  <div className="text-sm text-gray-600">{train.arrival.station}</div>
                  <div className="text-lg font-bold">{train.arrival.time}</div>
                  <div className="text-xs text-gray-500">{train.arrival.date}</div>
                </div>
              </div>
              
              {/* Button section */}
              <div className="mt-4 flex justify-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded w-full sm:w-auto">
                  Chọn chỗ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search