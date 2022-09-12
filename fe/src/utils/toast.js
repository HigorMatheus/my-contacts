import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export function addToast({ type, text }) {
  toastEventManager.emit('addToast', { type, text });
}
