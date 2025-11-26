
import React from 'react';
import { LevainEmotion, getEmotionColor } from '@/logic/levainPetUtils';

interface LevainAvatarProps {
  emotion: LevainEmotion;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LevainAvatar: React.FC<LevainAvatarProps> = ({ emotion, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-40 h-40'
  };

  const colors = getEmotionColor(emotion);
  
  // Simple SVG Jar with dynamic faces
  return (
    <div className={`relative flex items-center justify-center rounded-full ${colors} ${sizeClasses[size]} ${className} transition-all duration-500`}>
      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 fill-current" xmlns="http://www.w3.org/2000/svg">
         {/* Jar Body */}
         <path d="M25,30 Q20,30 20,40 L25,90 Q25,95 50,95 Q75,95 75,90 L80,40 Q80,30 75,30 Z" opacity="0.8" />
         {/* Lid Area */}
         <rect x="22" y="20" width="56" height="10" rx="2" opacity="0.9" />
         
         {/* Faces */}
         <g transform="translate(0, 10)" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            {emotion === 'happy' && (
                <>
                    {/* Eyes */}
                    <circle cx="35" cy="55" r="2" fill="currentColor" />
                    <circle cx="65" cy="55" r="2" fill="currentColor" />
                    {/* Smile */}
                    <path d="M35,65 Q50,75 65,65" />
                    {/* Bubbles */}
                    <circle cx="30" cy="45" r="1" fill="currentColor" opacity="0.5"><animate attributeName="cy" from="45" to="40" dur="2s" repeatCount="indefinite" /></circle>
                    <circle cx="70" cy="42" r="1.5" fill="currentColor" opacity="0.5"><animate attributeName="cy" from="42" to="35" dur="3s" repeatCount="indefinite" /></circle>
                </>
            )}
            
            {emotion === 'hungry' && (
                <>
                     {/* Eyes */}
                    <line x1="30" y1="52" x2="40" y2="58" />
                    <line x1="30" y1="58" x2="40" y2="52" />
                    <line x1="60" y1="52" x2="70" y2="58" />
                    <line x1="60" y1="58" x2="70" y2="52" />
                    {/* Mouth (Straight line) */}
                    <line x1="40" y1="70" x2="60" y2="70" />
                </>
            )}

            {emotion === 'sad' && (
                <>
                    {/* Eyes (Teary) */}
                    <circle cx="35" cy="55" r="2" fill="currentColor" />
                    <circle cx="65" cy="55" r="2" fill="currentColor" />
                    <path d="M65,60 Q62,65 65,70" strokeWidth="1" opacity="0.6" />
                    {/* Mouth (Frown) */}
                    <path d="M35,75 Q50,65 65,75" />
                </>
            )}

             {emotion === 'sleeping' && (
                <>
                    {/* Eyes (Closed) */}
                    <path d="M30,55 Q35,58 40,55" />
                    <path d="M60,55 Q65,58 70,55" />
                    {/* Mouth (Open O) */}
                    <circle cx="50" cy="70" r="3" />
                    {/* Zzz */}
                    <text x="75" y="30" fontSize="10" fill="currentColor" stroke="none" opacity="0.7">Z</text>
                    <text x="82" y="22" fontSize="8" fill="currentColor" stroke="none" opacity="0.5">z</text>
                </>
            )}
            
             {emotion === 'dead' && (
                <>
                    {/* Eyes (X) */}
                    <line x1="30" y1="52" x2="40" y2="58" />
                    <line x1="30" y1="58" x2="40" y2="52" />
                    <line x1="60" y1="52" x2="70" y2="58" />
                    <line x1="60" y1="58" x2="70" y2="52" />
                    {/* Mouth (Flat) */}
                    <line x1="35" y1="70" x2="65" y2="70" />
                </>
            )}
         </g>
      </svg>
    </div>
  );
};

export default LevainAvatar;
