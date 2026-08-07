function initTabs(root: HTMLElement) {
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>(
      '[data-tab-trigger][role="tab"]',
    ),
  );

  const panels = Array.from(
    root.querySelectorAll<HTMLElement>(
      '[role="tabpanel"]',
    ),
  );

  if (!buttons.length || !panels.length) {
    return;
  }

  function activate(index: number, focus = false) {
    buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;

      button.setAttribute(
        "aria-selected",
        active ? "true" : "false",
      );

      button.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === index;

      if (active) {
        panel.removeAttribute("hidden");
        panel.tabIndex = 0;
      } else {
        panel.setAttribute("hidden", "");
        panel.tabIndex = -1;
      }
    });

    if (focus) {
      buttons[index]?.focus();
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      activate(index);
    });

    button.addEventListener("keydown", (event) => {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % buttons.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex =
          (index - 1 + buttons.length) %
          buttons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      activate(nextIndex, true);
    });
  });

  const activeIndex = buttons.findIndex(
    (button) =>
      button.getAttribute("aria-selected") === "true",
  );

  activate(activeIndex >= 0 ? activeIndex : 0);
}

document
  .querySelectorAll<HTMLElement>("[data-tabs]")
  .forEach(initTabs);
