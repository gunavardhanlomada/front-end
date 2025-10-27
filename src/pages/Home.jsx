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
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/ui/EventCard';
import MemberCard from '../components/ui/MemberCard';
import Button from '../components/ui/Button';
import api from '../api/axios';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalMembers: 0,
    upcomingEvents: 0,
    activeUsers: 0,
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
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Calendar,
      title: 'Discover Events',
      description: 'Find amazing events happening in your area and beyond',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Connect with People',
      description: 'Meet like-minded individuals and build lasting relationships',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Trophy,
      title: 'Earn Rewards',
      description: 'Participate in events and earn points for your achievements',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Star,
      title: 'Create Memories',
      description: 'Host your own events and create unforgettable experiences',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      avatar: 'SJ',
      rating: 5,
      comment: 'EventHub has transformed how I organize events. The platform is intuitive and the community is amazing!',
    },
    {
      name: 'Mike Chen',
      role: 'Community Member',
      avatar: 'MC',
      rating: 5,
      comment: 'I\'ve met so many great people through events on this platform. Highly recommended!',
    },
    {
      name: 'Emily Davis',
      role: 'Event Attendee',
      avatar: 'ED',
      rating: 5,
      comment: 'The event discovery feature is fantastic. I always find something interesting to attend.',
    },
  ];

  const statsCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Active Members',
      value: stats.activeUsers,
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+8%',
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      change: '+15%',
    },
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
      change: '+20%',
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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10"></div>
        <div className="container-custom section-padding relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl lg:text-6xl font-bold text-white leading-tight"
                >
                  Connect, Create,{' '}
                  <span className="gradient-text">Celebrate</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 leading-relaxed"
                >
                  Join Alan Turing Club and discover amazing events, connect with like-minded people, 
                  and create unforgettable memories together.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {isAuthenticated ? (
                  <>
                    <Link to="/events" className="btn-primary flex items-center space-x-2">
                      <span>Explore Events</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/host-event" className="btn-secondary flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Host Event</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary flex items-center space-x-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/events" className="btn-secondary flex items-center space-x-2">
                      <span>Browse Events</span>
                    </Link>
                  </>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-6 pt-8"
              >
                {statsCards.slice(0, 2).map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.title}</div>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl flex items-center justify-center">
                  <Calendar className="w-32 h-32 text-primary-400/50" />
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center"
                >
                  <Users className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center"
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">Alan Turing Club</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to discover, create, and participate in amazing events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 feature-icon`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Featured <span className="gradient-text">Events</span>
              </h2>
              <p className="text-xl text-gray-400">
                Discover amazing events happening around you
              </p>
            </div>
            <Link to="/events" className="btn-secondary flex items-center space-x-2">
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

      {/* Members Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our <span className="gradient-text">Community</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Connect with amazing people who share your interests and passions
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
            <Link to="/members" className="btn-secondary flex items-center space-x-2 mx-auto w-fit">
              <span>View All Members</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What People <span className="gradient-text">Say</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hear from our amazing community members about their experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {review.avatar}
                </div>
                
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-4 italic">"{review.comment}"</p>
                
                <div>
                  <h4 className="font-semibold text-white">{review.name}</h4>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your <span className="gradient-text">Journey</span>?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Join thousands of people who are already creating amazing experiences together
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isAuthenticated ? (
                  <>
                    <Link to="/host-event" className="btn-primary flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Host Your First Event</span>
                    </Link>
                    <Link to="/events" className="btn-secondary flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Explore Events</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary flex items-center space-x-2">
                      <span>Join Alan Turing Club</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link to="/login" className="btn-secondary flex items-center space-x-2">
                      <span>Sign In</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
