import React from 'react'

interface ISliderProps {
  children: React.ReactNode;
}

const Slider: React.FC<ISliderProps> = ({ children }) => {
  return (
    <ul className="flex overflow-x-auto overflow-y-hidden scrollbar-hide space-x-4 py-4 pr-4 list-none" style={{ scrollbarWidth: 'none' }}>
      {children}
    </ul>
  )
}

export default Slider