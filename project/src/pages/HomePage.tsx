import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Wrench, Bell, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Streamline Your Campus Experience
              </h1>
              <p className="text-lg mb-8 text-primary-100">
                Your all-in-one solution for managing bookings, schedules, maintenance requests, and 
                campus announcements. Designed to make campus life easier.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button variant="accent" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative mx-auto max-w-md">
                <div className="rounded-lg bg-white shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Smart Campus Portal" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-accent-500 rounded-lg p-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-white font-semibold">
                    <Calendar className="w-5 h-5 inline-block mr-2" />
                    Room booking made easy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100L60 91.7C120 83.3 240 66.7 360 58.3C480 50 600 50 720 50C840 50 960 50 1080 54.2C1200 58.3 1320 66.7 1380 70.8L1440 75V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V100Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need in One Place</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our platform brings together all essential campus services into a single integrated solution,
              accessible from any device, anytime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Room Bookings</h3>
              <p className="text-gray-600">
                Easily reserve classrooms, meeting rooms, and study spaces with real-time availability.
              </p>
            </div>
            
            <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-secondary-100 text-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Class Schedules</h3>
              <p className="text-gray-600">
                Access your timetable at a glance with personalized views for students and lecturers.
              </p>
            </div>
            
            <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-accent-100 text-accent-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Maintenance Requests</h3>
              <p className="text-gray-600">
                Report facility issues and track their resolution status in real-time.
              </p>
            </div>
            
            <div className="card text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-success-100 text-success-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Announcements</h3>
              <p className="text-gray-600">
                Stay informed with important campus news, events, and alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-based Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tailored for Everyone</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Whether you're a student, lecturer, or administrator, our platform provides specialized
              features to meet your unique needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card h-full hover:shadow-lg">
              <div className="p-2 inline-block bg-primary-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                  <span>Personal timetable view</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                  <span>Study room reservations</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                  <span>Facility issue reporting</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-primary-500 mr-2" />
                  <span>Important announcements</span>
                </li>
              </ul>
              <Link to="/register" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center">
                Register as Student
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="card h-full hover:shadow-lg">
              <div className="p-2 inline-block bg-secondary-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Lecturers</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-secondary-500 mr-2" />
                  <span>Teaching schedule management</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-secondary-500 mr-2" />
                  <span>Classroom booking requests</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-secondary-500 mr-2" />
                  <span>Equipment maintenance reports</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-secondary-500 mr-2" />
                  <span>Create department announcements</span>
                </li>
              </ul>
              <Link to="/register" className="text-secondary-600 font-medium hover:text-secondary-700 inline-flex items-center">
                Register as Lecturer
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="card h-full hover:shadow-lg">
              <div className="p-2 inline-block bg-accent-100 rounded-lg mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Administrators</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-accent-500 mr-2" />
                  <span>User management system</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-accent-500 mr-2" />
                  <span>Resource allocation dashboard</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-accent-500 mr-2" />
                  <span>Maintenance task assignment</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-accent-500 mr-2" />
                  <span>Campus-wide announcement system</span>
                </li>
              </ul>
              <Link to="/register" className="text-accent-600 font-medium hover:text-accent-700 inline-flex items-center">
                Register as Administrator
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Campus Experience?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Join thousands of students and staff who have already streamlined their campus experience 
            with our smart services portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button variant="accent" size="lg">
                Create an Account
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;