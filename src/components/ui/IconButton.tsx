import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconName; label: string; compact?: boolean };
export function IconButton({ icon, label, compact, className = '', ...props }: Props) {
  return <button type="button" {...props} aria-label={label} className={`${compact ? 'icon-btn' : 'ui-icon-button'} ${className}`}><Icon name={icon}/></button>;
}
