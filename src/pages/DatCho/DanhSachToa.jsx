// components/DanhSachToa.jsx
export default function DanhSachToa({ trainData, selectedCabin, setSelectedCabin }) {
    return (
      <div className="mb-4">
        <div className="text-base font-medium mb-2">Chọn toa tàu:</div>
        
        <div className="flex items-start">
          <div className="flex-1 overflow-x-auto">
            <div className="flex space-x-2 pb-2 min-w-max">
              {trainData.danhSachToaTau.map((toa) => (
                <button
                  key={toa.maToa}
                  className={`flex-shrink-0 min-w-36 w-36 py-2 px-3 border text-sm ${
                    selectedCabin === toa.maToa
                      ? 'bg-blue-50 border-blue-500'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedCabin(toa.maToa)}
                >
                  <div className="text-xs font-medium truncate">{toa.tenToa}</div>
                  <div className="text-xs text-gray-500">
                    Còn {toa.danhSachGhe.filter(ghe => ghe.trangThai === "Trống").length} chỗ | {toa.tenLoaiCho}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 mr-2">
            <img
              src="https://res.ivivu.com/train/images/trainlist/head-train-desktop.svg"
              alt="Đầu tàu"
              className="w-22 ml-2 object-contain"
            />
          </div>
        </div>
      </div>
    );
  }