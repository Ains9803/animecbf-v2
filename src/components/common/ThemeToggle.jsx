import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { buttonPress } from '../../utils/animations';
import './ThemeToggle.css';

/**
 * ThemeToggle component for switching between light, dark, and system themes
 * Connects to ThemeContext to manage theme state
 */
function ThemeToggle() {
  const { theme, setTheme, effectiveTheme } = useTheme();

  const themes = [
    { value: 'system', label: 'System', icon: FiMonitor },
    { value: 'light', label: 'Light', icon: FiSun },
    { value: 'dark', label: 'Dark', icon: FiMoon },
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="theme-toggle">
      <div className="theme-toggle__buttons" role="group" aria-label="Theme selector">
        {themes.map(({ value, label, icon: Icon }) => (
          <motion.button
            key={value}
            className={`theme-toggle__button ${theme === value ? 'theme-toggle__button--active' : ''}`}
            onClick={() => handleThemeChange(value)}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={theme === value}
            title={label}
            type="button"
            variants={buttonPress}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
          >
            <Icon className="theme-toggle__icon" aria-hidden="true" />
            <span className="theme-toggle__label">{label}</span>
          </motion.button>
        ))}
      </div>
      <div className="theme-toggle__indicator" aria-live="polite" aria-atomic="true">
        Current: {effectiveTheme === 'dark' ? '🌙' : '☀️'}
      </div>
    </div>
  );
}

export default ThemeToggle;
