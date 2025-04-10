import React from 'react'

const ListTicket = ({routes}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {routes.map((route, index) => (
            <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-3 w-[330px] mx-auto shadow-sm"
            >

              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold text-lg">{route.from}</div>
                <div className="flex items-center px-3">
                  <span className="text-sm text-gray-500 mx-2">{route.duration}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="font-semibold text-lg">{route.to}</div>
              </div>

              <div className="text-sm text-center text-gray-500 mb-4">{route.flightCode}</div>
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-teal-500">{route.price}</div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-md">
                  Xem
                </button>
              </div>
            </div>
          ))}
        </div>
  )
}

export default ListTicket
