import AsyncStorage from "@react-native-async-storage/async-storage";

export const StorageKeys = {
  USER: "app_user",
  LANGUAGE: "app_language",
  ONBOARDING_DONE: "onboarding_done",
} as const;

export const storage = {
  // Save a plain string
  async setString(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  // Read a plain string
  async getString(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  },

  // Save an object, array, or boolean (auto-converts to JSON)
  async setObject<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  // Read an object, array, or boolean
  async getObject<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  // Delete one key
  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  // Clear all saved keys
  async clearAll(): Promise<void> {
    await AsyncStorage.clear();
  },
};