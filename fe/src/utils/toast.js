export function addToast({ type, text }) {
  const event = new CustomEvent('addToast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
