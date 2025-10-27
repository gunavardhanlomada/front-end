import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Trophy,
  Star,
  Award,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../api/axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({
    eventsAttended: 0,
    eventsHosted: 0,
    points: 0,
    rank: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [achievementsRes, statsRes] = await Promise.all([
        api.get('/users/achievements'),
        api.get('/users/stats')
      ]);
      setAchievements(achievementsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (isEditing && formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required';
      }
      
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
      };
      
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      await api.put('/users/profile', updateData);
      setIsEditing(false);
      // Update user context here if needed
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ submit: 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-xl text-gray-400 mb-8">Please log in to view your profile</p>
          <Button variant="primary" onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container-custom section-spacing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{user?.name}</h1>
            <p className="text-xl text-gray-400">{user?.email}</p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Trophy className="w-5 h-5" />
                <span>Rank #{stats.rank}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Star className="w-5 h-5" />
                <span>{stats.points} Points</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Form */}
            <div className="lg:col-span-2">
              <div className="modern-card">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                  {!isEditing ? (
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Button>
                  ) : (
                    <div className="flex space-x-3">
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                        className="flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                        loading={loading}
                        className="flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </Button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {errors.submit && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                      <p className="text-red-400 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      disabled={!isEditing}
                      icon={User}
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      disabled={!isEditing}
                      icon={Mail}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                      disabled={!isEditing}
                      icon={Phone}
                    />
                    
                    <Input
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      error={errors.location}
                      disabled={!isEditing}
                      icon={MapPin}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="border-t border-dark-700 pt-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <Input
                          label="Current Password"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          error={errors.currentPassword}
                          icon={Lock}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={errors.newPassword}
                            icon={Lock}
                          />
                          
                          <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            icon={Lock}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Stats and Achievements */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="modern-card">
                <h3 className="text-xl font-bold text-white mb-6">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-primary-400" />
                      <span className="text-gray-300">Events Attended</span>
                    </div>
                    <span className="text-white font-semibold">{stats.eventsAttended}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Events Hosted</span>
                    </div>
                    <span className="text-white font-semibold">{stats.eventsHosted}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-300">Total Points</span>
                    </div>
                    <span className="text-white font-semibold">{stats.points}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Trophy className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Current Rank</span>
                    </div>
                    <span className="text-white font-semibold">#{stats.rank}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="modern-card">
                <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
                <div className="space-y-4">
                  {achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{achievement.name}</div>
                          <div className="text-gray-400 text-sm">{achievement.description}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No achievements yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
