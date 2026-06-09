import * as styles from './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.base} ${styles.variants[variant]} ${className ?? ''}`}
      {...props}
    />
  )
}
