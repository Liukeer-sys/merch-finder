import { Icon } from './Icon';
export function OutlineButton({ url, label }: { url?: string; label: string }) {
  return url ? <a className="outline-button" href={url} target="_blank" rel="noopener noreferrer">{label}<Icon name="external"/></a>
    : <button className="outline-button" disabled>{label}<Icon name="external"/></button>;
}
