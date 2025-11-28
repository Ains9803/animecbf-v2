/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import {
  getContrastRatio,
  meetsWCAG_AA,
  getComplianceLevel,
  formatContrastRatio,
  COLOR_PALETTE,
} from './contrastChecker';

describe('Color Contrast Checker', () => {
  describe('getContrastRatio', () => {
    it('calculates correct contrast ratio for black on white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('calculates correct contrast ratio for white on black', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('returns 1:1 for identical colors', () => {
      const ratio = getContrastRatio('#ff6b6b', '#ff6b6b');
      expect(ratio).toBeCloseTo(1, 1);
    });
  });

  describe('WCAG AA Compliance - Light Theme', () => {
    const { light } = COLOR_PALETTE;

    it('primary text on primary background meets AA', () => {
      const ratio = getContrastRatio(light.textPrimary, light.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(light.textPrimary, light.bgPrimary)).toBe(true);
    });

    it('secondary text on primary background meets AA', () => {
      const ratio = getContrastRatio(light.textSecondary, light.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(light.textSecondary, light.bgPrimary)).toBe(true);
    });

    it('tertiary text on primary background meets AA', () => {
      const ratio = getContrastRatio(light.textTertiary, light.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(light.textTertiary, light.bgPrimary)).toBe(true);
    });

    it('primary text on secondary background meets AA', () => {
      const ratio = getContrastRatio(light.textPrimary, light.bgSecondary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(light.textPrimary, light.bgSecondary)).toBe(true);
    });

    it('secondary text on secondary background meets AA', () => {
      const ratio = getContrastRatio(light.textSecondary, light.bgSecondary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(light.textSecondary, light.bgSecondary)).toBe(true);
    });

    it('success badge (dark variant) with white text meets AA', () => {
      const ratio = getContrastRatio('#ffffff', light.successDark);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA('#ffffff', light.successDark)).toBe(true);
    });

    it('info badge (dark variant) with white text meets AA', () => {
      const ratio = getContrastRatio('#ffffff', light.infoDark);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA('#ffffff', light.infoDark)).toBe(true);
    });
  });

  describe('WCAG AA Compliance - Dark Theme', () => {
    const { dark } = COLOR_PALETTE;

    it('primary text on primary background meets AA', () => {
      const ratio = getContrastRatio(dark.textPrimary, dark.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.textPrimary, dark.bgPrimary)).toBe(true);
    });

    it('secondary text on primary background meets AA', () => {
      const ratio = getContrastRatio(dark.textSecondary, dark.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.textSecondary, dark.bgPrimary)).toBe(true);
    });

    it('tertiary text on primary background meets AA', () => {
      const ratio = getContrastRatio(dark.textTertiary, dark.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.textTertiary, dark.bgPrimary)).toBe(true);
    });

    it('primary text on secondary background meets AA', () => {
      const ratio = getContrastRatio(dark.textPrimary, dark.bgSecondary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.textPrimary, dark.bgSecondary)).toBe(true);
    });

    it('secondary text on secondary background meets AA', () => {
      const ratio = getContrastRatio(dark.textSecondary, dark.bgSecondary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.textSecondary, dark.bgSecondary)).toBe(true);
    });

    it('success badge (dark variant) with white text meets AA', () => {
      const ratio = getContrastRatio('#ffffff', dark.successDark);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA('#ffffff', dark.successDark)).toBe(true);
    });

    it('info badge (dark variant) with white text meets AA', () => {
      const ratio = getContrastRatio('#ffffff', dark.infoDark);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA('#ffffff', dark.infoDark)).toBe(true);
    });

    it('brand primary color on dark background meets AA', () => {
      const ratio = getContrastRatio(dark.primary, dark.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.primary, dark.bgPrimary)).toBe(true);
    });

    it('brand secondary color on dark background meets AA', () => {
      const ratio = getContrastRatio(dark.secondary, dark.bgPrimary);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(meetsWCAG_AA(dark.secondary, dark.bgPrimary)).toBe(true);
    });
  });

  describe('getComplianceLevel', () => {
    it('returns AAA for high contrast', () => {
      const level = getComplianceLevel('#000000', '#ffffff');
      expect(level).toBe('AAA');
    });

    it('returns AA for medium contrast', () => {
      const level = getComplianceLevel('#5a6268', '#ffffff');
      expect(level).toBe('AA');
    });

    it('returns FAIL for low contrast', () => {
      const level = getComplianceLevel('#cccccc', '#ffffff');
      expect(level).toBe('FAIL');
    });
  });

  describe('formatContrastRatio', () => {
    it('formats ratio correctly', () => {
      expect(formatContrastRatio(4.52)).toBe('4.52:1');
      expect(formatContrastRatio(21)).toBe('21.00:1');
      expect(formatContrastRatio(1.5)).toBe('1.50:1');
    });
  });

  describe('Comprehensive Color Audit', () => {
    it('all light theme text combinations meet WCAG AA', () => {
      const { light } = COLOR_PALETTE;
      const combinations = [
        [light.textPrimary, light.bgPrimary],
        [light.textPrimary, light.bgSecondary],
        [light.textSecondary, light.bgPrimary],
        [light.textSecondary, light.bgSecondary],
        [light.textTertiary, light.bgPrimary],
      ];

      combinations.forEach(([fg, bg]) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });
    });

    it('all dark theme text combinations meet WCAG AA', () => {
      const { dark } = COLOR_PALETTE;
      const combinations = [
        [dark.textPrimary, dark.bgPrimary],
        [dark.textPrimary, dark.bgSecondary],
        [dark.textSecondary, dark.bgPrimary],
        [dark.textSecondary, dark.bgSecondary],
        [dark.textTertiary, dark.bgPrimary],
      ];

      combinations.forEach(([fg, bg]) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });
    });

    it('all badge colors meet WCAG AA', () => {
      const badgeCombinations = [
        ['#ffffff', '#218838'], // Success light theme
        ['#ffffff', '#0056b3'], // Info light theme
        ['#ffffff', '#6c757d'], // Finished
        ['#ffffff', '#287d3c'], // Success dark theme
        ['#ffffff', '#1864ab'], // Info dark theme
      ];

      badgeCombinations.forEach(([fg, bg]) => {
        const ratio = getContrastRatio(fg, bg);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      });
    });
  });
});
