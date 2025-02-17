import AsyncStorage from '@react-native-async-storage/async-storage'

export const getFromStorage = async (key: string): Promise<any | null> => {
  try {
    const item = await AsyncStorage.getItem(key)

    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('[ERROR] getFromStorage:', error)
    return null
  }
}

export const saveToStorage = async (key: string, item: any): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item))

    return true
  } catch (error) {
    console.error(`[ERROR] saveToStorage - key: ${key}`, error)
    return false
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.error('[ERROR] clearStorage:', error)
  }
}
