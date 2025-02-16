import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, BarChart2, Menu, X, Sparkles } from 'lucide-react';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import LandingPage from './pages/LandingPage';
import './App.css'
import MainLayout from './components/MainLayout';
 

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/analysis/:documentId" element={<AnalysisPage />} />
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
     
    </Router>
  );
}

export default App;