import { Component, Host, Listen, h, State, Element } from '@stencil/core';
import { urls, listTitles } from '../../constants/constant';
import axios from 'axios';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import 'stencil-apexcharts';

@Component({
  tag: 'dashboard-layout',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class DashboardLayout {
  @State() apiUrl: string = urls.URL_EXPENSES;
  @State() list: string[] = [];
  @State() updatingData: any = null;
  @State() newItem: any = null;
  @State() barControl: boolean = true;
  @State() chartSeries: any[] = [
    {
      name: 'Category A',
      data: [31, 40, 28, 51, 42, 109, 100, 28, 51],
    },
    {
      name: 'Category B',
      data: [11, 32, 45, 32, 34, 52, 41, 45, 32],
    },
    {
      name: 'Category C',
      data: [11, 32, 45, 32, 34, 52, 41, 45, 32],
    },
  ];

  componentWillRender() {
    fetch(urls.URL_EXPENSES)
      .then(response => response.json())
      .then(parsedRes => {
        this.list = parsedRes.expenses;
      })
      .catch(ex => console.log(ex));
  }

  componentDidLoad() {
    if (localStorage.getItem('dark')) {
      this.el.shadowRoot.querySelector('#my-id').classList.toggle('dark');
      this.themeMode = 'dark';
    }
  }

  // Get Updating data from table list
  @Listen('updateLinkItem', { target: 'body' })
  updateForm(event: CustomEvent<any>) {
    this.updatingData = event.detail;
  }

  // Add & update item
  @Listen('updateListItem', { target: 'body' })
  onSaveClick(event: CustomEvent<any>) {
    const newValue = event.detail;

    const oldList: string[] = this.list;
    const newList: string[] = [...oldList, newValue];
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

  sideBarControl() {
    this.barControl = !this.barControl;
  }

  @State() themeMode: string = 'light';

  @Element() el: HTMLElement;

  changeThemeMode() {
    const myElement = this.el.shadowRoot.querySelector('#my-id');
    myElement.classList.toggle('dark');

    this.themeMode = this.themeMode === 'light' ? 'dark' : 'light';

    this.themeMode === 'dark'
      ? localStorage.setItem('dark', 'dark')
      : localStorage.removeItem('dark');
  }

  render() {
    return (
      <Host>
        <div id="my-id">
          <div class="layout">
            {this.barControl && (
              <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
                <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600  px-6 pb-4">
                  <div class="flex h-24 pt-3 shrink-0 items-center justify-center">
                    <img
                      class="h-14 inline-block w-auto"
                      src="https://www.betssongroup.com/wp-content/uploads/2023/01/betsson_logo_60.png"
                      alt=" Betsson Group"
                    />
                  </div>
                  <div class="flex flex-1 flex-col">
                    <new-expense updatingData={this.updatingData}></new-expense>
                  </div>
                </div>
              </div>
            )}
            <div class={this.barControl ? 'lg:pl-96' : ''}>
              <main class="px-0 py-5 sm:px-5 ">
                <div class="flex items-center justify-between border-b dark:border-gray-700 mb-5 pb-5">
                  <div>
                    <box-icon
                      name="menu"
                      color="green"
                      class="cursor-pointer"
                      onClick={this.sideBarControl.bind(this)}
                    ></box-icon>
                  </div>

                  <div>
                    {this.themeMode === 'dark' ? (
                      <box-icon
                        name="sun"
                        color="green"
                        class="cursor-pointer"
                        onClick={this.changeThemeMode.bind(this)}
                      ></box-icon>
                    ) : (
                      <box-icon
                        name="moon"
                        color="green"
                        class="cursor-pointer"
                        onClick={this.changeThemeMode.bind(this)}
                      ></box-icon>
                    )}
                  </div>
                </div>
                <div class="px-4 sm:px-6 lg:px-8 my-4  ">
                  <div class="mb-10">
                    <stacked-chart chartSeries={this.chartSeries}></stacked-chart>
                  </div>
                  <div>
                    <table-list list={this.list} listTitles={listTitles}></table-list>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
