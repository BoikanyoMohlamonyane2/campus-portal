import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check, Trash2, Calendar, BookOpen, Wrench, Info } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { Notification } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await markAsRead(id);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteNotification(id);
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.message.toLowerCase().includes('booking')) {
      return <Calendar className="w-5 h-5 text-primary-500" />;
    } else if (notification.message.toLowerCase().includes('class') || notification.message.toLowerCase().includes('schedule')) {
      return <BookOpen className="w-5 h-5 text-secondary-500" />;
    } else if (notification.message.toLowerCase().includes('maintenance')) {
      return <Wrench className="w-5 h-5 text-accent-500" />;
    } else {
      return <Info className="w-5 h-5 text-primary-500" />;
    }
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 animate-fade-in">
      <div className="p-3 bg-primary-50 border-b border-primary-100 flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="w-5 h-5 text-primary-600 mr-2" />
          <h3 className="text-sm font-medium text-primary-900">Notifications</h3>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={() => markAllAsRead()}
            className="text-xs text-primary-600 hover:text-primary-800 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className={`border-b last:border-b-0 ${notification.isRead ? 'bg-white' : 'bg-blue-50'}`}>
                <Link
                  to={notification.link || '#'}
                  className="block p-3 hover:bg-gray-50"
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id);
                    }
                    onClose();
                  }}
                >
                  <div className="flex">
                    <div className="shrink-0 mr-3 mt-0.5">
                      {getNotificationIcon(notification)}
                    </div>
                    <div className="flex-1 pr-6">
                      <p className={`text-sm font-medium ${notification.isRead ? 'text-gray-800' : 'text-primary-800'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(notification.createdAt)}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {!notification.isRead && (
                        <button
                          onClick={(e) => handleMarkAsRead(notification.id, e)}
                          className="text-gray-400 hover:text-primary-600 p-1"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(notification.id, e)}
                        className="text-gray-400 hover:text-error-600 p-1"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-2 bg-gray-50 border-t text-center">
        <Link 
          to="/notifications"
          className="text-xs text-primary-600 hover:text-primary-800 font-medium"
          onClick={onClose}
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;