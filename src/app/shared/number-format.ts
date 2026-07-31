/**
 * Розбирає число, введене користувачем: прибирає розділювачі розрядів
 * (звичайні та нерозривні пробіли) і приймає кому як десятковий роздільник.
 * Повертає NaN, якщо ввід не є числом.
 */
export function parseNumber(input: unknown): number {
  if (typeof input === 'number') {
    return input;
  }
  if (input === null || input === undefined) {
    return NaN;
  }
  const normalized = String(input).replace(/[\s ]/g, '').replace(',', '.');
  return normalized === '' ? NaN : Number(normalized);
}

/** Групує розряди пробілами: 80000 -> "80 000". */
export function formatNumber(value: number): string {
  if (!isFinite(value)) {
    return '';
  }
  const [integer, fraction] = String(value).split('.');
  const grouped = integer.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  return fraction ? `${grouped}.${fraction}` : grouped;
}

/** Форматує вже введений користувачем рядок, зберігаючи незавершений ввід. */
export function formatInput(input: unknown): string {
  const raw = String(input ?? '').replace(/[\s ]/g, '');
  const match = raw.match(/^(\d*)(.*)$/);
  if (!match) {
    return raw;
  }
  const [, digits, rest] = match;
  return digits.replace(/(\d)(?=(\d{3})+$)/g, '$1 ') + rest;
}
