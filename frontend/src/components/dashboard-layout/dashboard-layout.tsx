import { Component, Host, Prop, Listen, h, State } from '@stencil/core';
import { urls } from '../../constants/constant';
import axios from 'axios';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  tag: 'dashboard-layout',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class DashboardLayout {
  @State() apiUrl: string = urls.URL_EXPENSES;
  @State() list: string[] = [];
  @State() updatingData: any = null;

  componentWillLoad() {
    // this.APIData = 'Loading...';
    fetch(urls.URL_EXPENSES)
      .then(response => response.json())
      .then(parsedRes => {
        this.list = parsedRes.expenses;
      })
      .catch(ex => console.log(ex));
  }

  // Get Updating data from table list
  @Listen('updateLinkItem', { target: 'body' })
  updateForm(event: CustomEvent<any>) {
    this.updatingData = event.detail;
  }

  // Add & update item
  @Listen('updateListItem', { target: 'body' })
  onSaveClick(event: CustomEvent<any>) {

    console.log(event.detail)
    
    const newItem = event.detail;
    const oldList: string[] = this.list;
    const newList: string[] = [...oldList, newItem];
    this.list = newList;
  }

  // Delete Item
  @Listen('deleteItem', { target: 'body' })
  onDeleteClick(event: CustomEvent<any>) {
    if (!event.detail.id) {
      return;
    }

    const itemId = event.detail.id;
    const itemName = event.detail.name;

    this.sendDeleteRequest(this.apiUrl, itemId).then(
      () => {
        const itemList = this.list.filter(d => d['id'] !== itemId);
        this.list = itemList;
        this.toastify('', `${itemName} was deleted.`);
      },
      err => {
        console.log(err);
        this.toastify('error', 'There was a problem. Please try again!');
      },
    );
  }

  sendDeleteRequest = async (apiUrl, id) => {
    try {
      const result = await axios.delete(`${apiUrl}/${id}`, {
        withCredentials: false,
        data: {},
        headers: { 'content-type': 'application/json; charset=utf-8' },
      });

      void result;

      return { success: true };
    } catch (ex) {
      console.log(ex);
      return { success: false };
    }
  };

  // Toast
  toastify(messageType, message) {
    Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background:
          messageType === 'error'
            ? 'linear-gradient(to right, #cf3732, #b32f2b)'
            : 'linear-gradient(to right, #73a626, #3c5e09)',
      },
      onClick: function () {}, // Callback after click
    }).showToast();
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
              <new-expense updatingData={this.updatingData}></new-expense>
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
              <table-list list={this.list}></table-list>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
