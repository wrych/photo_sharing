export const logStateChange = <T extends (...args: any[]) => ReturnType<T>>(
  store: any,
  fn: T
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    store.isProcessing = true
    try {
      return await fn(...args)
    } catch (error) {
      throw error
    } finally {
      store.isProcessing = false
    }
  }
}
