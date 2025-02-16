import React from 'react'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  BarChart2, 
  Newspaper 
} from 'lucide-react';

function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-black/80 backdrop-blur-md z-50 border-b border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="logo-container flex items-center cursor-pointer selection:bg-pink-900/30 selection:text-pink-100">
            <TrendingUp className="h-8 w-8 text-pink-500" />
            <span className="ml-2 text-2xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-['Poppins']">
              Competitor Analysis
            </span>
          </div>
          <div className="button-container flex items-center space-x-4">
            <button className="px-6 py-2 text-pink-500 hover:text-pink-400 font-medium rounded-lg border border-pink-500/50 hover:border-pink-400 transition-all duration-300 active:scale-95 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black">
              Login
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 active:scale-95 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
