import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, Filter, ExternalLink, MapPin, Clock, DollarSign, BookOpen, Youtube, Plus, X, Users, Award, LogIn, LogOut, Menu, Building2, FileText, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import axios from 'axios';
import LandingScreen from './LandingScreen';
import ContactUs from './ContactUs';
import ResumeBuilder from './ResumeBuilder';

const API_URL = 'https://caspire-backend.onrender.com';

// Rotating Tagline Component
// Typewriter Effect Rotating Tagline
const RotatingTagline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const taglines = [
    "From Classroom To Boardroom",
    "We Build Careers"
  ];

  useEffect(() => {
    const currentTagline = taglines[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentTagline.length) {
          setDisplayText(currentTagline.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentTagline.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <div className="h-24 sm:h-28 flex items-center justify-center mb-4">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
        {displayText}
        <span className="animate-pulse">|</span>
      </h2>
    </div>
  );
};

const CAspireJobPortal = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBooking, setShowBooking] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddGovtJob, setShowAddGovtJob] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showHRRegister, setShowHRRegister] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  const [userRole, setUserRole] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [hrRegData, setHrRegData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    password: '',
    confirmPassword: ''
  });

  const [floatingElements] = useState([
    { id: 1, x: 10, y: 20, size: 60, delay: 0 },
    { id: 2, x: 80, y: 60, size: 80, delay: 1 },
    { id: 3, x: 50, y: 80, size: 50, delay: 2 },
    { id: 4, x: 20, y: 50, size: 70, delay: 1.5 }
  ]);

  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [govtJobs, setGovtJobs] = useState([]);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    category: 'Full Stack',
    location: '',
    type: 'Full-time',
    salary: '',
    experience: '',
    skills: '',
    description: '',
    applyUrl: ''
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    category: 'Full Stack',
    level: 'Beginner',
    duration: '',
    description: '',
    youtubePlaylist: '',
    topics: ''
  });

  const [newGovtJob, setNewGovtJob] = useState({
  title: '',
  organization: '',
  category: 'UPSC',
  location: '',
  qualification: '',
  salary: '',
  lastDate: '',
  vacancies: '',
  description: '',
  applyUrl: ''
});

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'ML and DL', 'Data Analyst', 'DevOps', 'Programming'];
  const govtCategories = ['All', 'UPSC', 'SSC', 'Banking', 'Railway', 'Defense', 'PSU', 'State Govt', 'Teaching'];

  useEffect(() => {
  if (!showLanding) {
    loadJobs();
    loadCourses();
    loadGovtJobs();
  }
}, [showLanding]);

  const handleEnterSite = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowLanding(false);
      setIsTransitioning(false);
    }, 800);
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  const loadGovtJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/govtjobs`);
    setGovtJobs(response.data);
  } catch (error) {
    console.error('Error loading govt jobs:', error);
  }
};

  const filteredJobs = selectedCategory === 'All' ? jobs : jobs.filter(job => job.category === selectedCategory);
  const filteredCourses = selectedCategory === 'All' ? courses : courses.filter(course => course.category === selectedCategory);
  const filteredGovtJobs = selectedCategory === 'All' ? govtJobs : govtJobs.filter(job => job.category === selectedCategory);

  const handleHRRegister = async () => {
    if (!hrRegData.name || !hrRegData.email || !hrRegData.company || !hrRegData.password) {
      alert('Please fill all required fields');
      return;
    }

    if (hrRegData.password !== hrRegData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (hrRegData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/hrs?email=${hrRegData.email}`);
      if (response.data.length > 0) {
        alert('Email already registered. Please login.');
        return;
      }

      await axios.post(`${API_URL}/hrs`, {
        name: hrRegData.name,
        email: hrRegData.email,
        phone: hrRegData.phone,
        company: hrRegData.company,
        designation: hrRegData.designation,
        password: hrRegData.password,
        registeredDate: new Date().toISOString()
      });
      
      alert(`Welcome ${hrRegData.name}! Your HR account created successfully.`);
      setHrRegData({ name: '', email: '', phone: '', company: '', designation: '', password: '', confirmPassword: '' });
      setShowHRRegister(false);
      setShowLogin(true);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleLogin = async () => {
    const ADMIN_EMAIL = 'admin@caspire.com';
    const ADMIN_PASSWORD = 'CAspire@Admin2024';

    try {
      if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
        setUserRole('admin');
        setCurrentUser({ email: loginEmail, name: 'Admin' });
        setShowLogin(false);
        alert('Welcome Admin!');
        setLoginEmail('');
        setLoginPassword('');
        return;
      }

      const response = await axios.get(`${API_URL}/hrs?email=${loginEmail}&password=${loginPassword}`);
      if (response.data.length > 0) {
        const hr = response.data[0];
        setUserRole('hr');
        setCurrentUser({ email: hr.email, name: hr.name, company: hr.company });
        setShowLogin(false);
        alert(`Welcome ${hr.name}!`);
        setLoginEmail('');
        setLoginPassword('');
        return;
      }

      if (loginEmail && loginPassword) {
        setUserRole('user');
        setCurrentUser({ email: loginEmail, name: 'Student' });
        setShowLogin(false);
        alert('Welcome!');
        setLoginEmail('');
        setLoginPassword('');
        return;
      }

      alert('Invalid credentials.');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed.');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    alert('Logged out!');
  };

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.company || !newJob.applyUrl) {
      alert('Please fill required fields (Title, Company, Apply URL)');
      return;
    }

    const job = {
      title: newJob.title,
      company: newJob.company,
      category: newJob.category,
      location: newJob.location,
      type: newJob.type,
      salary: newJob.salary,
      experience: newJob.experience,
      skills: newJob.skills.split(',').map(s => s.trim()),
      description: newJob.description,
      applyUrl: newJob.applyUrl,
      postedDate: 'Today',
      postedBy: userRole,
      postedByUser: currentUser?.name || 'Unknown'
    };
    
    try {
      setLoading(true);
      await axios.post(`${API_URL}/jobs`, job);
      await loadJobs();
      setNewJob({ title: '', company: '', category: 'Full Stack', location: '', type: 'Full-time', salary: '', experience: '', skills: '', description: '', applyUrl: '' });
      setShowAddJob(false);
      alert('Job posted successfully!');
    } catch (error) {
      alert('Failed to post job. Make sure JSON Server is running!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.youtubePlaylist) {
      alert('Please fill title and YouTube URL');
      return;
    }

    const course = {
      title: newCourse.title,
      instructor: newCourse.instructor,
      category: newCourse.category,
      level: newCourse.level,
      duration: newCourse.duration,
      description: newCourse.description,
      youtubePlaylist: newCourse.youtubePlaylist,
      topics: newCourse.topics.split(',').map(s => s.trim())
    };
    
    try {
      setLoading(true);
      await axios.post(`${API_URL}/courses`, course);
      await loadCourses();
      setNewCourse({ title: '', instructor: '', category: 'Full Stack', level: 'Beginner', duration: '', description: '', youtubePlaylist: '', topics: '' });
      setShowAddCourse(false);
      alert('Course added!');
    } catch (error) {
      alert('Failed to add course. Make sure JSON Server is running!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Delete this job?')) {
      try {
        await axios.delete(`${API_URL}/jobs/${jobId}`);
        await loadJobs();
        alert('Job deleted!');
      } catch (error) {
        alert('Failed to delete.');
      }
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Delete this course?')) {
      try {
        await axios.delete(`${API_URL}/courses/${courseId}`);
        await loadCourses();
        alert('Course deleted!');
      } catch (error) {
        alert('Failed to delete.');
      }
    }
  };

  const handleAddGovtJob = async () => {
  if (!newGovtJob.title || !newGovtJob.organization || !newGovtJob.applyUrl) {
    alert('Please fill required fields (Title, Organization, Apply URL)');
    return;
  }

  const govtJob = {
    title: newGovtJob.title,
    organization: newGovtJob.organization,
    category: newGovtJob.category,
    location: newGovtJob.location,
    qualification: newGovtJob.qualification,
    salary: newGovtJob.salary,
    lastDate: newGovtJob.lastDate,
    vacancies: newGovtJob.vacancies,
    description: newGovtJob.description,
    applyUrl: newGovtJob.applyUrl,
    postedDate: 'Today',
    postedBy: userRole,
    postedByUser: currentUser?.name || 'Unknown'
  };
  
  try {
    setLoading(true);
    await axios.post(`${API_URL}/govtjobs`, govtJob);
    await loadGovtJobs();
    setNewGovtJob({ title: '', organization: '', category: 'UPSC', location: '', qualification: '', salary: '', lastDate: '', vacancies: '', description: '', applyUrl: '' });
    setShowAddGovtJob(false);
    alert('Govt Job posted successfully!');
  } catch (error) {
    alert('Failed to post govt job. Make sure JSON Server is running!');
  } finally {
    setLoading(false);
  }
};

const handleDeleteGovtJob = async (jobId) => {
  if (window.confirm('Delete this govt job?')) {
    try {
      await axios.delete(`${API_URL}/govtjobs/${jobId}`);
      await loadGovtJobs();
      alert('Govt Job deleted!');
    } catch (error) {
      alert('Failed to delete.');
    }
  }
};

  const canAddJobs = userRole === 'admin' || userRole === 'hr';
  const canAddCourses = userRole === 'admin';
  const canDelete = userRole === 'admin';

  return (
    <>
      {showLanding && <LandingScreen onEnter={handleEnterSite} />}
      
      {isTransitioning && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-cyan-500 animate-circle-expand" />
        </div>
      )}

      {!showLanding && (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
                <p className="mt-4 text-gray-700">Loading...</p>
              </div>
            </div>
          )}

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingElements.map(elem => (
              <div
                key={elem.id}
                className="absolute rounded-full bg-cyan-500 opacity-10"
                style={{
                  left: `${elem.x}%`,
                  top: `${elem.y}%`,
                  width: `${elem.size}px`,
                  height: `${elem.size}px`,
                  animationDelay: `${elem.delay}s`,
                  animation: 'float 20s infinite ease-in-out'
                }}
              />
            ))}
          </div>

          <style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-30px) rotate(120deg); }
    66% { transform: translateY(20px) rotate(240deg); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes circle-expand {
    0% { clip-path: circle(0% at 50% 50%); }
    100% { clip-path: circle(150% at 50% 50%); }
  }
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-slide-in { animation: slideIn 0.5s ease-out forwards; }
  .animate-pulse-slow { animation: pulse 3s infinite ease-in-out; }
  .animate-circle-expand { animation: circle-expand 0.8s ease-out forwards; }
  .animate-bounce-subtle { animation: bounce-subtle 2s infinite ease-in-out; }
  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
  .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
  .hover-lift { transition: all 0.3s ease; }
  .hover-lift:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(6, 182, 212, 0.4); }
`}</style>

<header className="
  sticky top-0 z-50
  bg-white/10 dark:bg-black/30
  backdrop-blur-xl
  border-b border-white/20 dark:border-white/10
  shadow-lg shadow-black/10">
            <div className="container mx-auto px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-lg">
                    <img 
                      src="/caspire-logo.png" 
                      alt="CAspire Logo" 
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-3xl font-bold text-white">CAspire</h1>
                    <p className="text-cyan-300 text-xs sm:text-sm hidden sm:block">Tier 2 & 3 Empowerment</p>
                  </div>
                </div>
                <button/>

                <div className="hidden lg:flex items-center gap-3">
  {/* Always show Resume Builder & Counselling - NO LOGIN NEEDED */}
  <button
    onClick={() => setShowResumeBuilder(true)}
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
  >
    <FileText size={18} />
    <span>Build Resume</span>
  </button>
  
  <button
    onClick={() => setShowBooking(true)}
    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
  >
    <Calendar size={18} />
    <span>Free Counselling</span>
  </button>
                  
                  {userRole ? (
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold px-4 py-2 bg-white bg-opacity-20 rounded-full">
                        {currentUser?.name || userRole}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transition-all hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowHRRegister(true)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transition-all hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
                      >
                        <Building2 size={18} />
                        <span>HR Register</span>
                      </button>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transition-all hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-white p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
                >
                  <Menu size={24} />
                </button>
              </div>

              {mobileMenuOpen && (
  <div className="lg:hidden mt-4 pb-4 space-y-3 animate-slide-in">
    {/* Always show for visitors - NO LOGIN NEEDED */}
    <button
      onClick={() => { setShowResumeBuilder(true); setMobileMenuOpen(false); }}
      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
    >
      <FileText size={18} />
      <span>Build Resume</span>
    </button>

    <button
      onClick={() => { setShowBooking(true); setMobileMenuOpen(false); }}
      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-purple-500/50 transform hover:scale-105 transition-all"
    >
      <Calendar size={18} />
      <span>Free Counselling</span>
    </button>
                  
                  {userRole ? (
                    <>
                      <div className="text-center text-white font-semibold px-4 py-2 bg-white bg-opacity-20 rounded-lg">
                        {currentUser?.name || userRole}
                      </div>
                      <button
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                      >
                        <LogOut size={18} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setShowHRRegister(true); setMobileMenuOpen(false); }}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                      >
                        <Building2 size={18} />
                        <span>HR Register</span>
                      </button>
                      <button
                        onClick={() => { setShowLogin(true); setMobileMenuOpen(false); }}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </header>

          {showHRRegister && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-cyan-500/30 shadow-2xl my-8 animate-slide-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">HR Registration</h2>
                  <button onClick={() => setShowHRRegister(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <input type="text" placeholder="Full Name *" value={hrRegData.name} onChange={(e) => setHrRegData({...hrRegData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="email" placeholder="Email *" value={hrRegData.email} onChange={(e) => setHrRegData({...hrRegData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="tel" placeholder="Phone" value={hrRegData.phone} onChange={(e) => setHrRegData({...hrRegData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="text" placeholder="Company *" value={hrRegData.company} onChange={(e) => setHrRegData({...hrRegData, company: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="text" placeholder="Designation" value={hrRegData.designation} onChange={(e) => setHrRegData({...hrRegData, designation: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="password" placeholder="Password (min 6 chars) *" value={hrRegData.password} onChange={(e) => setHrRegData({...hrRegData, password: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="password" placeholder="Confirm Password *" value={hrRegData.confirmPassword} onChange={(e) => setHrRegData({...hrRegData, confirmPassword: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                </div>

                <button onClick={handleHRRegister} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Register as HR
                </button>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  Already registered? <button onClick={() => { setShowHRRegister(false); setShowLogin(true); }} className="text-cyan-400 hover:underline">Login</button>
                </p>
              </div>
            </div>
          )}

          {showLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl animate-slide-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-white">Login</h2>
                  <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                </div>

                <button onClick={handleLogin} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                  Login
                </button>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  HR not registered? <button onClick={() => { setShowLogin(false); setShowHRRegister(true); }} className="text-cyan-400 hover:underline">Register</button>
                </p>
              </div>
            </div>
          )}

          {showAddJob && canAddJobs && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-cyan-500/30 shadow-2xl my-8 animate-slide-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Post Job</h2>
                  <button onClick={() => setShowAddJob(false)} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  <input type="text" placeholder="Job Title *" value={newJob.title} onChange={(e) => setNewJob({...newJob, title: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="text" placeholder="Company *" value={newJob.company} onChange={(e) => setNewJob({...newJob, company: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select value={newJob.category} onChange={(e) => setNewJob({...newJob, category: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                      {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={newJob.type} onChange={(e) => setNewJob({...newJob, type: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <input type="text" placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({...newJob, location: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Salary" value={newJob.salary} onChange={(e) => setNewJob({...newJob, salary: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                    <input type="text" placeholder="Experience" value={newJob.experience} onChange={(e) => setNewJob({...newJob, experience: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  </div>
                  <input type="text" placeholder="Skills (comma separated)"value={newJob.skills} onChange={(e) => setNewJob({...newJob, skills: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <textarea placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({...newJob, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  <input type="url" placeholder="Apply URL *" value={newJob.applyUrl} onChange={(e) => setNewJob({...newJob, applyUrl: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
                  </div>

                  <button onClick={handleAddJob} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Post Job
            </button>
          </div>
        </div>
      )}

      {showAddCourse && canAddCourses && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-cyan-500/30 shadow-2xl my-8 animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Add Course</h2>
              <button onClick={() => setShowAddCourse(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input type="text" placeholder="Course Title *" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <input type="text" placeholder="Instructor" value={newCourse.instructor} onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <div className="grid sm:grid-cols-3 gap-4">
                <select value={newCourse.category} onChange={(e) => setNewCourse({...newCourse, category: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                  {categories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select value={newCourse.level} onChange={(e) => setNewCourse({...newCourse, level: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <input type="text" placeholder="Duration" value={newCourse.duration} onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              </div>
              <textarea placeholder="Description" value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <input type="url" placeholder="YouTube Playlist *" value={newCourse.youtubePlaylist} onChange={(e) => setNewCourse({...newCourse, youtubePlaylist: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <input type="text" placeholder="Topics (comma separated)" value={newCourse.topics} onChange={(e) => setNewCourse({...newCourse, topics: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
            </div>

            <button onClick={handleAddCourse} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Add Course
            </button>
          </div>
        </div>
      )}


      {showAddGovtJob && canAddJobs && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-2xl w-full border border-orange-500/30 shadow-2xl my-8 animate-slide-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Post Government/PSU Job</h2>
        <button onClick={() => setShowAddGovtJob(false)} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        <input type="text" placeholder="Job Title *" value={newGovtJob.title} onChange={(e) => setNewGovtJob({...newGovtJob, title: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        
        <input type="text" placeholder="Organization (e.g., UPSC, SSC, RRB) *" value={newGovtJob.organization} onChange={(e) => setNewGovtJob({...newGovtJob, organization: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <select value={newGovtJob.category} onChange={(e) => setNewGovtJob({...newGovtJob, category: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none">
            {govtCategories.filter(c => c !== 'All').map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          
          <input type="text" placeholder="Location" value={newGovtJob.location} onChange={(e) => setNewGovtJob({...newGovtJob, location: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        </div>
        
        <input type="text" placeholder="Qualification (e.g., Graduate, 10+2)" value={newGovtJob.qualification} onChange={(e) => setNewGovtJob({...newGovtJob, qualification: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Salary/Pay Scale" value={newGovtJob.salary} onChange={(e) => setNewGovtJob({...newGovtJob, salary: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
          
          <input type="text" placeholder="No. of Vacancies" value={newGovtJob.vacancies} onChange={(e) => setNewGovtJob({...newGovtJob, vacancies: e.target.value})} className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        </div>
        
        <input type="date" placeholder="Last Date to Apply" value={newGovtJob.lastDate} onChange={(e) => setNewGovtJob({...newGovtJob, lastDate: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        
        <textarea placeholder="Description" value={newGovtJob.description} onChange={(e) => setNewGovtJob({...newGovtJob, description: e.target.value})} rows="3" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
        
        <input type="url" placeholder="Official Notification URL *" value={newGovtJob.applyUrl} onChange={(e) => setNewGovtJob({...newGovtJob, applyUrl: e.target.value})} className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-orange-500 focus:outline-none" />
      </div>

      <button onClick={handleAddGovtJob} className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
        Post Govt Job
      </button>
    </div>
  </div>
)}

      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl animate-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Book Counselling</h2>
              <button onClick={() => setShowBooking(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">Schedule a personalized career counselling session.</p>
            
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none" />
              <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                <option>Select Interest Area</option>
                <option>Full Stack Development</option>
                <option>Frontend Development</option>
                <option>Backend Development</option>
                <option>Career Guidance</option>
              </select>
              <select className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none">
                <option>Preferred Time</option>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 7 PM)</option>
              </select>
            </div>

            <button onClick={() => { alert('Counselling booked!'); setShowBooking(false); }} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {showResumeBuilder && <ResumeBuilder onClose={() => setShowResumeBuilder(false)} />}
      {showContactUs && <ContactUs onClose={() => setShowContactUs(false)} />}



      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="text-center mb-8">
          <RotatingTagline />
          <p className="text-lg sm:text-xl text-cyan-300 mb-4">
            Connecting Tier 2 & 3 Students with Top Companies
          </p>



        
          <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
            HRs post jobs directly. Students upskill and apply.
          </p>
        </div>

        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
  <button onClick={() => setActiveTab('jobs')} className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all text-sm sm:text-base ${activeTab === 'jobs' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>
    <Briefcase size={18} />
    <span>Jobs</span>
  </button>
  
  <button onClick={() => setActiveTab('courses')} className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all text-sm sm:text-base ${activeTab === 'courses' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>
    <BookOpen size={18} />
    <span>Courses</span>
  </button>

  <button onClick={() => setActiveTab('govt-psu')} className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all text-sm sm:text-base ${activeTab === 'govt-psu' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>
    <Building2 size={18} />
    <span>Govt & PSU</span>
  </button>

</div>

        {activeTab === 'jobs' && canAddJobs && (
          <div className="flex justify-center mb-8 animate-slide-in">
            <button onClick={() => setShowAddJob(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all text-sm sm:text-base">
              <Plus size={18} />
              <span>Add Job</span>
            </button>
          </div>
        )}

        {activeTab === 'courses' && canAddCourses && (
          <div className="flex justify-center mb-8 animate-slide-in">
            <button onClick={() => setShowAddCourse(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 sm:px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all text-sm sm:text-base">
              <Plus size={18} />
              <span>Add Course</span>
            </button>
          </div>
        )}

        {activeTab === 'govt-psu' && canAddJobs && (
  <div className="flex justify-center mb-8 animate-slide-in">
    <button onClick={() => setShowAddGovtJob(true)} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all text-sm sm:text-base">
      <Plus size={18} />
      <span>Add Govt Job</span>
    </button>
  </div>
)}
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {(activeTab === 'govt-psu' ? govtCategories : categories).map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all text-xs sm:text-base ${
            selectedCategory === cat
    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-110 animate-pulse-slow' :
             'bg-white bg-opacity-10 text-white hover:bg-opacity-20'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center space-x-2 text-cyan-300 mb-8">
          <Filter size={18} />
          <span className="text-sm sm:text-lg">
            {activeTab === 'jobs' ? `${filteredJobs.length} jobs` : `${filteredCourses.length} courses`}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-16 relative z-10">
        {activeTab === 'jobs' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredJobs.map((job, i) => (
              <div key={job.id} style={{animationDelay: `${i * 0.1}s`}} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 hover:border-cyan-500 hover:shadow-2xl transform hover:-translate-y-2 transition-all animate-slide-in">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">{job.category}</div>
                  <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">{job.type}</div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{job.title}</h3>
                <p className="text-cyan-300 font-semibold mb-4 text-sm sm:text-base">{job.company}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                    <MapPin size={14} className="mr-2 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                    <DollarSign size={14} className="mr-2 text-cyan-400 flex-shrink-0" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                    <Clock size={14} className="mr-2 text-cyan-400 flex-shrink-0" />
                    {job.experience}
                  </div>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-purple-500 bg-opacity-30 text-purple-200 px-2 sm:px-3 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{job.postedDate}</span>
                  {canDelete && (
                    <button onClick={() => handleDeleteJob(job.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  )}
                </div>

                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all text-sm sm:text-base">
                  <span>Apply Now</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        ) : activeTab === 'courses' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCourses.map((course, i) => (
              <div key={course.id} style={{animationDelay: `${i * 0.1}s`}} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl overflow-hidden border border-white border-opacity-20 hover:border-cyan-500 hover:shadow-2xl transform hover:-translate-y-2 transition-all animate-slide-in">
                <div className="h-32 sm:h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Youtube size={48} className="text-white opacity-80 animate-pulse-slow" />
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">{course.category}</div>
                    <div className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">{course.level}</div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{course.title}</h3>
                  <p className="text-cyan-300 text-xs sm:text-sm mb-3">{course.instructor}</p>

                  <div className="flex items-center text-gray-300 text-xs sm:text-sm mb-4">
                    <Clock size={14} className="mr-2 text-cyan-400 flex-shrink-0" />
                    {course.duration}
                  </div>

                  <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="bg-green-500 bg-opacity-30 text-green-200 px-2 sm:px-3 py-1 rounded-full text-xs">{topic}</span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className="bg-gray-500 bg-opacity-30 text-gray-200 px-2 sm:px-3 py-1 rounded-full text-xs">+{course.topics.length - 3}</span>
                    )}
                  </div>

                  {canDelete && (
                    <button onClick={() => handleDeleteCourse(course.id)} className="w-full text-red-400 hover:text-red-300 text-xs mb-2">Delete</button>
                  )}

                  <a href={course.youtubePlaylist} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all text-sm sm:text-base">
                    <Youtube size={18} />
                    <span>Watch FREE</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'govt-psu' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredGovtJobs.map((job, i) => (
              <div key={job.id} style={{animationDelay: `${i * 0.1}s`}} className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 hover:border-orange-500 hover:shadow-2xl transform hover:-translate-y-2 transition-all animate-slide-in">
                <div className="flex items-start justify-between mb-4 gap-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">{job.category}</div>
                  {job.lastDate && (
                    <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                      {new Date(job.lastDate) > new Date() ? 'Active' : 'Closed'}
                    </div>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{job.title}</h3>
                <p className="text-orange-300 font-semibold mb-4 text-sm sm:text-base">{job.organization}</p>

                <div className="space-y-2 mb-4">
                  {job.location && (
                    <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                      <MapPin size={14} className="mr-2 text-orange-400 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  )}
                  {job.qualification && (
                    <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                      <Award size={14} className="mr-2 text-orange-400 flex-shrink-0" />
                      {job.qualification}
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                      <DollarSign size={14} className="mr-2 text-orange-400 flex-shrink-0" />
                      {job.salary}
                    </div>
                  )}
                  {job.vacancies && (
                    <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                      <Users size={14} className="mr-2 text-orange-400 flex-shrink-0" />
                      {job.vacancies} Vacancies
                    </div>
                  )}
                  {job.lastDate && (
                    <div className="flex items-center text-gray-300 text-xs sm:text-sm">
                      <Calendar size={14} className="mr-2 text-orange-400 flex-shrink-0" />
                      Last Date: {new Date(job.lastDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{job.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>{job.postedDate}</span>
                  {canDelete && (
                    <button onClick={() => handleDeleteGovtJob(job.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  )}
                </div>

                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all text-sm sm:text-base">
                  <span>View Notification</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            ))}

            {filteredGovtJobs.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Building2 size={64} className="mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400 text-lg">No government jobs posted yet</p>
                {canAddJobs && (
                  <button onClick={() => setShowAddGovtJob(true)} className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    Post First Govt Job
                  </button>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 text-center transform hover:scale-105 transition-all">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Users size={24} className="text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">For Students</h3>
            <p className="text-gray-300 text-sm sm:text-base">Free courses, upskill, and apply directly</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 text-center transform hover:scale-105 transition-all">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Briefcase size={24} className="text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">For HRs</h3>
            <p className="text-gray-300 text-sm sm:text-base">Find talented tier 2 & 3 candidates</p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white border-opacity-20 text-center sm:col-span-2 lg:col-span-1 transform hover:scale-105 transition-all">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
              <Award size={24} className="text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">100% Free</h3>
            <p className="text-gray-300 text-sm sm:text-base">All courses and counselling free</p>
          </div>
        </div>
      </div>

      <footer className="bg-black bg-opacity-30 backdrop-blur-md border-t border-white border-opacity-20 py-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/caspire-logo.png" alt="CAspire" className="w-10 h-10" />
                <h3 className="text-xl font-bold text-white">CAspire</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Empowering Tier 2 & 3 students with free courses and direct job opportunities.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setActiveTab('jobs')} className="text-gray-300 hover:text-cyan-400 transition-colors">Jobs</button></li>
                <li><button onClick={() => setActiveTab('courses')} className="text-gray-300 hover:text-cyan-400 transition-colors">Free Courses</button></li>
                <li><button onClick={() => setShowBooking(true)} className="text-gray-300 hover:text-cyan-400 transition-colors">Counselling</button></li>
                {userRole === 'user' && (
                  <li><button onClick={() => setShowResumeBuilder(true)} className="text-gray-300 hover:text-cyan-400 transition-colors">Resume Builder</button></li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setShowHRRegister(true)} className="text-gray-300 hover:text-cyan-400 transition-colors">HR Registration</button></li>
                <li><button onClick={() => setShowLogin(true)} className="text-gray-300 hover:text-cyan-400 transition-colors">Post Jobs</button></li>
                <li><button onClick={() => setShowContactUs(true)} className="text-gray-300 hover:text-cyan-400 transition-colors">Partner With Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <button 
                onClick={() => setShowContactUs(true)}
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm mb-4 block"
              >
                📧 Contact Us
              </button>
              <div className="flex gap-3">
                <a href="https://linkedin.com/company/caspire" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110">
                  <Linkedin className="text-white" size={18} />
                </a>
                <a href="https://twitter.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-sky-500 p-2 rounded-full hover:bg-sky-600 transition-all transform hover:scale-110">
                  <Twitter className="text-white" size={18} />
                </a>
                <a href="https://instagram.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-110">
                  <Instagram className="text-white" size={18} />
                </a>
                <a href="https://youtube.com/caspire" target="_blank" rel="noopener noreferrer" className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition-all transform hover:scale-110">
                  <Youtube className="text-white" size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-300 text-sm mb-2">© 2025 CAspire - All Rights Reserved</p>
            <p className="text-gray-400 text-xs">Made for Tier 2 & 3 Students</p>
          </div>
        </div>
      </footer>
    </div>
  )}
</>
);
};

export default CAspireJobPortal;
