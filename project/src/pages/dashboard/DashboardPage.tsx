import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, Wrench, Bell, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import { roomService } from '../../services/roomService';
import { maintenanceService } from '../../services/maintenanceService';
import { Booking, MaintenanceIssue } from '../../types';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [maintIssues, setMaintIssues] = useState<MaintenanceIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          const [bookings, issues] = await Promise.all([
            roomService.getUserBookings(user.id),
            maintenanceService.getUserIssues(user.id)
          ]);
          
          setUpcomingBookings(bookings);
          setMaintIssues(issues);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [user]);

  const renderWelcomeMessage = () => {
    const currentHour = new Date().getHours();
    let greeting = 'Good evening';
    
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    }
    
    return (
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {greeting}, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of your campus activities and services.
        </p>
      </div>
    );
  };

  const renderQuickActions = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Link to="/bookings">
        <Card className="hover:border-primary-300 hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-medium">Room Booking</h3>
              <p className="text-sm text-gray-500">Book a room</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/schedule">
        <Card className="hover:border-secondary-300 hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-secondary-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <h3 className="font-medium">Class Schedule</h3>
              <p className="text-sm text-gray-500">View timetable</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/maintenance">
        <Card className="hover:border-accent-300 hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-accent-100 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <h3 className="font-medium">Maintenance</h3>
              <p className="text-sm text-gray-500">Report an issue</p>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/announcements">
        <Card className="hover:border-success-300 hover:shadow-md transition-all">
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="bg-success-100 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <h3 className="font-medium">Announcements</h3>
              <p className="text-sm text-gray-500">Campus updates</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );

  return (
    <div>
      {renderWelcomeMessage()}
      
      {renderQuickActions()}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Upcoming Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="bg-gray-200 h-12 w-12 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    <div className="bg-primary-50 text-primary-700 p-2 rounded-md flex flex-col items-center justify-center min-w-[60px]">
                      <span className="text-sm font-medium">
                        {format(new Date(booking.date), 'MMM')}
                      </span>
                      <span className="text-xl font-bold">
                        {format(new Date(booking.date), 'd')}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">Room Booking</h4>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="mt-2">
                        <span className={`badge ${
                          booking.status === 'approved' 
                            ? 'badge-success' 
                            : booking.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">No upcoming bookings</p>
                <Link to="/bookings/new">
                  <Button variant="outline" size="sm">Book a Room</Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/bookings" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View all bookings
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>

        {/* Maintenance Issues */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wrench className="w-5 h-5 mr-2 text-accent-600" />
              Maintenance Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="bg-gray-200 h-12 w-12 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : maintIssues.length > 0 ? (
              <div className="space-y-4">
                {maintIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                  >
                    <div className={`
                      p-2 rounded-md flex items-center justify-center min-w-[40px]
                      ${issue.priority === 'urgent' 
                        ? 'bg-error-50 text-error-700' 
                        : issue.priority === 'high'
                        ? 'bg-warning-50 text-warning-700'
                        : 'bg-accent-50 text-accent-700'
                      }
                    `}>
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{issue.title}</h4>
                      <div className="text-sm text-gray-600 mt-1">
                        {issue.category.charAt(0).toUpperCase() + issue.category.slice(1)}
                      </div>
                      <div className="mt-2 flex space-x-2">
                        <span className={`badge ${
                          issue.status === 'resolved' || issue.status === 'closed'
                            ? 'badge-success' 
                            : issue.status === 'in-progress'
                            ? 'badge-primary'
                            : issue.status === 'assigned'
                            ? 'badge-warning'
                            : 'badge-error'
                        }`}>
                          {issue.status.replace('-', ' ').split(' ').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                        <span className={`badge ${
                          issue.priority === 'urgent' 
                            ? 'bg-error-100 text-error-800' 
                            : issue.priority === 'high'
                            ? 'bg-warning-100 text-warning-800'
                            : issue.priority === 'medium'
                            ? 'bg-accent-100 text-accent-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">No maintenance requests</p>
                <Link to="/maintenance/new">
                  <Button variant="outline" size="sm">Report an Issue</Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/maintenance" className="text-accent-600 hover:text-accent-700 text-sm font-medium flex items-center">
              View all maintenance requests
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>

        {/* Campus Announcements */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Bell className="w-5 h-5 mr-2 text-success-600" />
              Campus Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="badge badge-primary">Campus-wide</span>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <h4 className="font-medium mt-2">Library Hours Extended</h4>
                <p className="text-sm text-gray-600 mt-1">
                  The main library will remain open until midnight during finals week.
                </p>
              </div>
              
              <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="badge badge-warning">Important</span>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
                <h4 className="font-medium mt-2">WiFi Maintenance Scheduled</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Campus WiFi will be undergoing maintenance on Saturday from 7 AM to 9 AM.
                </p>
              </div>
              
              <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                <div className="flex justify-between">
                  <span className="badge badge-success">Event</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <h4 className="font-medium mt-2">Career Fair Next Week</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Don't miss the annual career fair in the Student Center next Wednesday!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/announcements" className="text-success-600 hover:text-success-700 text-sm font-medium flex items-center">
              View all announcements
              <ArrowUpRight className="ml-1 w-4 h-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;