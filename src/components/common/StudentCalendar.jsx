import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaPlus } from 'react-icons/fa';

// Mock data for appointments
const mockAppointments = [
  {
    id: '1',
    title: 'Counseling Session',
    start: '2024-04-28T10:00:00',
    end: '2024-04-28T11:00:00',
    backgroundColor: '#184C85',
    borderColor: '#184C85',
  },
  {
    id: '2',
    title: 'Study Skills Workshop',
    start: '2024-04-29T14:00:00',
    end: '2024-04-29T15:30:00',
    backgroundColor: '#184C85',
    borderColor: '#184C85',
  },
];

export default function StudentCalendar() {
  const [events, setEvents] = useState(mockAppointments);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    alert(`Appointment: ${info.event.title}\nTime: ${info.event.start.toLocaleString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#184C85]">My Schedule</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#123a69] transition"
        >
          <FaPlus /> New Appointment
        </button>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        nowIndicator={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        expandRows={true}
        stickyHeaderDates={true}
        dayHeaderFormat={{ weekday: 'long' }}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
        }}
        // Custom styling
        eventClassNames="cursor-pointer"
        dayCellClassNames="hover:bg-gray-50"
        moreLinkClassNames="text-[#184C85] hover:text-[#123a69]"
        // Custom colors
        eventBackgroundColor="#184C85"
        eventBorderColor="#184C85"
        todayBackgroundColor="#f0f7ff"
      />

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#184C85] mb-4">
              Schedule New Appointment
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  value={selectedDate || ''}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]">
                  <option value="counseling">Counseling Session</option>
                  <option value="workshop">Workshop</option>
                  <option value="group">Group Session</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#123a69]"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 