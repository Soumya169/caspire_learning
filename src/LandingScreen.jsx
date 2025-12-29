import React, { useState, useEffect } from 'react';
import { Rocket, Sparkles, TrendingUp } from 'lucide-react';

const LandingScreen = ({ onEnter }) => {
  const [tagline, setTagline] = useState(0);
  const taglines = [
    "Build Your Placement Journey With Us",
    "Build Your Skills With Us",
    "Build Your Future With Us",
    "Build Your Career With Us"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTagline((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [taglines.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(-20px, 20px); }
          75% { transform: translate(-20px, -20px); }
        }
      `}</style>

      <div className="relative z-10 text-center px-6">
        <div className="mb-8 flex justify-center">
          <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-cyan-500/50" style={{animation: 'pulse 2s infinite'}}>
            <img 
              src="/caspire-logo.png" 
              alt="CAspire" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
          CAspire
        </h1>

        <div className="h-20 flex items-center justify-center mb-8">
          <p 
            key={tagline}
            className="text-2xl md:text-3xl text-cyan-300 font-semibold"
            style={{animation: 'fadeIn 0.8s ease-out'}}
          >
            {taglines[tagline]}
          </p>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>

        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center" style={{animation: 'bounce 3s ease-in-out infinite'}}>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-full mb-2 mx-auto w-16 h-16 flex items-center justify-center">
              <Rocket className="text-white" size={32} />
            </div>
            <p className="text-white text-sm">Career Launch</p>
          </div>
          <div className="text-center" style={{animation: 'bounce 3s ease-in-out infinite', animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full mb-2 mx-auto w-16 h-16 flex items-center justify-center">
              <Sparkles className="text-white" size={32} />
            </div>
            <p className="text-white text-sm">Skill Building</p>
          </div>
          <div className="text-center" style={{animation: 'bounce 3s ease-in-out infinite', animationDelay: '0.4s'}}>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full mb-2 mx-auto w-16 h-16 flex items-center justify-center">
              <TrendingUp className="text-white" size={32} />
            </div>
            <p className="text-white text-sm">Growth</p>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110"
          style={{animation: 'pulse 2s infinite'}}
        >
          Click to Enter
        </button>

        <p className="text-gray-300 mt-6 text-sm">
          Empowering Tier 2 & 3 Students • 100% Free Platform
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;