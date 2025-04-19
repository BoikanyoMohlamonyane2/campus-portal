import { Room, Booking } from '../types';

// Mock room data
const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Room 101',
    capacity: 30,
    building: 'Main Building',
    floor: 1,
    type: 'classroom',
    facilities: ['projector', 'whiteboard', 'air conditioning'],
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    name: 'Conference Room A',
    capacity: 15,
    building: 'Admin Block',
    floor: 2,
    type: 'meeting',
    facilities: ['video conferencing', 'smart board', 'coffee machine'],
    image: 'https://images.pexels.com/photos/260928/pexels-photo-260928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    name: 'Computer Lab 1',
    capacity: 25,
    building: 'Science Block',
    floor: 1,
    type: 'lab',
    facilities: ['computers', 'specialized software', 'printer'],
    image: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    name: 'Study Room 3',
    capacity: 8,
    building: 'Library',
    floor: 3,
    type: 'study',
    facilities: ['quiet space', 'power outlets', 'WiFi'],
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    name: 'Lecture Hall B',
    capacity: 120,
    building: 'Arts Block',
    floor: 1,
    type: 'classroom',
    facilities: ['tiered seating', 'sound system', 'large screen'],
    image: 'https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock booking data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    roomId: '1',
    userId: '1',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Study group session',
    attendees: 5,
    status: 'approved',
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '2',
    roomId: '2',
    userId: '2',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '10:00',
    endTime: '11:30',
    purpose: 'Department meeting',
    attendees: 8,
    status: 'approved',
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

// Room service functions
const getAllRooms = (): Promise<Room[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      resolve(MOCK_ROOMS);
    }, 500);
  });
};

const getRoomById = (id: string): Promise<Room | undefined> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const room = MOCK_ROOMS.find(room => room.id === id);
      resolve(room);
    }, 300);
  });
};

const checkRoomAvailability = (
  roomId: string,
  date: string,
  startTime: string,
  endTime: string
): Promise<boolean> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const bookingsForRoom = MOCK_BOOKINGS.filter(
        booking =>
          booking.roomId === roomId &&
          booking.date === date &&
          booking.status !== 'cancelled' &&
          booking.status !== 'rejected'
      );

      // Check if any booking overlaps with the requested time
      const hasOverlap = bookingsForRoom.some(booking => {
        return (
          (startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime) ||
          (startTime <= booking.startTime && endTime >= booking.endTime)
        );
      });

      resolve(!hasOverlap);
    }, 300);
  });
};

const createBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // In a real app, this would add to the database
      resolve(newBooking);
    }, 500);
  });
};

const getUserBookings = (userId: string): Promise<Booking[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const userBookings = MOCK_BOOKINGS.filter(booking => booking.userId === userId);
      resolve(userBookings);
    }, 500);
  });
};

export const roomService = {
  getAllRooms,
  getRoomById,
  checkRoomAvailability,
  createBooking,
  getUserBookings
};