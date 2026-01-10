import { useQuery } from '@tanstack/react-query'

export const useLabels = (path: string) => {
  return useQuery({
    queryKey: ['labels', path],
    queryFn: async () => {
      const res = await fetch(path)
      if (!res.ok) throw new Error(`Failed to fetch labels from ${path}`)

      const text = await res.text()
      return text
        .split(/\r?\n/)
        .map((l) => l.trim().replace(/_/g, ' '))
        .filter(Boolean)
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
