import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dashboard-layout',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class DashboardLayout {
  @Prop({ mutable: true }) userName: string;

  changeState() {
    this.userName = this.userName === 'Murat' ? 'Cihan' : 'Murat';
  }

  render() {
    return (
      <div>
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
            <div class="flex h-16 shrink-0 items-center">
              <img
                class="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
            </div>
            <div class="flex flex-1 flex-col">
              <new-expense></new-expense>
            </div>
          </div>
        </div>

        <div class="lg:pl-96">
          <button type="button" class="-m-2.5 p-2.5 text-gray-700 ">
            <span class="sr-only">Open sidebar</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          <main class="p-10 border border-red-500">
            <div class="px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center">
              <stacked-chart></stacked-chart>
              <table-list></table-list>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
