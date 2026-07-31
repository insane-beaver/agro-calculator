import { calcSeedSpacing, calcSeedingRate, round } from './agro-calc';
import { formatInput, formatNumber, parseNumber } from './number-format';

describe('agro-calc', () => {
  it('рахує відстань між насінинами для 70 см / 80 000 нас./га', () => {
    const result = calcSeedSpacing(70, 80000);

    expect(round(result.metersPerSquare)).toBe(1.429);
    expect(round(result.distanceCm)).toBe(17.857);
    expect(round(result.seedsPerMeter)).toBe(5.6);
  });

  it('зворотний розрахунок повертає початкову норму висіву', () => {
    const forward = calcSeedSpacing(70, 80000);
    const back = calcSeedingRate(70, 1, forward.seedsPerMeter);

    expect(round(back.seedsPerHectare, 0)).toBe(80000);
  });

  it('облікова відстань задається в метрах', () => {
    // 56 рослин на 10 м рядка при міжрядді 70 см
    const result = calcSeedingRate(70, 10, 56);

    expect(round(result.seedsPerMeter)).toBe(5.6);
    expect(round(result.seedsPerHectare, 0)).toBe(80000);
  });

  it('вдвічі вужче міжряддя розтягує насіння вдвічі далі в рядку', () => {
    // та сама норма на гектар, але вдвічі більше метрів рядка
    const wide = calcSeedSpacing(70, 80000);
    const narrow = calcSeedSpacing(35, 80000);

    expect(round(narrow.distanceCm)).toBe(round(wide.distanceCm * 2));
    expect(round(narrow.seedsPerMeter)).toBe(round(wide.seedsPerMeter / 2));
  });
});

describe('number-format', () => {
  it('розбирає число з пробілами та комою', () => {
    expect(parseNumber('80 000')).toBe(80000);
    expect(parseNumber('1,5')).toBe(1.5);
    expect(parseNumber('1 000 000')).toBe(1000000);
    expect(parseNumber('')).toBeNaN();
    expect(parseNumber('abc')).toBeNaN();
  });

  it('групує розряди пробілами', () => {
    expect(formatNumber(80000)).toBe('80 000');
    expect(formatNumber(1000000)).toBe('1 000 000');
    expect(formatNumber(999)).toBe('999');
    expect(formatNumber(1234.5)).toBe('1 234.5');
  });

  it('зберігає незавершений ввід під час форматування', () => {
    expect(formatInput('80000')).toBe('80 000');
    expect(formatInput('1000,')).toBe('1 000,');
    expect(formatInput('1000,5')).toBe('1 000,5');
    expect(formatInput('')).toBe('');
  });
});
