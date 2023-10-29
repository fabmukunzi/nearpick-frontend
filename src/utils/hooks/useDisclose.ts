import { useCallback, useState } from 'react'

interface DiscloseState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useDisclose = (initialState = false): DiscloseState => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => {
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const toggle = () => {
    setIsOpen((prevState) => !prevState)
  }

  return { isOpen, open, close, toggle }
}

export default useDisclose