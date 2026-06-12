import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; 

// 2. Define Component Props
interface DeliverySchedulerProps {
  /**
   * The default date to show on initialization.
   */
  initialDate?: Date;
  /**
   * An array of available time slots for a given day.
   */
  timeSlots: string[];
  /**
   * The timezone to be displayed.
   */
  timeZone: string;
  /**
   * Callback function that is triggered when the "Schedule" button is clicked.
   * It returns the selected date and time.
   */
  onSchedule: (dateTime: { date: Date; time: string }) => void;
  /**
   * Callback function that is triggered when the "Cancel" button is clicked.
   */
  onCancel?: () => void;
  /**
   * Optional CSS class name for custom styling.
   */
  className?: string;
}

// 3. Define Variants for Buttons using CVA
const scheduleButtonVariants = cva(
  'relative isolate inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-foreground hover:bg-muted border border-transparent',
        selected: 'text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// 4. Helper function to get days of the week
const getWeekDays = (startDate: Date): Date[] => {
  const days: Date[] = [];
  // Start from Monday (getDay() returns 0 for Sunday, 1 for Monday, etc.)
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);

  for (let i = 0; i < 6; i++) {
    const nextDay = new Date(startOfWeek);
    nextDay.setDate(startOfWeek.getDate() + i);
    days.push(nextDay);
  }
  return days;
};

// 5. Main Component Logic
export const DeliveryScheduler: React.FC<DeliverySchedulerProps> = ({
  initialDate = new Date(),
  timeSlots,
  timeZone,
  onSchedule,
  onCancel,
  className,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(timeSlots[0] || null);
  
  const weekDays = getWeekDays(currentDate);
  const monthYear = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const changeWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };
  
  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      onSchedule({ date: selectedDate, time: selectedTime });
    }
  };

  return (
    <div className={cn('w-full max-w-md rounded-2xl border bg-card p-6 text-card-foreground shadow-lg', className)} style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: '450px' }}>
      <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Date Selection Header */}
        <div>
          <label className="text-sm font-medium text-muted-foreground" style={{ color: '#6b7280', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Appointment Window*</label>
          <div className="mt-2 flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
            <h3 className="font-semibold text-lg" style={{ color: '#111827', margin: 0 }}>{monthYear}</h3>
            <div className="flex items-center space-x-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => changeWeek('prev')} className="rounded-md p-1 hover:bg-muted" style={{ background: '#f3f4f6', padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronLeft size={20} color="#4b5563" />
              </button>
              <button onClick={() => changeWeek('next')} className="rounded-md p-1 hover:bg-muted" style={{ background: '#f3f4f6', padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={20} color="#4b5563" />
              </button>
            </div>
          </div>
        </div>

        {/* Day Selection */}
        <div className="grid grid-cols-6 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
          {weekDays.map((day) => {
            const isSelected = selectedDate.toDateString() === day.toDateString();
            return (
              <div key={day.toISOString()} className="relative flex flex-col items-center">
                <span className="mb-2 text-xs text-muted-foreground" style={{ color: '#6b7280' }}>
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <button
                  onClick={() => handleDateSelect(day)}
                  className={cn(scheduleButtonVariants({ variant: isSelected ? 'selected' : 'default' }), 'h-10 w-10')}
                  style={{
                    width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    ...(!isSelected ? { border: '1px solid #e5e7eb', color: '#111827' } : { color: '#fff', border: 'none' })
                  }}
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="date-selector"
                        className="absolute inset-0 z-0 rounded-lg bg-primary"
                        style={{ background: '#000000' }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{day.getDate()}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Time Selection */}
        <div>
          <p className="text-sm font-medium" style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0, marginBottom: '8px' }}>{timeZone}</p>
          <div className="mt-2 grid grid-cols-3 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '8px' }}>
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={cn(scheduleButtonVariants({ variant: isSelected ? 'selected' : 'default' }))}
                  style={{
                    padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    ...(!isSelected ? { border: '1px solid #e5e7eb', color: '#111827' } : { color: '#fff', border: 'none' })
                  }}
                >
                   <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        layoutId="time-selector"
                        className="absolute inset-0 z-0 rounded-lg bg-primary"
                        style={{ background: '#000000' }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{time}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end border-t pt-4" style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
           <button onClick={onCancel} className={cn(scheduleButtonVariants({variant: 'default'}))} style={{ background: '#f3f4f6', border: 'none', padding: '10px 24px', borderRadius: '8px', color: '#374151', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
           <button onClick={handleSchedule} className={cn(scheduleButtonVariants({variant: 'selected'}))} style={{ background: '#000000', border: 'none', padding: '10px 24px', borderRadius: '8px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>Schedule</button>
        </div>
      </div>
    </div>
  );
};
