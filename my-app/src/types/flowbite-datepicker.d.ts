declare module 'flowbite-datepicker' {
  export interface DatepickerOptions {
    autohide?: boolean;
    format?: string;
    maxDate?: string;
    minDate?: string;
    orientation?: string;
    buttons?: boolean;
    autoSelectToday?: boolean;
    title?: string;
    rangePicker?: boolean;
  }

  export interface DatepickerInstance {
    setDate(date: Date | string): void;
    getDate(): Date;
    show(): void;
    hide(): void;
    destroy(): void;
  }

  export class Datepicker implements DatepickerInstance {
    constructor(element: HTMLElement, options?: DatepickerOptions);
    setDate(date: Date | string): void;
    getDate(): Date;
    show(): void;
    hide(): void;
    destroy(): void;
  }

  export interface DatepickerInterface extends DatepickerInstance {}
}
