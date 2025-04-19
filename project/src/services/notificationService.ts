import { Notification } from '../types';

// Mock notification data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Room Booking Confirmed',
    message: 'Your booking for Room 101 has been confirmed for tomorrow at 2:00 PM.',
    type: 'success',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    link: '/bookings/1'
  },
  {
    id: '2',
    userId: '1',
    title: 'Class Schedule Updated',
    message: 'Your Computer Science class has been moved to Room 203.',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    link: '/schedule'
  },
  {
    id: '3',
    userId: '2',
    title: 'New Maintenance Request',
    message: 'A new maintenance request has been submitted for your department.',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    link: '/maintenance/5'
  },
  {
    id: '4',
    userId: '3',
    title: 'System Maintenance',
    message: 'The system will be down for maintenance tonight from 2:00 AM to 4:00 AM.',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 14400000).toISOString()
  }
];

// Mock notification service functions
const getUserNotifications = (userId: string): Promise<Notification[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const userNotifications = MOCK_NOTIFICATIONS.filter(
        notification => notification.userId === userId
      );
      resolve(userNotifications);
    }, 500);
  });
};

const markAsRead = (id: string): Promise<void> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the database
      resolve();
    }, 300);
  });
};

const markAllAsRead = (userId: string): Promise<void> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the database
      resolve();
    }, 300);
  });
};

const deleteNotification = (id: string): Promise<void> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the database
      resolve();
    }, 300);
  });
};

export const notificationService = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
};