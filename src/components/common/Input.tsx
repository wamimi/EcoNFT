// src/components/common/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    type?: string;
  }
  
  export function Input({ 
    label, 
    error, 
    type = 'text',
    className = '',
    ...props 
  }: InputProps) {
    const inputStyles = `
      block w-full rounded-md border-gray-300 shadow-sm
      focus:border-green-500 focus:ring-green-500
      ${error ? 'border-red-300' : ''}
      ${className}
    `
  
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {type === 'textarea' ? (
          <textarea
            className={inputStyles}
            rows={3}
            {...props}
          />
        ) : (
          <input
            type={type}
            className={inputStyles}
            {...props}
          />
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }