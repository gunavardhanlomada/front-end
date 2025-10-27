# EventHub - Modern Event Management Platform

A beautiful, modern dark-themed React application for event management with god-level UI/UX design.

## 🚀 Features

### Authentication
- **Login/Signup** - Secure user authentication with JWT tokens
- **Forgot Password** - Email-based password reset functionality
- **Reset Password** - Token-based password reset with validation
- **Protected Routes** - Secure access to authenticated features

### Event Management
- **Browse Events** - Discover events with advanced filtering and search
- **Event Details** - Comprehensive event information with registration
- **Host Events** - Create and manage your own events
- **Event Registration** - Register for events with real-time updates

### Community Features
- **Members Directory** - Browse and connect with community members
- **Leaderboard** - Track top performers and achievements
- **User Profiles** - Detailed member information and stats

### UI/UX Features
- **Dark Theme** - Modern dark theme with beautiful gradients
- **Responsive Design** - Mobile-first responsive design
- **Animations** - Smooth Framer Motion animations throughout
- **Modern Components** - Reusable UI components with consistent design
- **Glass Effects** - Beautiful glass morphism effects
- **Gradient Accents** - Stunning gradient color schemes

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls

### Backend Integration
- **RESTful API** - Integration with Node.js/Express backend
- **JWT Authentication** - Secure token-based authentication
- **Real-time Updates** - Live data updates

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation component
│   │   └── Footer.jsx          # Footer component
│   ├── ui/
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── Input.jsx           # Form input component
│   │   ├── EventCard.jsx       # Event display card
│   │   └── MemberCard.jsx      # Member display card
│   └── ProtectedRoute.jsx       # Route protection component
├── context/
│   └── AuthContext.jsx         # Authentication context
├── pages/
│   ├── auth/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   ├── ForgotPassword.jsx  # Forgot password page
│   │   └── ResetPassword.jsx   # Reset password page
│   ├── events/
│   │   ├── EventList.jsx       # Events listing page
│   │   ├── EventDetail.jsx     # Event details page
│   │   └── EventForm.jsx       # Host event form
│   ├── Home.jsx                # Home/Dashboard page
│   ├── Members.jsx             # Members directory
│   ├── Leaderboard.jsx         # Leaderboard page
│   └── Contact.jsx             # Contact page
├── api/
│   └── axios.js                # API configuration
├── App.jsx                     # Main app component
├── main.jsx                    # App entry point
└── index.css                   # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Accent**: Purple gradient (#d946ef to #c026d3)
- **Dark**: Dark gray scale (#0f172a to #64748b)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)

### Typography
- **Primary Font**: Inter (body text)
- **Display Font**: Poppins (headings)

### Components
- **Cards**: Glass morphism with subtle borders
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Dark theme with focus states
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd new-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Backend Setup

The frontend connects to a Node.js/Express backend running on:
```
http://35.202.31.198/api
```

Make sure the backend is running and accessible.

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with features, events, and community showcase
- **Events** (`/events`) - Browse and search events
- **Event Detail** (`/events/:id`) - Individual event information
- **Members** (`/members`) - Community member directory
- **Leaderboard** (`/leaderboard`) - Top performers and achievements
- **Contact** (`/contact`) - Contact form and information

### Authentication Pages
- **Login** (`/login`) - User login
- **Register** (`/register`) - User registration
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password/:token`) - Password reset form

### Protected Pages
- **Host Event** (`/host-event`) - Create new events (requires authentication)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://35.202.31.198/api
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Dark mode enabled
- Custom color palette
- Extended animations
- Custom components

## 🎯 Key Features

### Authentication Flow
1. User registers/logs in
2. JWT token stored in localStorage
3. Token automatically included in API requests
4. Protected routes redirect to login if not authenticated

### Event Management
1. Browse events with filtering and search
2. View detailed event information
3. Register for events (authenticated users)
4. Host new events (authenticated users)

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons
- **React Router** for client-side routing
- **Axios** for HTTP client functionality

---

Built with ❤️ using React, Vite, and Tailwind CSS