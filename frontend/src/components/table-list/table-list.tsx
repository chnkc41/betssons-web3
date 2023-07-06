import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import 'boxicons';
@Component({
  tag: 'table-list',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class TableList {
  @Prop({ mutable: true }) userName: string;
  @Prop({ mutable: true }) list: string[] = [];
  @Prop({ mutable: true }) listTitles: string[] = [];
  @Prop({ mutable: true }) colSpan: number =
    Object.keys(this.list?.length > 0 && this.list[0]).length + 1;

  @Event({ bubbles: true, composed: true }) updateLinkItem: EventEmitter<any>;
  onUpdateLinkClick(row: any) {
    this.updateLinkItem.emit(row);
  }

  @Event({ bubbles: true, composed: true }) deleteItem: EventEmitter<any>;
  onDeleteLinkClick(row: any) {
    this.deleteItem.emit(row);
  }

  renderTableTitles = () => {
    return (
      <tr>
        {this.listTitles.map(item => {
          return <th> {item} </th>;
        })}
      </tr>
    );
  };

  renderTableRows = () => {
    return this.list?.map((row, index) => {
      const filteredByKey = Object.fromEntries(
        Object.entries(row).filter(([key, value]) => key !== 'relatedId'),
      );

      let columns = Object.values(filteredByKey);
      return (
        <tr key={index}>
          {columns.map((column, columnIndex) => {
            return (
              columnIndex !== 0 && (
                <td key={columnIndex}>
                  <b class="inline md:hidden">{this.listTitles[columnIndex - 1]} </b>
                  {column}
                </td>
              )
            );
          })}
          <td class="text-right">
            <span class="flex flex-col sm:flex-row  text-xl gap-5 ">
              <box-icon
                name="edit-alt"
                color="green"
                class="cursor-pointer"
                onClick={() => this.onUpdateLinkClick(row)}
              ></box-icon>
              <box-icon
                name="trash"
                color="red"
                class="cursor-pointer"
                onClick={() => this.onDeleteLinkClick(row)}
              ></box-icon>
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Host>
        <table>
          <thead>
            {this.listTitles ? this.renderTableTitles() : <no-data colSpan={this.colSpan} />}
          </thead>
          <tbody>{this.list ? this.renderTableRows() : <no-data colSpan={this.colSpan} />}</tbody>
        </table>
      </Host>
    );
  }
}
