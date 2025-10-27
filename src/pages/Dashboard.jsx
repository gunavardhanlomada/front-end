import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Trophy, 
  Star, 
  ArrowRight, 
  Plus,
  TrendingUp,
  Clock,
  MapPin,
  Heart,
  Share2,
  Bookmark,
  Filter,
  Search,
  Settings,
  Bell,
  User,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/ui/EventCard';
import MemberCard from '../components/ui/MemberCard';
import Button from '../components/ui/Button';
import api from '../api/axios';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalMembers: 0,
    upcomingEvents: 0,
    activeUsers: 0,
    userPoints: 0,
    userRank: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, membersRes] = await Promise.all([
        api.get('/events/allEvents'),
        api.get('/members/allMembers')
      ]);
      
      setEvents(eventsRes.data.slice(0, 6));
      setMembers(membersRes.data.slice(0, 4));
      
      setStats({
        totalEvents: eventsRes.data.length,
        totalMembers: membersRes.data.length,
        upcomingEvents: eventsRes.data.filter(event => new Date(event.date) > new Date()).length,
        activeUsers: membersRes.data.filter(member => member.isActive).length,
        userPoints: user?.points || 0,
        userRank: user?.rank || 0,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Host Event',
      description: 'Create a new event',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      link: '/host-event',
    },
    {
      title: 'Browse Events',
      description: 'Find events to join',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      link: '/events',
    },
    {
      title: 'View Members',
      description: 'Connect with members',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      link: '/members',
    },
    {
      title: 'Leaderboard',
      description: 'Check rankings',
      icon: Trophy,
      color: 'from-yellow-500 to-yellow-600',
      link: '/leaderboard',
    },
  ];

  const statsCards = [
    {
      title: 'Your Points',
      value: stats.userPoints,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      change: '+50',
    },
    {
      title: 'Your Rank',
      value: `#${stats.userRank}`,
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
      change: '+2',
    },
    {
      title: 'Events Attended',
      value: '12',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      change: '+3',
    },
    {
      title: 'Achievements',
      value: '8',
      icon: Award,
      color: 'from-green-500 to-green-600',
      change: '+1',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <section className="section-spacing-sm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome back, <span className="gradient-text">{user?.name}</span>!
            </h1>
            <p className="text-xl text-gray-400">
              Here's what's happening in Alan Turing Club
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="modern-card text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-2">{stat.title}</div>
                  <div className="text-xs text-green-400 font-medium">{stat.change} this week</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-spacing-sm bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Quick <span className="gradient-text">Actions</span>
            </h2>
            <p className="text-xl text-gray-400">
              Get started with these common tasks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={action.link} className="modern-card block group">
                    <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{action.title}</h3>
                    <p className="text-gray-400">{action.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="section-spacing-sm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Recent <span className="gradient-text">Events</span>
              </h2>
              <p className="text-xl text-gray-400">
                Events you might be interested in
              </p>
            </div>
            <Link to="/events" className="modern-button flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} variant="featured" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Members */}
      <section className="section-spacing-sm bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Top <span className="gradient-text">Members</span>
            </h2>
            <p className="text-xl text-gray-400">
              Connect with our most active members
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MemberCard member={member} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/members" className="modern-button flex items-center space-x-2 mx-auto w-fit">
              <span>View All Members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
