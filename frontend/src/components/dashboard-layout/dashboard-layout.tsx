import { Component, Host, Prop, Listen, h, State, Watch } from '@stencil/core';
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
  @State() themeMode: string = "dark";
  @State() list: string[] = [];
  @State() updatingData: any = null;
  @State() newItem: any = null;

 

  componentWillRender() {
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
    const newValue = event.detail;

    const oldList: string[] = this.list;
    const newList: string[] = [...oldList, newValue];
    this.list = newList;
  }

  // Delete Item
  @Listen('deleteItem', { target: 'body' })
  onDeleteClick(event: CustomEvent<any>) {
    console.log(event.detail);
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

  changeMode() {
    console.log(this.themeMode);
    this.themeMode = this.themeMode === "dark" ? "light" : "dark";
    
    document.documentElement.classList.toggle("dark");
    document.documentElement.classList.contains("dark")
      ? localStorage.setItem("dark", "true")
      : localStorage.removeItem("dark");
    
  }

  render() {
    return (
      <div>
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
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

        <div class="lg:pl-96">
          <main class="p-5 border">
            <div class="flex items-center justify-between border-b mb-5 pb-5">
              <button-field
                content={'Add New'}
                type="button"
                btnSize="md"
                className="btn-primary ml-5"
              ></button-field>
              <div> 
                {this.themeMode === "dark" ? (
                  <box-icon
                    name="sun"
                    color="green"
                    class="cursor-pointer"
                    onClick={this.changeMode}
                  ></box-icon>
                ) : (
                  <box-icon
                    name="moon"
                    color="green"
                    class="cursor-pointer"
                    onClick={this.changeMode}
                  ></box-icon>
                )}
                {this.themeMode}
              </div>
            </div>
            <div class="px-4 sm:px-6 lg:px-8 my-4  ">
              <div class="mb-10">
                <stacked-chart></stacked-chart>
              </div>
              <div>
                <table-list list={this.list} listTitles={listTitles}></table-list>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
