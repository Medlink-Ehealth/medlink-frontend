import React from 'react'

const Avatar: React.FC<any> = ({ initials = 'A', color = '#1D6FA4', size = 54, pulse = false }) => (
  <div style={{ position: 'relative', flexShrink: 0 }}>
    {pulse && (
      <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: `2px solid ${color}55`, animation: 'pulseRing 2s ease-out infinite' }} />
    )}
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color + '22', border: `2px solid ${color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.28, fontWeight: 700, color,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {initials}
    </div>
  </div>
)

export default Avatar
