export const APP_NAME = 'Taupt' as const
export const BASE_URL = (import.meta as ImportMeta & { env: Record<string, string> }).env['VITE_BASE_URL'] ?? '/'
