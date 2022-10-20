let zIndex = $ref(0);

export function useZIndex() {
  const initialZIndex = $ref(2000);
  const currentZIndex = $computed(() => initialZIndex + zIndex);

  const nextZIndex = () => {
    zIndex++;
    return currentZIndex;
  };

  return {
    nextZIndex,
  };
}
