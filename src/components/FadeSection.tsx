import React from 'react'
import useInView from '../hooks/useInView'

const FadeSection: React.FC<any> = ({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView(0.1)
  return (
    <div ref={ref} style={{
      transition: `opacity 0.6s ease ${delay}ms, translate 0.6s ease ${delay}ms`,
      opacity: inView ? 1 : 0,
      translate: inView ? '0 0' : '0 24px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export default FadeSection
