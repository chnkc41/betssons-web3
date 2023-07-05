import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'no-data',
  // styleUrl: 'no-data.css',
  shadow: true,
})
export class NoData {
  @Prop({ mutable: true }) colSpan: number;

  render() {
    return (
      <tr>
        <td colSpan={this.colSpan}>There is no data.</td>
      </tr>
    );
  }
}
