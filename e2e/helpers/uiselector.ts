const p = (android: boolean) => (android ? "android=" : "");

export const UiSelector = {
  // ── TEXT ──

  /** Match visible text exactly (case-sensitive)
   * @param arg - The exact text to match
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Text: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().text("${arg}")`,

  /** Match visible text containing a substring (case-sensitive)
   * @param arg - The substring to search for
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  TextContains: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().textContains("${arg}")`,

  /** Match visible text starting with a prefix (case-insensitive)
   * @param arg - The prefix text
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  TextStartsWith: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().textStartsWith("${arg}")`,

  /** Match visible text using a Java regex pattern
   * @param arg - The regex pattern
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  TextMatches: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().textMatches("${arg}")`,

  // ── CONTENT DESCRIPTION ──

  /** Match content-description exactly (case-sensitive)
   * @param arg - The exact description to match
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Description: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().description("${arg}")`,

  /** Match content-description containing a substring
   * @param arg - The substring to search for
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  DescriptionContains: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().descriptionContains("${arg}")`,

  /** Match content-description starting with a prefix (case-insensitive)
   * @param arg - The prefix text
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  DescriptionStartsWith: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().descriptionStartsWith("${arg}")`,

  /** Match content-description using a Java regex pattern
   * @param arg - The regex pattern
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  DescriptionMatches: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().descriptionMatches("${arg}")`,

  // ── CLASS ──

  /** Match widget class name exactly (e.g. "android.widget.Button")
   * @param arg - The fully-qualified class name
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  ClassName: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().className("${arg}")`,

  /** Match widget class name using a Java regex pattern
   * @param arg - The regex pattern
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  ClassNameMatches: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().classNameMatches("${arg}")`,

  // ── RESOURCE ID ──

  /** Match resource ID exactly (e.g. "com.example:id/btn_submit")
   * @param arg - The resource ID
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  ResourceId: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().resourceId("${arg}")`,

  /** Match resource ID using a Java regex pattern
   * @param arg - The regex pattern (e.g. ".*btn_submit$")
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  ResourceIdMatches: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().resourceIdMatches("${arg}")`,

  // ── PACKAGE ──

  /** Match app package name exactly
   * @param arg - The package name (e.g. "com.example.app")
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  PackageName: (arg: string, android: boolean = true) => `${p(android)}new UiSelector().packageName("${arg}")`,

  /** Match app package name using a Java regex pattern
   * @param arg - The regex pattern
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  PackageNameMatches: (arg: string, android: boolean = true) =>
    `${p(android)}new UiSelector().packageNameMatches("${arg}")`,

  // ── STATE (booleans) ──

  /** Match widgets that are checkable
   * @param val - true to match checkable, false to match non-checkable
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Checkable: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().checkable(${val})`,

  /** Match widgets that are currently checked
   * @param val - true to match checked, false to match unchecked
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Checked: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().checked(${val})`,

  /** Match widgets that are clickable
   * @param val - true to match clickable, false to match non-clickable
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Clickable: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().clickable(${val})`,

  /** Match widgets that are long-clickable
   * @param val - true to match long-clickable, false otherwise
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  LongClickable: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().longClickable(${val})`,

  /** Match widgets that are enabled
   * @param val - true to match enabled, false to match disabled
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Enabled: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().enabled(${val})`,

  /** Match widgets that are focusable
   * @param val - true to match focusable, false otherwise
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Focusable: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().focusable(${val})`,

  /** Match widgets that currently have focus
   * @param val - true to match focused, false to match unfocused
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Focused: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().focused(${val})`,

  /** Match widgets that are scrollable
   * @param val - true to match scrollable, false otherwise
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Scrollable: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().scrollable(${val})`,

  /** Match widgets that are currently selected
   * @param val - true to match selected, false otherwise
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Selected: (val: boolean, android: boolean = true) => `${p(android)}new UiSelector().selected(${val})`,

  // ── POSITION ──

  /** Match widget by its child index among siblings (0-based)
   * @param val - The index in the parent's children list
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Index: (val: number, android: boolean = true) => `${p(android)}new UiSelector().index(${val})`,

  /** Match the Nth occurrence matching all preceding criteria (0-based).
   * Use when multiple elements match and you need a specific one.
   * @param val - The instance number
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  Instance: (val: number, android: boolean = true) => `${p(android)}new UiSelector().instance(${val})`,

  // ── HIERARCHY ──

  /** Narrow search to children of a matched parent.
   * Pass a UiSelector expression string WITHOUT the `new UiSelector().` prefix.
   * The prefix is added automatically.
   * @example UiSelector.ChildSelector('text("Submit")')
   * @param childSelector - Chained method calls (e.g. 'className("...").text("...")')
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  ChildSelector: (childSelector: string, android: boolean = true) =>
    `${p(android)}new UiSelector().childSelector(new UiSelector().${childSelector})`,

  /** Start search from the parent of a matched element.
   * Pass a UiSelector expression string WITHOUT the `new UiSelector().` prefix.
   * The prefix is added automatically.
   * @example UiSelector.FromParent('className("android.widget.ListView")')
   * @param selector - Chained method calls to match the child
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Appium-compatible selector expression string */
  FromParent: (selector: string, android: boolean = true) =>
    `${p(android)}new UiSelector().fromParent(new UiSelector().${selector})`,
} as const;

export class UiSelect {
  private parts: string[] = [];

  static init(): UiSelect {
    return new UiSelect();
  }

  // ── TEXT ──

  text(arg: string): UiSelect {
    this.parts.push(`.text("${arg}")`);

    return this;
  }

  textContains(arg: string): UiSelect {
    this.parts.push(`.textContains("${arg}")`);

    return this;
  }

  textStartsWith(arg: string): UiSelect {
    this.parts.push(`.textStartsWith("${arg}")`);

    return this;
  }

  textMatches(arg: string): UiSelect {
    this.parts.push(`.textMatches("${arg}")`);

    return this;
  }

  // ── CONTENT DESCRIPTION ──

  description(arg: string): UiSelect {
    this.parts.push(`.description("${arg}")`);

    return this;
  }

  descriptionContains(arg: string): UiSelect {
    this.parts.push(`.descriptionContains("${arg}")`);

    return this;
  }

  descriptionStartsWith(arg: string): UiSelect {
    this.parts.push(`.descriptionStartsWith("${arg}")`);

    return this;
  }

  descriptionMatches(arg: string): UiSelect {
    this.parts.push(`.descriptionMatches("${arg}")`);

    return this;
  }

  // ── CLASS ──

  className(arg: string): UiSelect {
    this.parts.push(`.className("${arg}")`);

    return this;
  }

  classNameMatches(arg: string): UiSelect {
    this.parts.push(`.classNameMatches("${arg}")`);

    return this;
  }

  // ── RESOURCE ID ──

  resourceId(arg: string): UiSelect {
    this.parts.push(`.resourceId("${arg}")`);

    return this;
  }

  resourceIdMatches(arg: string): UiSelect {
    this.parts.push(`.resourceIdMatches("${arg}")`);

    return this;
  }

  // ── PACKAGE ──

  packageName(arg: string): UiSelect {
    this.parts.push(`.packageName("${arg}")`);

    return this;
  }

  packageNameMatches(arg: string): UiSelect {
    this.parts.push(`.packageNameMatches("${arg}")`);

    return this;
  }

  // ── STATE (booleans) ──

  checkable(val: boolean): UiSelect {
    this.parts.push(`.checkable(${val})`);

    return this;
  }

  checked(val: boolean): UiSelect {
    this.parts.push(`.checked(${val})`);

    return this;
  }

  clickable(val: boolean): UiSelect {
    this.parts.push(`.clickable(${val})`);

    return this;
  }

  longClickable(val: boolean): UiSelect {
    this.parts.push(`.longClickable(${val})`);

    return this;
  }

  enabled(val: boolean): UiSelect {
    this.parts.push(`.enabled(${val})`);

    return this;
  }

  focusable(val: boolean): UiSelect {
    this.parts.push(`.focusable(${val})`);

    return this;
  }

  focused(val: boolean): UiSelect {
    this.parts.push(`.focused(${val})`);

    return this;
  }

  scrollable(val: boolean): UiSelect {
    this.parts.push(`.scrollable(${val})`);

    return this;
  }

  selected(val: boolean): UiSelect {
    this.parts.push(`.selected(${val})`);

    return this;
  }

  // ── POSITION ──

  index(val: number): UiSelect {
    this.parts.push(`.index(${val})`);

    return this;
  }

  instance(val: number): UiSelect {
    this.parts.push(`.instance(${val})`);

    return this;
  }

  // ── HIERARCHY ──

  childSelector(childSelector: string): UiSelect {
    this.parts.push(`.childSelector(new UiSelector().${childSelector})`);

    return this;
  }

  fromParent(selector: string): UiSelect {
    this.parts.push(`.fromParent(new UiSelector().${selector})`);

    return this;
  }

  /** Build the final Java UiSelector string.
   * @param android - If true, prepend 'android=' strategy prefix
   * @returns Complete Appium selector expression */
  build(android: boolean = true): string {
    return `${p(android)}new UiSelector()${this.parts.join("")}`;
  }
}
