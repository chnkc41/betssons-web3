import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'no-data',
  styleUrl: 'no-data.css',
  shadow: true,
})
export class NoData {
  @Prop({ mutable: true }) colSpan: number; 

  render() {
    return (
      <Host>
        <slot>
          <tr>
            <td colSpan={this.colSpan}>
              {this.colSpan}
            </td>
          </tr>
        </slot>
      </Host>
    );
  }

}
