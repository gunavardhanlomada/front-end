import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star,
  TrendingUp,
  Calendar,
  Users,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Leaderboard = () => {
  const { isAuthenticated } = useAuth();
  const [leaderboard, setLeaderboard] = useState({
    allTime: [],
    weekly: [],
    monthly: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('allTime');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const [allTimeRes, weeklyRes, monthlyRes] = await Promise.all([
        api.get('/leaderboard/allTime'),
        api.get('/leaderboard/weekly'),
        api.get('/leaderboard/monthly')
      ]);
      
      setLeaderboard({
        allTime: allTimeRes.data,
        weekly: weeklyRes.data,
        monthly: monthlyRes.data
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'allTime', label: 'All Time', icon: Trophy },
    { id: 'weekly', label: 'This Week', icon: Calendar },
    { id: 'monthly', label: 'This Month', icon: TrendingUp },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="w-6 h-6 bg-dark-700 rounded-full flex items-center justify-center text-gray-400 text-sm font-semibold">
          {rank}
        </span>;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-yellow-600';
      case 2:
        return 'from-gray-400 to-gray-500';
      case 3:
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-dark-600 to-dark-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const currentLeaderboard = leaderboard[activeTab] || [];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              <span className="gradient-text">Leaderboard</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See who's leading the community with the most events and engagement
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="flex space-x-1 bg-dark-800 rounded-xl p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-dark-700">
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  {React.createElement(tabs.find(t => t.id === activeTab)?.icon, { className: "w-6 h-6 text-primary-400" })}
                  <span>{tabs.find(t => t.id === activeTab)?.label} Leaders</span>
                </h2>
                <div className="text-sm text-gray-400">
                  {currentLeaderboard.length} members
                </div>
              </div>

              {/* Leaderboard List */}
              {currentLeaderboard.length > 0 ? (
                <div className="space-y-4">
                  {currentLeaderboard.map((member, index) => {
                    const rank = index + 1;
                    return (
                      <motion.div
                        key={member._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-dark-700/50 ${
                          rank <= 3 ? 'bg-gradient-to-r from-dark-800/50 to-dark-700/50' : ''
                        }`}
                      >
                        {/* Rank */}
                        <div className="flex-shrink-0">
                          {getRankIcon(rank)}
                        </div>

                        {/* Avatar */}
                        <div className={`w-12 h-12 bg-gradient-to-r ${getRankColor(rank)} rounded-full flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">
                            {member.name?.charAt(0) || 'M'}
                          </span>
                        </div>

                        {/* Member Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {member.name}
                          </h3>
                          <p className="text-sm text-gray-400 capitalize">
                            {member.role || 'Member'}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">
                              {member.eventsHosted || 0}
                            </div>
                            <div className="text-gray-400">Events</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">
                              {member.points || 0}
                            </div>
                            <div className="text-gray-400">Points</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="text-lg font-bold text-white">
                              {member.eventsAttended || 0}
                            </div>
                            <div className="text-gray-400">Attended</div>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex space-x-2">
                          {rank === 1 && (
                            <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                              Champion
                            </div>
                          )}
                          {member.eventsHosted > 10 && (
                            <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                              <Zap className="w-3 h-3 inline mr-1" />
                              Active
                            </div>
                          )}
                          {member.points > 1000 && (
                            <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30">
                              <Target className="w-3 h-3 inline mr-1" />
                              Elite
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">No Data Available</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Leaderboard data will appear here once members start participating in events.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Achievement Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Champion</h3>
              <p className="text-gray-400 text-sm">Top performer in the leaderboard</p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Active</h3>
              <p className="text-gray-400 text-sm">Hosted 10+ events</p>
            </div>
            
            <div className="card text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Elite</h3>
              <p className="text-gray-400 text-sm">Earned 1000+ points</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Leaderboard;
