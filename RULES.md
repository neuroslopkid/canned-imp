# Rules

- `render()` is async — it wraps rendering in `await act(...)` to flush state updates and effects synchronously. Always await it: `const screen = await render(<Component />);`.
- Don't run tests with `npm run test`. It is handled by CI.

## Code style rules

- Every `return` statement have to be separated from preceeding code by newline.
- `.github` CI/CD `.yml` workflows shall have descriptive short `name:` of what action they do, not just actions.
