import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPlus, FaClock, FaUser } from "react-icons/fa";

// Mock data for appointments
const mockAppointments = [
  {
    id: "1",
    title: "John Doe - Counseling Session",
    start: "2025-05-28T10:00:00",
    end: "2025-05-28T11:00:00",
    backgroundColor: "#184C85",
    borderColor: "#184C85",
    extendedProps: {
      studentId: "1",
      status: "confirmed",
      type: "counseling",
    },
  },
  {
    id: "2",
    title: "Jane Smith - Study Skills Workshop",
    start: "2025-05-29T14:00:00",
    end: "2025-05-29T15:30:00",
    backgroundColor: "#184C85",
    borderColor: "#184C85",
    extendedProps: {
      studentId: "2",
      status: "pending",
      type: "workshop",
    },
  },
];

// Mock data for students
const mockStudents = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
];

export default function CounselorCalendar() {
  const [events, setEvents] = useState(mockAppointments);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowModal(true);
  };

  const handleAvailabilityClick = () => {
    setShowAvailabilityModal(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className="p-1">
        <div className="font-medium">{eventInfo.event.title}</div>
        <div className="text-xs flex items-center gap-1">
          <FaClock className="text-gray-500" />
          {eventInfo.timeText}
        </div>
        {eventInfo.event.extendedProps.status === "pending" && (
          <div className="text-xs text-yellow-600 mt-1">
            Pending Confirmation
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#184C85]">
          Appointment Schedule
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handleAvailabilityClick}
            className="flex items-center gap-2 px-4 py-2 border border-[#184C85] text-[#184C85] rounded-lg hover:bg-[#184C85] hover:text-white transition"
          >
            <FaClock /> Set Availability
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#123a69] transition"
          >
            <FaPlus /> New Appointment
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
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
        eventContent={renderEventContent}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        allDaySlot={false}
        slotDuration="00:30:00"
        expandRows={true}
        stickyHeaderDates={true}
        dayHeaderFormat={{ weekday: "long" }}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        eventClassNames="cursor-pointer"
        dayCellClassNames="hover:bg-gray-50"
        moreLinkClassNames="text-[#184C85] hover:text-[#123a69]"
        eventBackgroundColor="#184C85"
        eventBorderColor="#184C85"
        todayBackgroundColor="#f0f7ff"
      />

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#184C85] mb-4">
              {selectedEvent ? "Edit Appointment" : "Schedule New Appointment"}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]">
                  {mockStudents.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                  value={selectedDate || ""}
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
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]">
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
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
                  onClick={() => {
                    setShowModal(false);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#123a69]"
                >
                  {selectedEvent ? "Update" : "Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Availability Modal */}
      {showAvailabilityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-h-[80vh] max-w-md overflow-y-auto">
            <h3 className="text-lg font-semibold text-[#184C85] mb-4">
              Set Weekly Availability
            </h3>
            <form className="space-y-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day) => (
                  <div key={day} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-medium text-gray-700">{day}</label>
                      <input
                        type="checkbox"
                        className="form-checkbox text-[#184C85]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">
                          Start Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">
                          End Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#184C85]"
                        />
                      </div>
                    </div>
                  </div>
                )
              )}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAvailabilityModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#184C85] text-white rounded-lg hover:bg-[#123a69]"
                >
                  Save Availability
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
