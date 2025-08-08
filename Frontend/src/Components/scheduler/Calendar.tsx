// src/Components/scheduler/Calendar.tsx
import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  // initialize once to the start of the month of the selected date
  const [currentMonth, setCurrentMonth] = useState(
    () => startOfMonth(selectedDate)
  );

  const prevMonth = () => setCurrentMonth(m => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth(m => addMonths(m, 1));

  const renderHeader = () => (
    <div className="flex items-center justify-between px-4 mb-2">
      <button onClick={prevMonth} className="text-blue-500 text-lg">‹</button>
      <div className="text-md font-semibold">
        {format(currentMonth, 'MMMM yyyy')}
      </div>
      <button onClick={nextMonth} className="text-blue-500 text-lg">›</button>
    </div>
  );

  const renderDays = () => {
    const weekStart = startOfWeek(currentMonth, { weekStartsOn: 0 });
    return (
      <div className="grid grid-cols-7 mb-2 text-sm font-medium text-gray-600">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-center">
            {format(addDays(weekStart, i), 'EEEEE')}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd   = endOfMonth(monthStart);
    const gridStart  = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd    = endOfWeek(monthEnd,   { weekStartsOn: 0 });

    const rows: React.ReactNode[] = [];
    let days: React.ReactNode[] = [];
    let day = gridStart;

    while (day <= gridEnd) {
      for (let i = 0; i < 7; i++) {
      const cellDay     = day;
      const isToday     = isSameDay(cellDay, new Date());
      const isOtherMonth= !isSameMonth(cellDay, monthStart);
      const isSelected  = isSameDay(cellDay, selectedDate);


        days.push(
          <div
           key={cellDay.toString()}
           onClick={() => {
            onDateChange(cellDay);
            if (isOtherMonth) setCurrentMonth(startOfMonth(cellDay));
            }}
            className={`
              text-center py-1 cursor-pointer rounded-full transition-all
              ${isOtherMonth ? 'text-gray-300' : 'text-gray-800'}
              ${isToday ? 'border border-blue-400' : ''}
              ${isSelected ? 'bg-blue-500 text-white' : ''}
            `}
          >
            {format(cellDay, 'd')}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm w-full">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;