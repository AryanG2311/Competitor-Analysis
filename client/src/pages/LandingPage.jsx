import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  BarChart2, 
  Newspaper 
} from 'lucide-react';

const LandingPage = () => {
  useEffect(() => {
    const logo = document.querySelector('.logo-container');
    const buttons = document.querySelector('.button-container');
    const heroText = document.querySelector('.hero-text');
    const heroPara = document.querySelector('.hero-para');
    const heroButton = document.querySelector('.hero-button');
    const featureCards = document.querySelectorAll('.feature-card');

    [logo, buttons, heroText, heroPara, heroButton].forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
      }
    });

    const initialAnimations = [
      { el: logo, delay: 100, x: -100 },
      { el: buttons, delay: 300, x: 100 },
      { el: heroText, delay: 600 },
      { el: heroPara, delay: 800 },
      { el: heroButton, delay: 1000 }
    ];

    initialAnimations.forEach(({ el, delay, x = 0 }) => {
      if (el) {
        setTimeout(() => {
          el.style.transition = 'all 1s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0)';
        }, delay);
      }
    });

    const animationDirections = [
      { x: -100, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 0 },
      { x: -100, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 0 }
    ];

    featureCards.forEach((card, index) => {
      const direction = animationDirections[index];
      card.style.opacity = '0';
      card.style.transform = `translate(${direction.x}px, ${direction.y}px)`;
      card.style.transition = 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0, 0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    featureCards.forEach(card => observer.observe(card));
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      featureCards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-pink-900/30 selection:text-pink-100">
      <Navbar />
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="hero-text text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 font-['Poppins'] leading-tight selection:bg-pink-900/30 selection:text-pink-100">
              Your Gateway to<br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Financial Freedom
              </span>
            </h1>
            <p className="hero-para text-xl md:text-2xl text-pink-100/80 max-w-3xl mx-auto mb-8 font-light">
              Master the Indian stock market with real-time analytics, expert insights, and comprehensive learning resources.
            </p>
            <a href="http://localhost:5173/upload">
              <button className="hero-button px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 text-lg font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 active:scale-95 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black">
                Begin Your Journey
              </button>
            </a>
          </div>
        </div>
      </div>


    </div>
  );
};

export default LandingPage;
