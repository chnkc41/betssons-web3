import { Component, Element, Host, Listen, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'theme-mode',
  shadow: true,
})
export class ThemeMode {
  @State() themeMode: string = 'dark';

  @Element() el: HTMLElement;

  getListHeight() {
     this.el.classList.toggle("dark");
    console.log(this.el.classList);
    console.log(this.el.children);

  }

  handleClick() {
    this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.contains('dark')
      ? localStorage.setItem('dark', 'true')
      : localStorage.removeItem('dark');
  }

  render() {
    return (
      <Host>
         
          <div class="test">
            {this.themeMode === 'dark' ? (
              <box-icon
                name="sun"
                color="green"
                class="cursor-pointer"
                onClick={this.getListHeight.bind(this)}
              ></box-icon>
            ) : (
              <box-icon
                name="moon"
                color="green"
                class="cursor-pointer"
                onClick={this.handleClick.bind(this)}
              ></box-icon>
            )}
          </div>
         
      </Host>
    );
  }
}
