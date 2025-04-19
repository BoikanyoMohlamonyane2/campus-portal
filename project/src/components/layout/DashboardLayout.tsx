import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, BookOpen, Wrench, Bell, Settings, ChevronRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Define sidebar navigation items based on user role
  const getNavItems = () => {
    const items = [
      {
        path: '/dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        path: '/bookings',
        label: 'Room Bookings',
        icon: <Calendar className="w-5 h-5" />,
      },
      {
        path: '/schedule',
        label: 'Timetable',
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        path: '/maintenance',
        label: 'Maintenance',
        icon: <Wrench className="w-5 h-5" />,
      },
      {
        path: '/announcements',
        label: 'Announcements',
        icon: <Bell className="w-5 h-5" />,
      },
    ];

    // Add admin-specific items
    if (user?.role === 'admin') {
      items.push({
        path: '/admin',
        label: 'Admin Panel',
        icon: <Settings className="w-5 h-5" />,
      });
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <aside
          className={`hidden md:block bg-white border-r transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              <ChevronRight className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <nav className="px-3 py-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="shrink-0">{item.icon}</div>
                    {isSidebarOpen && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile sidebar toggle button */}
        <div className="md:hidden fixed bottom-6 left-6 z-20">
          <button
            onClick={toggleMobileSidebar}
            className="bg-primary-600 text-white p-3 rounded-full shadow-lg"
          >
            {isMobileSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-10 md:hidden">
            <div
              className="absolute inset-0 bg-gray-800 bg-opacity-50"
              onClick={closeMobileSidebar}
            ></div>
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-slide-in">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </span>
                    <span className="font-bold text-lg">SmartCampus</span>
                  </div>
                  <button onClick={closeMobileSidebar} className="text-gray-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <nav className="px-3 py-4">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={closeMobileSidebar}
                      >
                        <div className="shrink-0">{item.icon}</div>
                        <span className="ml-3 text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 bg-gray-50">
          <div className="p-4 sm:p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;