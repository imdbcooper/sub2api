import en from '../locales/en'
import ru from '../locales/ru'

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : []
  }

  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key)
  )
}

describe('Russian locale key completeness', () => {
  it('contains every key from the English locale', () => {
    const enKeys = flattenKeys(en)
    const ruKeys = new Set(flattenKeys(ru))
    const missing = enKeys.filter((key) => !ruKeys.has(key))

    expect(missing).toEqual([])
  })
})
