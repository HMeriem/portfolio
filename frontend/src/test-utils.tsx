import { render, renderHook } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Wrapper } from './test-wrapper';

function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: Wrapper, ...options });
}

function renderHookWithProviders<T>(hook: () => T) {
  return renderHook(hook, { wrapper: Wrapper });
}

export { renderWithProviders, renderHookWithProviders };
