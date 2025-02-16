import { useState ,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BarChart2, Menu, X, Sparkles } from 'lucide-react';


function NavLink({ to, children, icon: Icon }) {
    const location = useLocation();
    const isActive = location.pathname === to;
  
    return (
      <Link to={to} className="relative group">
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
          ${isActive 
            ? 'text-white bg-gradient-to-r from-violet-600/30 to-fuchsia-600/30 backdrop-blur-md' 
            : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
          <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 
            ${isActive ? 'text-violet-300' : 'text-white/70'}`} />
          <span>{children}</span>
        </div>
        {isActive && (
          <motion.div 
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-400 to-fuchsia-400"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  }
        
 export default function MainLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
  
    return (
      <div className="min-h-screen bg-[#0A0F1E] relative overflow-hidden">
        {/* Animated background gradients */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(124, 58, 237, 0.2) 0%, 
              rgba(236, 72, 153, 0.2) 25%, 
              rgba(99, 102, 241, 0.2) 50%, 
              rgba(16, 185, 129, 0.2) 75%, 
              transparent 100%)`,
            transition: 'background 0.3s ease',
          }}
        />
        
        {/* Animated orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -70, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
          />
        </div>
  
        <nav className="bg-black/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 tracking-tight">
                  Competitor Analysis
                </h1>
              </div>
  
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <NavLink to="/" icon={FileText}>Upload</NavLink>
                <NavLink to="/analysis/latest" icon={BarChart2}>Analysis</NavLink>
              </div>
  
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </motion.button>
              </div>
            </div>
          </div>
  
          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10"
              >
                <div className="px-4 py-2 space-y-1 bg-black/20 backdrop-blur-xl">
                  <NavLink to="/" icon={FileText}>Upload</NavLink>
                  <NavLink to="/analysis/latest" icon={BarChart2}>Analysis</NavLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
  
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={useLocation().pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gradient-to-br from-black/30 to-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }