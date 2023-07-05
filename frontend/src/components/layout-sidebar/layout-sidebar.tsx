import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'layout-sidebar',
  styleUrl: 'layout-sidebar.css',
  shadow: true,
})
export class LayoutSidebar {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
