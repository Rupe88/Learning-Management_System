import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SnowEffect from './components/shared/SnowEffect';
import Home from './pages/Home';
// import Courses from './pages/Courses';
// import CourseDetails from './pages/CourseDetails';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <SnowEffect />
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} /> */}
            </Routes>
          </main>
          <Footer />
          {/* <Toaster 
            position="top-center"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
              duration: 3000,
            }}
          /> */}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;