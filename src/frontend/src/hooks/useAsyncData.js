import { useCallback, useEffect, useState } from 'react'

/**
 * Runs `fetcher` (a function returning a Promise) whenever it changes and
 * tracks loading / error. Wrap `fetcher` in useCallback so it only changes
 * when its inputs change. Previous data is kept while the next request loads.
 */
export function useAsyncData(fetcher) {
  const [reloadCount, setReloadCount] = useState(0)
  const [result, setResult] = useState({
    fetcher: null,
    reloadCount: -1,
    data: undefined,
    error: null,
  })

  useEffect(() => {
    let cancelled = false
    fetcher().then(
      (data) => {
        if (!cancelled) setResult({ fetcher, reloadCount, data, error: null })
      },
      (error) => {
        if (!cancelled) setResult((prev) => ({ ...prev, fetcher, reloadCount, error }))
      },
    )
    return () => {
      cancelled = true
    }
  }, [fetcher, reloadCount])

  const reload = useCallback(() => setReloadCount((count) => count + 1), [])
  const loading = result.fetcher !== fetcher || result.reloadCount !== reloadCount

  return {
    data: result.data,
    error: loading ? null : result.error,
    loading,
    reload,
  }
}
