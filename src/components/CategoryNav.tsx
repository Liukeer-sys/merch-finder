import { categories, type Category } from '../types/artist';
export function CategoryNav({ value, onChange, items = categories }: { value: Category; onChange: (value: Category) => void; items?: readonly typeof categories[number][] }) {
  return <nav className="filters" aria-label="音乐分类">{items.map(({ id, en, zh }) =>
    <button key={id} className={`filter ${value === id ? 'active' : ''}`} aria-pressed={value === id} onClick={() => onChange(id)}><span>{en}</span>{' '}<span className="filter-label-zh">{zh}</span></button>
  )}</nav>;
}
