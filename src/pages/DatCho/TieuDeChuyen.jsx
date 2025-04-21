// components/TieuDeChuyen.jsx
export default function TieuDeChuyen({ trainData }) {
    return (
      <div className="relative flex items-center p-3 border-b border-gray-200 bg-gray-50">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold whitespace-nowrap">
          {trainData.tenTau}
        </div>
        <div className="ml-auto text-base font-medium whitespace-nowrap text-right">
          {trainData.tuyenDuong.gaDi} → {trainData.tuyenDuong.gaDen} | {new Date(trainData.ngayGioKhoiHanh).toLocaleDateString('vi-VN')}
        </div>
      </div>
    );
  }