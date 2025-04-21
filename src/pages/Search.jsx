import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import axios from 'axios';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    gaDi: "Nha Trang (NTR)",
    gaDen: "Sài Gòn (SGO)",
    ngayKhoiHanh: "2025-04-11"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  // Handle search action
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Extract station codes from the full names if needed
      const gaDi = searchParams.gaDi.split('(')[0].trim();
      const gaDen = searchParams.gaDen.split('(')[0].trim();
      
      // Build the query parameters
      const query = new URLSearchParams();
      if (gaDi) query.append("gaDi", gaDi);
      if (gaDen) query.append("gaDen", gaDen);
      if (searchParams.ngayKhoiHanh) query.append("ngayKhoiHanh", searchParams.ngayKhoiHanh);
      
      // Direct API call
      const response = await axios.get(`http://localhost:8080/api/search?${query.toString()}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
      if (error.response?.data) {
        setError(error.response.data.message || "Đã xảy ra lỗi khi tìm kiếm");
      } else {
        setError(error.message || "Đã xảy ra lỗi khi tìm kiếm");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate()} tháng ${date.getMonth() + 1}`;
  };

  // Format time for display
  const formatTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Search form */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* From station */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Điểm đi</label>
            <div className="flex items-center border border-gray-300 rounded-md hover:border-gray-400 focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-gray-500 bg-gray-50 hover:bg-gray-100">
              <MapPin size={18} className="text-gray-500 ml-3" />
              <input 
                type="text" 
                name="gaDi"
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value={searchParams.gaDi} 
                onChange={handleInputChange}
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
                name="gaDen"
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value={searchParams.gaDen} 
                onChange={handleInputChange}
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
                name="ngayKhoiHanh"
                className="w-full px-3 py-2 border-0 focus:outline-none rounded-md bg-transparent" 
                value={searchParams.ngayKhoiHanh}
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          {/* Search button */}
          <div className="md:col-span-3 flex justify-center md:justify-end">
            <button 
              onClick={handleSearch} 
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition duration-200 w-full md:w-auto h-10 disabled:bg-orange-300">
              {loading ? 'Đang tìm...' : 'Tìm kiếm'}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* No results message */}
      {!loading && searchResults.length === 0 && (
        <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Không tìm thấy chuyến tàu phù hợp với tiêu chí tìm kiếm của bạn.</p>
        </div>
      )}

      {/* Train list */}
      {searchResults.length > 0 && (
        <div className="mt-8 space-y-6">
          {searchResults.map((train, index) => {
            // Calculate duration if available in tuyenDuong
            const duration = train.tuyenDuong?.thoiGianDuKien || "";
            
            // Extract date and time from ngayGioKhoiHanh
            const departureDate = formatDate(train.ngayGioKhoiHanh);
            const departureTime = formatTime(train.ngayGioKhoiHanh);
            
            // For arrival, we'd need actual data. Using placeholder for now.
            const arrivalDate = departureDate; // Placeholder
            const arrivalTime = "00:00"; // Placeholder

            return (
              <div key={index} className="bg-white rounded-lg shadow p-4 md:p-6">
                {/* Desktop layout */}
                <div className="hidden md:flex md:flex-nowrap md:justify-between md:items-center">
                  <div className="w-1/5">
                    <div className="font-semibold text-xl">{train.tenTau}</div>
                    <div className="text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded text-xs mt-2">
                      Còn {train.soGheTrong} chỗ
                    </div>
                  </div>
                  <div className="text-center w-1/5">
                    <div className="text-sm text-gray-600">{train.tuyenDuong?.gaDi || "Ga đi"}</div>
                    <div className="text-xl font-bold">{departureTime}</div>
                    <div className="text-sm text-gray-500">{departureDate}</div>
                  </div>
                  <div className="text-center text-gray-500 w-16">
                    <div>{duration}</div>
                    <div className="text-2xl">→</div>
                  </div>
                  <div className="text-center w-1/5">
                    <div className="text-sm text-gray-600">{train.tuyenDuong?.gaDen || "Ga đến"}</div>
                    <div className="text-xl font-bold">{arrivalTime}</div>
                    <div className="text-sm text-gray-500">{arrivalDate}</div>
                  </div>
                  <div className="text-right w-1/5">
                    <div className="text-sm text-gray-500">Từ</div>
                    <div className="text-orange-600 font-bold text-xl">Liên hệ</div>
                    <button className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
                      Chọn chỗ
                    </button>
                  </div>
                </div>
                
                {/* Mobile layout */}
                <div className="md:hidden">
                  {/* Top section - Train ID and availability */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="font-semibold text-xl">{train.tenTau}</div>
                      <div className="text-orange-600 bg-orange-100 inline-block px-3 py-1 rounded text-xs mt-1">
                        Còn {train.soGheTrong} chỗ
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Từ</div>
                      <div className="text-orange-600 font-bold text-xl">Liên hệ</div>
                    </div>
                  </div>
                  
                  {/* Journey details */}
                  <div className="flex items-center py-4 border-t border-b border-gray-200">
                    <div className="w-4/12 pr-1">
                      <div className="text-sm text-gray-600">{train.tuyenDuong?.gaDi || "Ga đi"}</div>
                      <div className="text-lg font-bold">{departureTime}</div>
                      <div className="text-xs text-gray-500">{departureDate}</div>
                    </div>
                    <div className="w-4/12 flex flex-col items-center px-1">
                      <div className="text-xs text-gray-500 mb-1">{duration}</div>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          →
                        </div>
                      </div>
                    </div>
                    <div className="w-4/12 pl-1 text-right">
                      <div className="text-sm text-gray-600">{train.tuyenDuong?.gaDen || "Ga đến"}</div>
                      <div className="text-lg font-bold">{arrivalTime}</div>
                      <div className="text-xs text-gray-500">{arrivalDate}</div>
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;