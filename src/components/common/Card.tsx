// src/components/common/Card.tsx
interface CardProps {
    children: React.ReactNode
    className?: string
  }
  
  export function Card({ children, className = '' }: CardProps) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        {children}
      </div>
    )
  }