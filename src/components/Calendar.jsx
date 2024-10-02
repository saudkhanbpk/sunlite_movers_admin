import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderCells = () => {
    const cells = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          row.push(<td key={`empty-${j}`} className="p-2"></td>);
        } else if (day > daysInMonth) {
          row.push(<td key={`empty-end-${j}`} className="p-2"></td>);
        } else {
          const currentDay = day;
          row.push(
            <td key={day} className="p-2 border-t">
              <div className="flex flex-col h-24">
                <span className="text-sm">{currentDay}</span>
                {currentDay === 15 && (
                  <div className="text-xs">
                    <div className="bg-blue-100 p-1 mb-1">Task due at 3 PM</div>
                    {/* <div className="bg-red-100 p-1 mb-1">Meeting with team</div>
                    <div className="bg-green-100 p-1">Call with client</div> */}
                  </div>
                )}
              </div>
            </td>
          );
          day++;
        }
      }
      cells.push(<tr key={i}>{row}</tr>);
      if (day > daysInMonth) break;
    }
    return cells;
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {DAYS.map(day => (
              <th key={day} className="p-2 border-b">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderCells()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;