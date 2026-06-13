function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createSessionRepository({ storageKey, initialItems }) {
  const read = () => {
    const value = sessionStorage.getItem(storageKey);
    if (!value) {
      const items = clone(initialItems);
      sessionStorage.setItem(storageKey, JSON.stringify(items));
      return items;
    }

    try {
      return JSON.parse(value);
    } catch {
      return clone(initialItems);
    }
  };

  const write = (items) => {
    sessionStorage.setItem(storageKey, JSON.stringify(items));
    return clone(items);
  };

  return {
    async list() {
      return clone(read());
    },
    async create(item) {
      const items = [clone(item), ...read()];
      write(items);
      return clone(item);
    },
    async update(id, updates) {
      const items = read().map((item) => (item.id === id ? { ...item, ...clone(updates) } : item));
      write(items);
      return clone(items.find((item) => item.id === id));
    },
    async remove(id) {
      write(read().filter((item) => item.id !== id));
      return { id };
    },
    async replace(items) {
      return write(items);
    },
  };
}
