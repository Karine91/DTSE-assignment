import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AppProvider } from "@/providers/AppProvider";
import { ReactElement } from "react";

const appRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, {
    wrapper: AppProvider,
    ...options,
  });
};

export * from "@testing-library/react";
export { userEvent };
export { appRender as render };
