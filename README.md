# Appliance Repair Services Website

A modern, responsive web application for a professional appliance repair company. The platform provides comprehensive appliance repair services for refrigerators, washers, dryers, ovens, dishwashers, microwaves, and more.

## 🚀 Features

- **Comprehensive Service Coverage**: Repair services for all major home appliances
- **Nationwide Service Area**: Coverage across all major US regions
- **Online Booking System**: Easy-to-use booking form with validation
- **Contact Management**: Integrated contact forms with email notifications
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional Branding**: Clean, modern UI with consistent branding
- **Accessibility**: WCAG compliant with proper alt tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for SPA navigation
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation for forms
- **React DatePicker** - Date selection component
- **Tailwind CSS** - Utility-first CSS framework
- **Vite Plugin SVGR** - SVG component support

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aerotech-solutions.git
cd aerotech-solutions
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory with your email configuration:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
VITE_API_URL=http://localhost:5000
```

**Note**: For Gmail, you'll need to generate an App Password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for setup instructions.

### 5. Start the Development Servers

#### Terminal 1: Start the Backend Server
```bash
cd server
npm run dev
```

#### Terminal 2: Start the Frontend Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## 📜 Available Scripts

### Frontend Scripts
- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

### Backend Scripts
- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon

## 🏗️ Project Structure

```
aerotech-solutions/
├── public/                 # Static assets
│   ├── images/            # Appliance repair images
│   └── Logo.png          # Company logo
├── src/
│   ├── components/        # React components
│   │   ├── Hero.jsx      # Landing page hero section
│   │   ├── Services.jsx  # Service offerings display
│   │   ├── BookingForm.jsx # Service booking form
│   │   ├── Contact.jsx   # Contact information
│   │   └── ...           # Other page components
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── styles.css        # Global styles
├── server/                # Backend server
│   ├── server.js         # Express server setup
│   └── package.json      # Backend dependencies
├── package.json           # Frontend dependencies
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## 🎨 Customization

### Branding
- Update the logo in `public/Logo.png`
- Modify colors in component styles or create a theme system
- Update company information in contact components

### Services
- Edit service data in `src/components/Services.jsx`
- Add new appliance types or modify existing ones
- Update pricing and brand information

### Email Templates
- Customize email templates in `server/server.js`
- Modify sender information and email content
- Add additional email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact:
- Email: aerotechsolutions@gmail.com
- Phone: 630 943 5120
- Address: 206 Far Hills Dr, Bolingbrook, IL 60440

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind
- Committed to providing quality appliance repair services nationwide
