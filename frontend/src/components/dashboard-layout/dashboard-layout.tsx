import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'dashboard-layout',
  styleUrl: 'dashboard-layout.css',
  shadow: true,
})
export class DashboardLayout {
  @Prop({ mutable: true }) userName: string;

  changeState() {
    this.userName = this.userName === 'Murat' ? 'Cihan' : 'Murat';  
  }

  render() {
    return (
      <Host>
        <my-component some-func={() => console.log('coming from the outside')} />
      </Host>
    );
  }

}
