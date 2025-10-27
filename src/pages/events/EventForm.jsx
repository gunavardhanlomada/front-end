import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Image,
  Plus,
  X,
  Save,
  Send
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import api from '../../api/axios';

const HostEvent = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'general',
    maxAttendees: '',
    requirements: '',
    tags: [],
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [newTag, setNewTag] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'tech', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'social', label: 'Social' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'food', label: 'Food & Drink' },
    { value: 'travel', label: 'Travel & Adventure' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSuccess('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.date) {
      newErrors.date = 'Event date is required';
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = 'Event date must be in the future';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    }
    
    if (formData.maxAttendees && (isNaN(formData.maxAttendees) || formData.maxAttendees < 1)) {
      newErrors.maxAttendees = 'Maximum attendees must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess('');
    
    try {
      const eventData = {
        ...formData,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
      };
      
      const response = await api.post('/events/createEvent', eventData);
      
      setSuccess('Event created successfully!');
      
      // Redirect to event detail page after a short delay
      setTimeout(() => {
        navigate(`/events/${response.data._id}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating event:', error);
      setErrors({ submit: 'Failed to create event. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    // Save form data to localStorage as draft
    localStorage.setItem('eventDraft', JSON.stringify(formData));
    setSuccess('Draft saved successfully!');
  };

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
              Host Your <span className="gradient-text">Event</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Create an amazing event and bring people together for unforgettable experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 flex items-center space-x-3"
              >
                <Save className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400">{success}</p>
              </motion.div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-500/30 rounded-lg p-4"
              >
                <p className="text-red-400">{errors.submit}</p>
              </motion.div>
            )}

            {/* Basic Information */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary-400" />
                <span>Basic Information</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Event Title"
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Description
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your event in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none ${
                    errors.description ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  required
                />
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {errors.description}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-primary-400" />
                <span>Date & Time</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Event Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                  required
                  icon={Calendar}
                />

                <Input
                  label="Event Time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  icon={Clock}
                />
              </div>
            </div>

            {/* Location & Capacity */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary-400" />
                <span>Location & Capacity</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Event Location"
                  type="text"
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  required
                  icon={MapPin}
                />

                <Input
                  label="Maximum Attendees"
                  type="number"
                  name="maxAttendees"
                  placeholder="Leave empty for unlimited"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  error={errors.maxAttendees}
                  icon={Users}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary-400" />
                <span>Additional Information</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    placeholder="Any special requirements or instructions for attendees..."
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-600/20 text-primary-400 text-sm rounded-full border border-primary-500/30 flex items-center space-x-2"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-primary-400 hover:text-primary-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="flex-1 px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    />
                    <Button
                      type="button"
                      onClick={handleAddTag}
                      variant="secondary"
                      size="sm"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                onClick={handleSaveDraft}
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </Button>
              
              <Button
                type="submit"
                loading={loading}
                className="flex items-center space-x-2"
                size="lg"
              >
                <Send className="w-4 h-4" />
                <span>Create Event</span>
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default HostEvent;
