import { useLayoutEffect, useMemo, useRef } from "react";
import { debounce } from "lodash-es";

export function useDebounce(callback, delay) {
  const callbackRef = useRef(callback)
  useLayoutEffect(() => {
    callbackRef.current = callback
  })
  return useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay],
  )
}
