import { useState, useEffect, RefObject } from 'react';

const useScroll = (ref: RefObject<HTMLUListElement>) => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      // Adjust the threshold as needed (e.g., 100px from the bottom)
      setShowButton(scrollTop < scrollHeight - clientHeight - 100);
    }
  };



  useEffect(() => {
    const objUl = document.getElementById("messageBody") as HTMLUListElement;
    objUl.scrollTop = objUl.scrollHeight;
  }, []);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return { showButton };
};

export default useScroll;
