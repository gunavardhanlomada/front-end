import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  User, 
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Star,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import api from '../../api/axios';

const EventDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/event/${id}`);
      setEvent(response.data);
      setIsRegistered(response.data.registeredUsers?.some(regUser => regUser._id === user?.id));
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Event not found');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    setError('');
    setSuccess('');

    try {
      await api.post(`/events/${id}/register`);
      setIsRegistered(true);
      setSuccess('Successfully registered for the event!');
      
      // Update the event data
      const updatedEvent = { ...event };
      updatedEvent.registeredUsers = [...(updatedEvent.registeredUsers || []), { _id: user.id, name: user.name }];
      setEvent(updatedEvent);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const isEventPast = (dateString) => {
    return new Date(dateString) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/events"
              className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Events</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <Calendar className="w-32 h-32 text-primary-400/50" />
                </div>
                
                {/* Event Status Badge */}
                <div className="absolute top-4 left-4">
                  {isEventPast(event.date) ? (
                    <span className="px-3 py-1 bg-gray-600 text-white text-sm font-semibold rounded-full">
                      Past Event
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-700/80 transition-all duration-300">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-700/80 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-700/80 transition-all duration-300">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Event Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card space-y-6"
              >
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-primary-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    {event.time && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-primary-400" />
                        <span>{formatTime(event.time)}</span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary-400" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-primary-400" />
                      <span>{event.registeredUsers?.length || 0} attendees</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">About This Event</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </div>

                {/* Organizer */}
                {event.createdBy && (
                  <div className="border-t border-dark-700 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Organized By</h3>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{event.createdBy.name}</h4>
                        <p className="text-gray-400">{event.createdBy.role}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Attendees */}
                {event.registeredUsers && event.registeredUsers.length > 0 && (
                  <div className="border-t border-dark-700 pt-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Attendees ({event.registeredUsers.length})
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {event.registeredUsers.slice(0, 12).map((attendee, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-dark-700 rounded-lg px-3 py-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-semibold">
                              {attendee.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <span className="text-sm text-gray-300">{attendee.name}</span>
                        </div>
                      ))}
                      {event.registeredUsers.length > 12 && (
                        <div className="flex items-center space-x-2 bg-dark-700 rounded-lg px-3 py-2">
                          <span className="text-sm text-gray-400">
                            +{event.registeredUsers.length - 12} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card"
              >
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    {event.registeredUsers?.length || 0}
                  </div>
                  <div className="text-gray-400">Attendees</div>
                </div>

                {/* Success/Error Messages */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4 flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <p className="text-green-400 text-sm">{success}</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4 flex items-center space-x-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Register Button */}
                {!isEventPast(event.date) && (
                  <Button
                    onClick={handleRegister}
                    loading={registering}
                    disabled={isRegistered}
                    className={`w-full ${
                      isRegistered 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : ''
                    }`}
                    size="lg"
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4" />
                        <span>Register for Event</span>
                      </>
                    )}
                  </Button>
                )}

                {isEventPast(event.date) && (
                  <div className="text-center py-4">
                    <p className="text-gray-400">This event has already ended</p>
                  </div>
                )}

                {/* Share Options */}
                <div className="border-t border-dark-700 pt-6 mt-6">
                  <h4 className="text-sm font-semibold text-white mb-4">Share Event</h4>
                  <div className="flex space-x-3">
                    <button className="flex-1 btn-secondary text-sm py-2">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="flex-1 btn-secondary text-sm py-2">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Event Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h4 className="text-lg font-semibold text-white mb-4">Event Information</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary-400" />
                    <div>
                      <div className="text-sm text-gray-400">Date</div>
                      <div className="text-white">{formatDate(event.date)}</div>
                    </div>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-400">Time</div>
                        <div className="text-white">{formatTime(event.time)}</div>
                      </div>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-primary-400" />
                      <div>
                        <div className="text-sm text-gray-400">Location</div>
                        <div className="text-white">{event.location}</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
