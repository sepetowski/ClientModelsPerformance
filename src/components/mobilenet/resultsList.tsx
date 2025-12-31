interface Props {
  title: string
  items: { index: number; label: string; prob: number }[]
}

export const ResultsList = ({ title, items }: Props) => {
  if (items.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{title}</p>

      <ol className="space-y-1">
        {items.map((p) => (
          <li
            key={p.index}
            className="flex items-center justify-between rounded-md border px-3 py-1.5 text-sm"
          >
            <span className="truncate">{p.label}</span>
            <span className="text-muted-foreground">{(p.prob * 100).toFixed(2)}%</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
