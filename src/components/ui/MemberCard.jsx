import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone,
  Award,
  Star,
  Clock
} from 'lucide-react';

const MemberCard = ({ member, variant = 'default' }) => {
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

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'from-red-500 to-red-600';
      case 'organizer':
        return 'from-purple-500 to-purple-600';
      case 'member':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return '👑';
      case 'organizer':
        return '🎯';
      case 'member':
        return '⭐';
      default:
        return '👤';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`${getVariantStyles()} group cursor-pointer`}
    >
      {/* Member Avatar */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {member.name?.charAt(0) || 'M'}
          </div>
          
          {/* Online Status */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-dark-900 rounded-full"></div>
          
          {/* Role Badge */}
          <div className={`absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r ${getRoleColor(member.role)} rounded-full flex items-center justify-center text-xs text-white`}>
            {getRoleIcon(member.role)}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-gray-400 text-sm capitalize">
            {member.role || 'Member'}
          </p>
        </div>
      </div>

      {/* Member Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-dark-700/50 rounded-lg">
          <div className="text-2xl font-bold text-primary-400">
            {member.eventsHosted || 0}
          </div>
          <div className="text-xs text-gray-400">Events Hosted</div>
        </div>
        <div className="text-center p-3 bg-dark-700/50 rounded-lg">
          <div className="text-2xl font-bold text-accent-400">
            {member.eventsAttended || 0}
          </div>
          <div className="text-xs text-gray-400">Events Attended</div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        {member.email && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Mail className="w-4 h-4 text-primary-400" />
            <span className="truncate">{member.email}</span>
          </div>
        )}
        {member.phone && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Phone className="w-4 h-4 text-primary-400" />
            <span>{member.phone}</span>
          </div>
        )}
        {member.location && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4 text-primary-400" />
            <span className="truncate">{member.location}</span>
          </div>
        )}
      </div>

      {/* Achievements */}
      {member.achievements && member.achievements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {member.achievements.slice(0, 3).map((achievement, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-400 text-xs rounded-full border border-primary-500/30"
              >
                {achievement}
              </span>
            ))}
            {member.achievements.length > 3 && (
              <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded-full">
                +{member.achievements.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Join Date */}
      {member.joinDate && (
        <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
          <Calendar className="w-4 h-4 text-primary-400" />
          <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-dark-700">
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-1">
            <Star className="w-4 h-4" />
            <span>Follow</span>
          </button>
          <button className="px-3 py-2 bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span>Message</span>
          </button>
        </div>

        <button className="btn-secondary text-sm px-4 py-2">
          View Profile
        </button>
      </div>
    </motion.div>
  );
};

export default MemberCard;
