import React, { useState, useEffect } from 'react'

const COLORS: Record<string,string> = { primary: '#0A5C45', primaryPale: '#E8F5F0', surface: '#F8FAFB', border: '#E5E9EF', muted: '#6B7280', dark: '#1A1F2E', accentLight: '#FDF3DC', accent: '#E8A838' }

const BookingModal: React.FC<any> = ({ doctor, onClose }) => {
  const [step, setStep] = useState<1|2>(1)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', reason: '', type: 'in-person' })

  useEffect(() => { setTimeout(() => setVisible(true), 10) }, [])

  if (!doctor) return null

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 280)
  }

  const formFields = [
    { key: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
    { key: 'phone', label: 'Phone Number', placeholder: '+234 xxx xxxx xxx', type: 'tel' },
    { key: 'email', label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
  ]

  const summaryRows = [
    ['Doctor', doctor.name],
    ['Date', selectedDate ? `May ${selectedDate.split(' ')[1]}, 2026` : '—'],
    ['Time', selectedTime ?? '—']
  ]

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(10,20,30,0.55)] p-4 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] transition duration-300"
        style={{ transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)', opacity: visible ? 1 : 0 }}
      >
        {!confirmed ? (
          <>
            <div className="flex items-center justify-between gap-4 px-6 pt-5">
              <div>
                <div className="text-lg font-black text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Book Appointment</div>
                <div className="text-sm text-[#6B7280]">with {doctor.name}</div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-surface text-xl text-[#6B7280] transition hover:bg-[#F0F4F1]"
              >
                ×
              </button>
            </div>

            <div className="flex px-6 pt-4">
              {(['Date & Time', 'Details'] as const).map((label, i) => (
                <div key={label} className="flex-1 text-center">
                  <div
                    className="mx-auto mb-2 h-1 rounded-full transition-colors duration-300"
                    style={{
                      width: '80%',
                      background: step > i ? COLORS.primary : step === i + 1 ? COLORS.primary : COLORS.border,
                    }}
                  />
                  <div className={`text-[11px] font-semibold uppercase ${step === i + 1 ? 'text-primary' : 'text-[#6B7280]'}`}>{label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-6 px-6 pb-6">
              {step === 1 && (
                <div className="space-y-6 animate-[slideInRight_0.3s_ease]">
                  <div>
                    <div className="mb-3 text-sm font-semibold text-[#1A1F2E]">Select Date</div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {['Mon 19','Tue 20','Wed 21','Thu 22','Fri 23','Sat 24'].map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`rounded-[10px] px-2 py-2 text-sm font-semibold transition-all duration-200 ${
                            selectedDate === d
                              ? 'scale-[1.04] border border-primary bg-primaryPale text-primary'
                              : 'border border-[#E5E9EF] bg-white text-[#1A1F2E]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-semibold text-[#1A1F2E]">Select Time</div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','4:30 PM'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`rounded-[10px] px-2 py-2 text-xs font-semibold transition-all duration-200 ${
                            selectedTime === t
                              ? 'scale-[1.04] border border-primary bg-primaryPale text-primary'
                              : 'border border-[#E5E9EF] bg-white text-[#1A1F2E]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 text-sm font-semibold text-[#1A1F2E]">Visit Type</div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(['in-person', 'video'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setForm({ ...form, type })}
                          className={`flex items-center justify-center gap-2 rounded-[10px] px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                            form.type === type
                              ? 'scale-[1.03] border border-primary bg-primaryPale text-primary'
                              : 'border border-[#E5E9EF] bg-white text-[#1A1F2E]'
                          }`}
                        >
                          {type === 'in-person' ? '🏥' : '📹'} {type === 'in-person' ? 'In-Person' : 'Video Call'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => selectedDate && selectedTime && setStep(2)}
                    className={`w-full rounded-[12px] px-4 py-3 text-sm font-bold transition duration-200 ${
                      selectedDate && selectedTime
                        ? 'bg-primary text-white hover:bg-primaryLight'
                        : 'cursor-not-allowed bg-[#E5E9EF] text-[#6B7280]'
                    }`}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-[slideInRight_0.3s_ease]">
                  {formFields.map(({ key, label, placeholder, type }) => (
                    <div key={key}>
                      <label className="mb-2 block text-sm font-semibold text-[#1A1F2E]">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...(form as any), [key]: e.target.value })}
                        className="w-full rounded-[10px] border border-[#E5E9EF] bg-white px-3 py-2 text-sm text-[#1A1F2E] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#1A1F2E]">Reason for Visit</label>
                    <textarea
                      placeholder="Briefly describe your symptoms..."
                      value={form.reason}
                      onChange={(e) => setForm({ ...form, reason: e.target.value })}
                      rows={3}
                      className="w-full resize-vertical rounded-[10px] border border-[#E5E9EF] bg-white px-3 py-2 text-sm text-[#1A1F2E] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div className="rounded-[12px] bg-surface p-4 text-sm">
                    <div className="mb-2 font-semibold text-[#1A1F2E]">Appointment Summary</div>
                    {summaryRows.map(([k, v]) => (
                      <div key={k} className="mb-1 flex justify-between text-[#6B7280]">
                        <span>{k}</span>
                        <span className="font-semibold text-[#1A1F2E]">{v}</span>
                      </div>
                    ))}
                    <div className="mt-2 flex justify-between border-t border-[#E5E9EF] pt-2 text-[#6B7280]">
                      <span>Consultation Fee</span>
                      <span className="font-semibold text-[#1A1F2E]">₦{doctor.price?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-[12px] border border-[#E5E9EF] bg-white px-4 py-3 text-sm font-semibold text-[#6B7280] transition hover:-translate-y-0.5"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setConfirmed(true)}
                      className="flex-2 flex-1 rounded-[12px] bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryLight"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6 px-8 py-12 text-center animate-[popIn_0.4s_cubic-bezier(.34,1.56,.64,1)]">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-primaryPale text-white" style={{ animation: 'popIn 0.5s cubic-bezier(.34,1.56,.64,1) 0.1s both' }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7 18l8 8L29 10" stroke={COLORS.primary} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-2xl font-black text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Booking Confirmed!</div>
            <div className="text-sm leading-7 text-[#6B7280]">
              Your appointment with <strong>{doctor.name}</strong> is set for <strong>May {selectedDate?.split(' ')[1]} at {selectedTime}</strong>. Check your email for confirmation.
            </div>
            <div className="rounded-[12px] bg-[var(--accent-light,#FDF3DC)] px-4 py-3 text-sm text-[#8B5E1A]">📋 You'll receive a reminder 1 hour before your appointment</div>
            <button
              onClick={handleClose}
              className="rounded-[12px] bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primaryLight"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingModal
