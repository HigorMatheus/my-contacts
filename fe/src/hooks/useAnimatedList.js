import { createRef, useCallback, useEffect, useRef, useState } from 'react';

export const useAnimatedList = (initialValue = []) => {
  const [items, setItems] = useState(initialValue);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const animatedRefs = useRef(new Map());
  const animatedEndListeners = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPendingRemovalItemsIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimatedEnd = useCallback((itemId) => {
    const removeListener = animatedEndListeners.current.get(itemId);
    removeListener();
    animatedEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);
    setItems((prevState) => prevState.filter((item) => item.id !== itemId));

    setPendingRemovalItemsIds((prevState) =>
      prevState.filter((id) => itemId !== id),
    );
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListeners = animatedEndListeners.current.has(itemId);
      if (animatedElement && !alreadyHasListeners) {
        const onAnimatedEnd = () => {
          handleAnimatedEnd(itemId);
        };
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimatedEnd);
        };

        animatedElement.addEventListener('animationend', onAnimatedEnd);
        animatedEndListeners.current.set(itemId, removeListener);
      }
    });
  }, [handleAnimatedEnd, pendingRemovalItemsIds]);

  useEffect(() => {
    const removeListeners = animatedEndListeners.current;
    return () => {
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const getAnimatedRefs = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback(
    (renderItem) => {
      return items.map((item) => {
        const isLeaving = pendingRemovalItemsIds.includes(item.id);

        const animatedRef = getAnimatedRefs(item.id);

        return renderItem(item, {
          isLeaving,
          animatedRef,
        });
      });
    },
    [getAnimatedRefs, items, pendingRemovalItemsIds],
  );

  return {
    items,
    setItems,
    renderList,
    handleRemoveItem,
  };
};
