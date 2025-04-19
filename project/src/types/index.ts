export type UserRole = 'student' | 'lecturer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: number;
  type: 'classroom' | 'meeting' | 'lab' | 'study';
  facilities: string[];
  image?: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string; // ISO date string
  startTime: string; // 24hr format HH:MM
  endTime: string; // 24hr format HH:MM
  purpose: string;
  attendees: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  createdAt: string; // ISO date string
}

export interface ClassSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  roomId: string;
  lecturerId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // 24hr format HH:MM
  endTime: string; // 24hr format HH:MM
  semester: string;
  year: number;
}

export interface MaintenanceIssue {
  id: string;
  reporterId: string;
  roomId: string;
  title: string;
  description: string;
  category: 'electrical' | 'plumbing' | 'furniture' | 'cleaning' | 'it' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'reported' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
  assignedTo?: string;
  reportedAt: string; // ISO date string
  resolvedAt?: string; // ISO date string
  images?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string; // ISO date string
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  target: UserRole[];
  important: boolean;
  publishedAt: string; // ISO date string
  expiresAt?: string; // ISO date string
}