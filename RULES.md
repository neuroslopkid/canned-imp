# Rules

- `render()` is async — it wraps rendering in `await act(...)` to flush state updates and effects synchronously. Always await it: `const screen = await render(<Component />);`.
  