import  { useState } from 'react';
import DatePicker from 'react-datepicker';

const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <h3 className="font-semibold text-center mb-2">February</h3>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => {
          if (date) setStartDate(date);
        }}
        inline
        calendarStartDay={0}
      />
    </div>
  );
};

export default DateSelector;