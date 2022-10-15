import { computed, Ref } from 'vue';

interface UseFilteredArrayParams<T> {
  array: Ref<T[]>;
  field: Extract<keyof T, string>;
  text: Ref<string>;
  separator?: string;
}

export function useFilteredArray<T>(params: UseFilteredArrayParams<T>) {
  const { array, field, text, separator = '' } = $(params);

  return computed(() =>
    !text.trim()
      ? array.slice()
      : array.filter((item) => {
          if (separator) {
            return text
              .split(separator)
              .map((t) => t.trim().toLowerCase())
              .filter(Boolean)
              .some((t) => (item[field as Extract<keyof T, string>] as string).toLowerCase().includes(t));
          } else {
            return (item[field as Extract<keyof T, string>] as string)
              .toLowerCase()
              .includes(text.trim().toLowerCase());
          }
        }),
  );
}
