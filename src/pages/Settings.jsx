import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Palette,
  Save,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  Lock,
  User,
  Mail,
  Smartphone,
  Monitor,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../api/axios';

const SettingsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    weeklyDigest: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: false,
    
    // Appearance Settings
    theme: 'dark',
    language: 'en',
    fontSize: 'medium',
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    
    // Account Settings
    dataRetention: '1year',
    autoDelete: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/users/settings');
      setSettings({ ...settings, ...response.data });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/users/settings', settings);
      setMessage('Settings saved successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Failed to save settings');
      setMessageType('error');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleReset = () => {
    setSettings({
      emailNotifications: true,
      pushNotifications: true,
      eventReminders: true,
      weeklyDigest: true,
      marketingEmails: false,
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: false,
      theme: 'dark',
      language: 'en',
      fontSize: 'medium',
      twoFactorAuth: false,
      loginAlerts: true,
      sessionTimeout: 30,
      dataRetention: '1year',
      autoDelete: false,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-xl text-gray-400 mb-8">Please log in to access settings</p>
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
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
            <p className="text-xl text-gray-400">Customize your Alan Turing Club experience</p>
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 p-4 rounded-xl ${
                messageType === 'success' 
                  ? 'bg-green-900/20 border border-green-500/30 text-green-400' 
                  : 'bg-red-900/20 border border-red-500/30 text-red-400'
              }`}
            >
              {message}
            </motion.div>
          )}

          <div className="space-y-8">
            {/* Notification Settings */}
            <div className="modern-card">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-6 h-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">Notifications</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email Notifications</h3>
                    <p className="text-gray-400">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Push Notifications</h3>
                    <p className="text-gray-400">Receive push notifications on your device</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Event Reminders</h3>
                    <p className="text-gray-400">Get reminded about upcoming events</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.eventReminders}
                      onChange={(e) => handleSettingChange('eventReminders', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Marketing Emails</h3>
                    <p className="text-gray-400">Receive promotional emails and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.marketingEmails}
                      onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="modern-card">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Privacy</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Profile Visibility</label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="public">Public</option>
                    <option value="members">Members Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Show Email</h3>
                      <p className="text-gray-400">Display email on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showEmail}
                        onChange={(e) => handleSettingChange('showEmail', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Show Phone</h3>
                      <p className="text-gray-400">Display phone number on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showPhone}
                        onChange={(e) => handleSettingChange('showPhone', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Show Location</h3>
                      <p className="text-gray-400">Display location on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.showLocation}
                        onChange={(e) => handleSettingChange('showLocation', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="modern-card">
              <div className="flex items-center space-x-3 mb-6">
                <Palette className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Appearance</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Theme</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleSettingChange('theme', 'light')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        settings.theme === 'light'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <Sun className="w-6 h-6 text-white mx-auto mb-2" />
                      <div className="text-white font-medium">Light</div>
                    </button>
                    <button
                      onClick={() => handleSettingChange('theme', 'dark')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        settings.theme === 'dark'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-600 hover:border-dark-500'
                      }`}
                    >
                      <Moon className="w-6 h-6 text-white mx-auto mb-2" />
                      <div className="text-white font-medium">Dark</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Font Size</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSettingChange('fontSize', size)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 capitalize ${
                          settings.fontSize === size
                            ? 'border-primary-500 bg-primary-500/10'
                            : 'border-dark-600 hover:border-dark-500'
                        }`}
                      >
                        <div className="text-white font-medium">{size}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="modern-card">
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="w-6 h-6 text-red-400" />
                <h2 className="text-2xl font-bold text-white">Security</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Two-Factor Authentication</h3>
                    <p className="text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Login Alerts</h3>
                    <p className="text-gray-400">Get notified of new login attempts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.loginAlerts}
                      onChange={(e) => handleSettingChange('loginAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={handleSave}
                loading={loading}
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleReset}
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Default</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
