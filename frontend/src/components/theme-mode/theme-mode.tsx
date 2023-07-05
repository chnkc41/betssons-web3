import { Component, Host, Listen, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'theme-mode',
  shadow: true,
})
export class ThemeMode {
  @State() themeMode: string = 'dark';

  @Listen('click', { capture: true })
  handleClick() {
    this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark';

    const mainContainer = document.querySelector("#mainContainer");

    console.log(mainContainer)
    console.log(mainContainer)


    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.contains('dark')
      ? localStorage.setItem('dark', 'true')
      : localStorage.removeItem('dark');
  }

  render() {
    return (
      <div>
        {this.themeMode === 'dark' ? (
          <box-icon name="sun" color="green" class="cursor-pointer"></box-icon>
        ) : (
          <box-icon name="moon" color="green" class="cursor-pointer"></box-icon>
        )}
      </div>
    );
  }
}
