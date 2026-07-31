/**
 * Агрономічні розрахунки.
 *
 * Базова величина — метри погонні рядка на 1 м² поля:
 *   мп = 1 м² / (міжряддя в метрах) = 100 / міжряддя[см]
 * На 1 га (10 000 м²) припадає 10 000 * мп метрів рядка.
 */

export interface SeedSpacing {
  /** Метрів рядка на 1 м² поля. */
  metersPerSquare: number;
  /** Відстань між насінинами в рядку, см. */
  distanceCm: number;
  /** Насінин на 1 метр погонний рядка. */
  seedsPerMeter: number;
}

export interface SeedingRate {
  /** Метрів рядка на 1 м² поля. */
  metersPerSquare: number;
  /** Насінин (рослин) на 1 метр погонний рядка. */
  seedsPerMeter: number;
  /** Норма висіву / густота, насінин на гектар. */
  seedsPerHectare: number;
}

/**
 * Прямий розрахунок: з норми висіву на гектар — відстань між насінинами.
 *
 * @param rowSpacingCm міжряддя, см
 * @param seedsPerHectare норма висіву, насінин/га
 */
export function calcSeedSpacing(rowSpacingCm: number, seedsPerHectare: number): SeedSpacing {
  const metersPerSquare = 100 / rowSpacingCm;
  const distanceCm = (1000000 / seedsPerHectare) * metersPerSquare;

  return {
    metersPerSquare,
    distanceCm,
    seedsPerMeter: 100 / distanceCm,
  };
}

/**
 * Зворотний розрахунок: з підрахунку рослин на обліковій ділянці — норма висіву на гектар.
 *
 * @param rowSpacingCm міжряддя, см
 * @param countedLengthM облікова відстань уздовж рядка, МЕТРИ
 * @param plantsCounted кількість рослин, порахованих на цій відстані
 */
export function calcSeedingRate(
  rowSpacingCm: number,
  countedLengthM: number,
  plantsCounted: number
): SeedingRate {
  const metersPerSquare = 100 / rowSpacingCm;
  const seedsPerMeter = plantsCounted / countedLengthM;

  return {
    metersPerSquare,
    seedsPerMeter,
    seedsPerHectare: seedsPerMeter * metersPerSquare * 10000,
  };
}

/** Округлення для виводу. */
export function round(value: number, digits = 3): number {
  return +value.toFixed(digits);
}
