import { useEffect } from 'react';
import { useState, useRef } from 'react';

export default function useClickOutside(initialValue) {
  const [visible, setVisible] = useState(initialValue);
  const myref = useRef(null);
  const handleClickOutside = (e) => {
    if (visible && !myref.current.contains(e.target)) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return { visible, setVisible, myref };
}
