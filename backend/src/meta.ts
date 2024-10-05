import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const sourcesPath = dirname(fileURLToPath(import.meta.url))
export const rootPath = path.join(sourcesPath, '../')
