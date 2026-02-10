import React from 'react';
import { PERSONALIZED_REASONS } from '../constants';

const PersonalizedReasons: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <h2 className="text-3xl md:text-4xl font-romantic text-center text-pink-600 mb-8">
        ¿Por qué quiero que seas mi San Valentín?
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PERSONALIZED_REASONS.map((reason, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-pink-100 hover:border-pink-300 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">
                {reason.icon}
              </div>
              <p className="text-gray-700 text-lg font-medium leading-relaxed">
                {reason.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PersonalizedReasons;
