import {useCallback, useState} from 'react'

export function useGetDimensions() {
  const [height, setHeight] = useState(undefined)
  const [width, setWidth] = useState(undefined)

  const refNode = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
      setWidth(node.getBoundingClientRect().width)
    }
  }, [])

  return [refNode, {height, width}]
}
