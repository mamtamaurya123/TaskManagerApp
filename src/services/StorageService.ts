import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageValue = string | object | null;

const StorageService = {
  set: async (key: string, value: StorageValue): Promise<void> => {
    const serialized =
      typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
    await AsyncStorage.setItem(key, serialized);
  },

  get: async <T>(key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  },

  remove: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },

  clearAll: async (): Promise<void> => {
    await AsyncStorage.clear();
  },
};

export default StorageService;
