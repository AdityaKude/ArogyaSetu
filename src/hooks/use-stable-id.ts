'use client';

import { useState, useEffect } from 'react';
import { useId } from 'react';

export function useStableId() {
  const id = useId();
  const [stableId, setStableId] = useState('radix-');

  useEffect(() => {
    setStableId(id);
  }, [id]);

  return stableId;
}
