import { IconButton } from './ui/IconButton';
export function SaveButton({ saved, onToggle }: { saved: boolean; onToggle: () => void }) {
  return <IconButton icon="saved" label={saved ? '取消收藏艺人' : '收藏艺人'} aria-pressed={saved} className={saved ? 'is-saved' : ''} onClick={onToggle}/>;
}
