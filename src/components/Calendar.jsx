import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../components/Header';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 0,
    title: 'Board Meeting',
    start: new Date(2024, 9, 3, 9, 0, 0),
    end: new Date(2024, 9, 3, 12, 0, 0),
  },
  {
    id: 1,
    title: 'Team Lunch',
    start: new Date(2024, 9, 7, 12, 0, 0),
    end: new Date(2024, 9, 7, 13, 0, 0),
  },
];

const Calendar = () => {
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto  rounded-lg shadow-md">
    <Header />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          {moment(date).format('MMMM YYYY')}
        </h2>
      </div>

      <BigCalendar
        localizer={localizer}
        events={events}
        defaultView={view}
        views={['month', 'week', 'day']}
        startAccessor="start"
        endAccessor="end"
        date={date}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        style={{ height: 600 }}
      />
    </div>
  );
};

export default Calendar;
