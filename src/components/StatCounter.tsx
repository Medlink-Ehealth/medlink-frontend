import React from 'react'
import useCountUp from '../hooks/useCountUp'

const StatCounter: React.FC<any> = ({ num = 0, suffix = '', label = '', inView = false }) => {
  const count = useCountUp(num, inView)
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default StatCounter
