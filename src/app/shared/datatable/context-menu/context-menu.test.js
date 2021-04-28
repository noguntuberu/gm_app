import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ContextMenu from "./context-menu";

let container = null, menu_tray = null, menu_label = null;
let actions = ['New', 'Delete'], callback = jest.fn(), text = "action";
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
        render(<ContextMenu actions={actions} callback={callback} text={text} />, container);
    });
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("toggles the show_menu state", () => {
    menu_label = document.querySelector(".context-menu-label");
    expect(menu_label.textContent).toBe(text);
});

it("opens menu tray", () => {
    menu_label = document.querySelector(".context-menu-label");
    act(() => {
        menu_label.click();
    });

    menu_tray = document.querySelector(".gm-action-wrap");
    expect(menu_tray).not.toBeNull();
});

it("expects menu item to have same number of items as actions array:", () => {
    menu_label = document.querySelector(".context-menu-label");
    act(() => {
        menu_label.click();
    });

    menu_tray = document.querySelector(".gm-action-context-menu > ul");
    expect(menu_tray.children).toHaveLength(actions.length);
});
