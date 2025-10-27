import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Star, 
  Heart,
  Share2,
  Bookmark,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, variant = 'default' }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
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

  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return 'card-hover border-primary-500/30 hover:border-primary-500/50';
      case 'compact':
        return 'card p-4';
      case 'minimal':
        return 'bg-transparent border-0 p-0 hover:bg-dark-800/30 rounded-lg p-4 transition-all duration-300';
      default:
        return 'card-hover';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`${getVariantStyles()} group cursor-pointer`}
    >
      {/* Event Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
          <Calendar className="w-16 h-16 text-primary-400/50" />
        </div>
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-700/80 transition-all duration-300">
            <Bookmark className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 bg-dark-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-dark-700/80 transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Badge */}
        {variant === 'featured' && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-dark-900/80 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-white font-semibold text-sm">
              {formatDate(event.date)}
            </div>
            {event.time && (
              <div className="text-gray-300 text-xs">
                {formatTime(event.time)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        {variant !== 'compact' && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2">
          {/* Location */}
          {event.location && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="truncate">{event.location}</span>
            </div>
          )}

          {/* Attendees */}
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Users className="w-4 h-4 text-primary-400" />
            <span>
              {event.registeredUsers?.length || 0} attendees
            </span>
          </div>

          {/* Organizer */}
          {event.createdBy && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="w-4 h-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-semibold">
                  {event.createdBy.name?.charAt(0) || 'O'}
                </span>
              </div>
              <span>by {event.createdBy.name}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>
          </div>

          <Link
            to={`/events/${event._id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
