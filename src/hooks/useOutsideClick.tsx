import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler: () => void,
  listenCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement>();

useEffect(() => {
  function handleClickOrTouch(e: MouseEvent | TouchEvent) {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      handler();
    }
  }

  // Add event listeners for both mousedown and touchstart
  document.addEventListener('mousedown', handleClickOrTouch, listenCapturing);
  document.addEventListener('touchstart', handleClickOrTouch, listenCapturing);

  // Clean up on unmount
  return () => {
    document.removeEventListener('mousedown', handleClickOrTouch, listenCapturing);
    document.removeEventListener('touchstart', handleClickOrTouch, listenCapturing);
  };
}, [listenCapturing, handler]);


  return ref;
}
