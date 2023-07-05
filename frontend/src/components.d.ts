/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ButtonField {
        "block": string;
        "btnSize": string;
        "className": string;
        "content": any;
        "disabled": boolean;
        "icon": string;
        "loading": boolean;
        "onClick": any;
        "shape": string;
        "type": string;
    }
    interface DashboardLayout {
    }
    interface InputField {
        "autoFocus": boolean;
        "className": string;
        "disabled": boolean;
        "error": string;
        "id": string;
        "label": string;
        "maxLength": number;
        "minLength": number;
        "name": string;
        "onChange": any;
        "placeholder": string;
        "readonly": boolean;
        "required": boolean;
        "secondLabel": string;
        "type": string;
        "value": string;
    }
    interface MyComponent {
        "first": string;
        "last": string;
        "middle": string;
    }
    interface NewExpense {
        "updatingData": any;
    }
    interface NoData {
        "colSpan": number;
    }
    interface StackedChart {
        "first": string;
        "series": any[];
    }
    interface TableList {
        "colSpan": number;
        "list": string[];
        "userName": string;
    }
}
export interface NewExpenseCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLNewExpenseElement;
}
export interface TableListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLTableListElement;
}
declare global {
    interface HTMLButtonFieldElement extends Components.ButtonField, HTMLStencilElement {
    }
    var HTMLButtonFieldElement: {
        prototype: HTMLButtonFieldElement;
        new (): HTMLButtonFieldElement;
    };
    interface HTMLDashboardLayoutElement extends Components.DashboardLayout, HTMLStencilElement {
    }
    var HTMLDashboardLayoutElement: {
        prototype: HTMLDashboardLayoutElement;
        new (): HTMLDashboardLayoutElement;
    };
    interface HTMLInputFieldElement extends Components.InputField, HTMLStencilElement {
    }
    var HTMLInputFieldElement: {
        prototype: HTMLInputFieldElement;
        new (): HTMLInputFieldElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLNewExpenseElement extends Components.NewExpense, HTMLStencilElement {
    }
    var HTMLNewExpenseElement: {
        prototype: HTMLNewExpenseElement;
        new (): HTMLNewExpenseElement;
    };
    interface HTMLNoDataElement extends Components.NoData, HTMLStencilElement {
    }
    var HTMLNoDataElement: {
        prototype: HTMLNoDataElement;
        new (): HTMLNoDataElement;
    };
    interface HTMLStackedChartElement extends Components.StackedChart, HTMLStencilElement {
    }
    var HTMLStackedChartElement: {
        prototype: HTMLStackedChartElement;
        new (): HTMLStackedChartElement;
    };
    interface HTMLTableListElement extends Components.TableList, HTMLStencilElement {
    }
    var HTMLTableListElement: {
        prototype: HTMLTableListElement;
        new (): HTMLTableListElement;
    };
    interface HTMLElementTagNameMap {
        "button-field": HTMLButtonFieldElement;
        "dashboard-layout": HTMLDashboardLayoutElement;
        "input-field": HTMLInputFieldElement;
        "my-component": HTMLMyComponentElement;
        "new-expense": HTMLNewExpenseElement;
        "no-data": HTMLNoDataElement;
        "stacked-chart": HTMLStackedChartElement;
        "table-list": HTMLTableListElement;
    }
}
declare namespace LocalJSX {
    interface ButtonField {
        "block"?: string;
        "btnSize"?: string;
        "className"?: string;
        "content"?: any;
        "disabled"?: boolean;
        "icon"?: string;
        "loading"?: boolean;
        "onClick"?: any;
        "shape"?: string;
        "type"?: string;
    }
    interface DashboardLayout {
    }
    interface InputField {
        "autoFocus"?: boolean;
        "className"?: string;
        "disabled"?: boolean;
        "error"?: string;
        "id"?: string;
        "label"?: string;
        "maxLength"?: number;
        "minLength"?: number;
        "name"?: string;
        "onChange"?: any;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "secondLabel"?: string;
        "type"?: string;
        "value"?: string;
    }
    interface MyComponent {
        "first"?: string;
        "last"?: string;
        "middle"?: string;
    }
    interface NewExpense {
        "onUpdateListItem"?: (event: NewExpenseCustomEvent<any>) => void;
        "updatingData"?: any;
    }
    interface NoData {
        "colSpan"?: number;
    }
    interface StackedChart {
        "first"?: string;
        "series"?: any[];
    }
    interface TableList {
        "colSpan"?: number;
        "list"?: string[];
        "onDeleteItem"?: (event: TableListCustomEvent<any>) => void;
        "onUpdateLinkItem"?: (event: TableListCustomEvent<any>) => void;
        "userName"?: string;
    }
    interface IntrinsicElements {
        "button-field": ButtonField;
        "dashboard-layout": DashboardLayout;
        "input-field": InputField;
        "my-component": MyComponent;
        "new-expense": NewExpense;
        "no-data": NoData;
        "stacked-chart": StackedChart;
        "table-list": TableList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "button-field": LocalJSX.ButtonField & JSXBase.HTMLAttributes<HTMLButtonFieldElement>;
            "dashboard-layout": LocalJSX.DashboardLayout & JSXBase.HTMLAttributes<HTMLDashboardLayoutElement>;
            "input-field": LocalJSX.InputField & JSXBase.HTMLAttributes<HTMLInputFieldElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "new-expense": LocalJSX.NewExpense & JSXBase.HTMLAttributes<HTMLNewExpenseElement>;
            "no-data": LocalJSX.NoData & JSXBase.HTMLAttributes<HTMLNoDataElement>;
            "stacked-chart": LocalJSX.StackedChart & JSXBase.HTMLAttributes<HTMLStackedChartElement>;
            "table-list": LocalJSX.TableList & JSXBase.HTMLAttributes<HTMLTableListElement>;
        }
    }
}
