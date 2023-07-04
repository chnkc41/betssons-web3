import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'table-list',
  styleUrl: 'table-list.css',
  shadow: true,
})
export class TableList {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
