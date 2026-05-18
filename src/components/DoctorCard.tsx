import React, { useState } from 'react'
import useInView from '../hooks/useInView'
import Avatar from './Avatar'
import StarRating from './StarRating'

const COLORS: Record<string,string> = {
  primary: '#0A5C45', primaryLight: '#12755A', primaryPale: '#E8F5F0', accent: '#E8A838', border: '#E5E9EF', surface: '#F8FAFB', dark: '#1A1F2E', muted: '#6B7280', success: '#2DA76A', white: '#FFFFFF'
}

const DoctorCard: React.FC<any> = ({ doctor, onBook, delay = 0 }) => {
  const [hovered, setHovered] = useState(false)
  const [btnHover, setBtnHover] = useState(false)
  const [ref, inView] = useInView(0.1)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flex flex-col gap-4 rounded-[20px] border bg-white p-5 transition-all duration-300 ${
        hovered
          ? 'border-primary/80 shadow-[0_16px_40px_rgba(10,92,69,0.14)] -translate-y-1 scale-[1.01]'
          : 'border-[#E5E9EF] shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex gap-3">
        <Avatar initials={doctor.img} color={doctor.color} size={54} pulse={hovered} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sm text-[#1A1F2E]">{doctor.name}</span>
            {doctor.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primaryPale px-2.5 py-1 text-[10px] font-semibold text-primary">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.2 5.7L6.5 2.3" stroke={COLORS.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-primary">{doctor.specialty}</div>
          <div className="text-xs text-[#6B7280]">{doctor.sub} · {doctor.exp} yrs exp</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={doctor.rating} />
        <span className="text-sm font-semibold text-[#1A1F2E]">{doctor.rating}</span>
        <span className="text-xs text-[#6B7280]">({doctor.reviews} reviews)</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.72 3.5 6.5 3.5 6.5s3.5-3.78 3.5-6.5C9.5 2.57 7.93 1 6 1zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill={COLORS.muted} />
        </svg>
        <span>{doctor.location}</span>
        <span className="text-[#E5E9EF]">·</span>
        <span>{(doctor.languages || []).join(', ')}</span>
      </div>

      <div className="flex items-center justify-between rounded-[14px] bg-surface p-3">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">NEXT AVAILABLE</div>
          <div className="mt-1 text-sm font-bold text-success">{doctor.nextSlot}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">CONSULTATION</div>
          <div className="mt-1 text-sm font-bold text-[#1A1F2E]">₦{doctor.price?.toLocaleString()}</div>
        </div>
      </div>

      <button
        onClick={() => onBook?.(doctor)}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        className={`w-full rounded-[10px] px-0 py-3 text-sm font-semibold text-white transition duration-200 ${btnHover ? 'bg-primaryLight scale-[1.02]' : 'bg-primary'}`}
      >
        Book Appointment
      </button>
    </div>
  )
}

export default DoctorCard
