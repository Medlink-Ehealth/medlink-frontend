import React from 'react'

const StarRating: React.FC<{ rating?: number }> = ({ rating = 5 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={i <= Math.round(rating) ? '#E8A838' : '#D1D5DB'}>
        <path d="M6 1l1.35 2.73L10.5 4.27l-2.25 2.19.53 3.1L6 8.01l-2.78 1.55.53-3.1L1.5 4.27l3.15-.54z" />
      </svg>
    ))}
  </span>
)

export default StarRating
