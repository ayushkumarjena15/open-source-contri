/**
 * Singleton Design Pattern
 * Ensures a class has only one instance and provides a global point of access to it.
 */

class ConfigManager {
  constructor() {
    if (ConfigManager._instance) {
      return ConfigManager._instance;
    }

    this._config = new Map();
    ConfigManager._instance = this;
  }

  /**
   * Get the singleton instance
   * @returns {ConfigManager}
   */
  static getInstance() {
    if (!ConfigManager._instance) {
      ConfigManager._instance = new ConfigManager();
    }
    return ConfigManager._instance;
  }

  /**
   * Reset instance (mainly for isolated testing environments)
   */
  static resetInstance() {
    ConfigManager._instance = null;
  }

  /**
   * Set configuration key-value
   * @param {string} key 
   * @param {*} value 
   */
  set(key, value) {
    this._config.set(key, value);
    return this;
  }

  /**
   * Get configuration value
   * @param {string} key 
   * @param {*} [defaultValue=null] 
   * @returns {*}
   */
  get(key, defaultValue = null) {
    if (this._config.has(key)) {
      return this._config.get(key);
    }
    return defaultValue;
  }

  /**
   * Check if config has key
   * @param {string} key 
   * @returns {boolean}
   */
  has(key) {
    return this._config.has(key);
  }

  /**
   * Delete config key
   * @param {string} key 
   * @returns {boolean}
   */
  delete(key) {
    return this._config.delete(key);
  }

  /**
   * Clear all configuration
   */
  clear() {
    this._config.clear();
  }

  /**
   * Returns all configuration entries as a plain object
   * @returns {Object}
   */
  toObject() {
    return Object.fromEntries(this._config.entries());
  }
}

module.exports = ConfigManager;
