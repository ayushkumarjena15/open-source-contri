/**
 * Observer / Pub-Sub Design Pattern
 * An event emitter facilitating decoupled publish-subscribe communication.
 */

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Subscribes a listener to an event.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(listener);

    // Return unsubscription handle
    return () => this.unsubscribe(event, listener);
  }

  /**
   * Alias for subscribe
   */
  on(event, listener) {
    return this.subscribe(event, listener);
  }

  /**
   * Subscribes a listener that will only be invoked once.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  once(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }

    const wrapper = (...args) => {
      this.unsubscribe(event, wrapper);
      listener.apply(this, args);
    };

    return this.subscribe(event, wrapper);
  }

  /**
   * Unsubscribes a listener from an event.
   * @param {string} event - Event name
   * @param {Function} listener - Callback function to remove
   * @returns {boolean} True if removed, false otherwise
   */
  unsubscribe(event, listener) {
    if (!this.events.has(event)) return false;
    const listeners = this.events.get(event);
    const deleted = listeners.delete(listener);
    if (listeners.size === 0) {
      this.events.delete(event);
    }
    return deleted;
  }

  /**
   * Alias for unsubscribe
   */
  off(event, listener) {
    return this.unsubscribe(event, listener);
  }

  /**
   * Publishes an event to all registered listeners.
   * @param {string} event - Event name
   * @param {...*} args - Arguments passed to listeners
   * @returns {number} Count of listeners notified
   */
  publish(event, ...args) {
    if (!this.events.has(event)) return 0;
    const listeners = Array.from(this.events.get(event));
    for (const listener of listeners) {
      listener(...args);
    }
    return listeners.length;
  }

  /**
   * Alias for publish
   */
  emit(event, ...args) {
    return this.publish(event, ...args);
  }

  /**
   * Returns listener count for given event
   * @param {string} event 
   * @returns {number}
   */
  listenerCount(event) {
    if (!this.events.has(event)) return 0;
    return this.events.get(event).size;
  }

  /**
   * Clears all listeners for an event or all events
   * @param {string} [event] 
   */
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

module.exports = EventEmitter;
