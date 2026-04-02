/**
 * Injected script for detecting frontend frameworks (Vue, React, Next, Nuxt, etc.)
 */
export function detectFramework() {
  const r: Record<string, boolean> = {};
  try {
    const app = document.querySelector('#app') as any;
    r.vue3 = !!(app && app.__vue_app__);
    r.vue2 = !!(app && app.__vue__);
    r.react = !!(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ || !!document.querySelector('[data-reactroot]');
    r.nextjs = !!(window as any).__NEXT_DATA__;
    r.nuxt = !!(window as any).__NUXT__;
    if (r.vue3 && app.__vue_app__) {
      const gp = app.__vue_app__.config?.globalProperties;
      r.pinia = !!(gp && gp.$pinia);
      r.vuex = !!(gp && gp.$store);
    }
  } catch {}
  return r;
}
