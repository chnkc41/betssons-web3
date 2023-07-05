import { Component, Host, Prop, State, h } from '@stencil/core';
import { urls, initialExpensesForm, initialExpensesErrorForm } from '../../constants/constant';
import axios from 'axios';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

@Component({
  tag: 'new-expense',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class NewExpense {
  @Prop({ mutable: true }) updatingData: boolean = false;
  @State() apiUrl: string = urls.URL_EXPENSES;
  // @State() formModel: object = { name: '', expense: '' };
  @State() formModel: {
    id: number;
    name: string;
    description: string;
    amount: string;
    date: string;
  } = initialExpensesForm;
  @State() formErrorModel: {
    name: boolean;
    description: boolean;
    amount: boolean;
    date: boolean;
  } = initialExpensesErrorForm;

  componentDidLoad() {
    this.formModel.id = Math.floor(Math.random() * 99999999);
  }

  onFormSubmit = async (updatingData, e) => {
    e.preventDefault();
    const obj = {
      name: this.formModel.name.trim() === '',
      description: this.formModel.description.trim() === '',
      amount: this.formModel.amount.trim() === '',
      date: this.formModel.date.trim() === '',
    };

    this.formErrorModel = obj;

    if (Object.values(obj).includes(true)) {
      this.toastify('error', 'Please fill the required areas!');
      return;
    } else {
      updatingData ? this.onFormSave(updatingData) : this.onFormSave(null);
    }
  };

  onFormSave = async (updatingData: any) => {
    try {
      const { success } = await this.sendAddOrUpdateRequest(
        this.apiUrl,
        this.formModel,
        updatingData?.id,
      );

      if (!success) {
        this.toastify(
          'error',
          `There was a problem ${
            updatingData ? 'updating' : 'saving'
          } your data. Please try again later.`,
        );
        return;
      } else {
        updatingData
          ? this.toastify('', `${updatingData?.name} updated`)
          : this.toastify('', 'New data added');
      }
    } catch (ex) {
      this.toastify(
        'error',
        `There was a problem ${
          updatingData ? 'updating' : 'saving'
        } your data. Please try again later.`,
      );
    }
  };

  sendAddOrUpdateRequest = async (apiUrl, formModel, itemID) => {
    try {
      const result =
        itemID && itemID
          ? await axios.put(`${apiUrl}/${itemID}`, formModel, {
              withCredentials: false,
              headers: { 'content-type': 'application/json; charset=utf-8' },
            })
          : await axios.post(apiUrl, formModel, {
              withCredentials: false,
              headers: { 'content-type': 'application/json; charset=utf-8' },
            });

      console.log(result);
      console.log(result.data);

      if (result && result.data && result.status === 200) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  clearForm() {
    this.formModel = initialExpensesForm;
  }

  //Change Input
  onChangeInput = e => {
    const name = e.target.name;
    this.formModel[name] = e.target.value;
  };

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
      <div class="new-rest container mx-auto">
        <div class="my-2 py-2 max-w-2xl mx-auto">
          <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 shadow sm:rounded-lg ">
            <div class="rounded-md bg-blue-50 p-4 mb-4">
              <p class="text-sm leading-5 text-blue-700 text-center font-bold">
                {this.updatingData ? 'UPDATE EXPENSE' : 'ADD NEW EXPENSE'}
              </p>
            </div>
            <form>
              <div class="flex flex-col gap-6">
                <input-field
                  name="name"
                  id="name"
                  label={'Name'}
                  placeholder=""
                  maxLength={250}
                  required={true}
                  value={this.formModel.name}
                  onChange={(e: any) => {
                    console.log(e);
                    // const name = e.target.name;
                    // this.formModel[name] = e.target.value
                    this.onChangeInput(e);
                  }}
                />

                <input-field
                  name="description"
                  id="description"
                  label={'Description'}
                  placeholder=""
                  maxLength={250}
                  required={true}
                  value={this.formModel.description}
                  onChange={(e: any) => {
                    this.onChangeInput(e);
                  }}
                />

                <input-field
                  type="number"
                  name="amount"
                  id="amount"
                  label={'Amount'}
                  placeholder=""
                  maxLength={250}
                  required={true}
                  value={this.formModel.amount}
                  onChange={(e: any) => {
                    this.onChangeInput(e);
                  }}
                />

                <input-field
                  type="date"
                  name="date"
                  id="date"
                  label={'Date'}
                  placeholder=""
                  maxLength={250}
                  required={true}
                  value={this.formModel.date}
                  onChange={(e: any) => {
                    console.log(e.target.value);
                    this.onChangeInput(e);
                  }}
                />

                <div class="flex justify-center">
                  <button-field
                    type="button"
                    content="Clear"
                    class="btn-basic"
                    onClick={() => this.clearForm()}
                  ></button-field>

                  <button-field
                    type="button"
                    content={this.updatingData ? 'Update' : 'Save'}
                    class="btn-primary ml-5 rounded-md"
                    onClick={(e: any) => this.onFormSubmit(this.updatingData, e)}
                  ></button-field>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
