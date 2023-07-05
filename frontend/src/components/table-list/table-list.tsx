import { Component, Host, Prop, State, Event, EventEmitter, h } from '@stencil/core';
import 'boxicons';
import { urls } from '../../constants/constant';
@Component({
  tag: 'table-list',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class TableList {
  @Prop({ mutable: true }) userName: string;
  @Prop({ mutable: true }) list: string[] = [];
  @Prop({ mutable: true }) colSpan: number =
    Object.keys(this.list?.length > 0 && this.list[0]).length + 1;

  // updateItem(row) {
  //   console.log(row);
  // }

  @Event({ bubbles: true, composed: true }) updateLinkItem: EventEmitter<any>;
  onUpdateLinkClick(row: any) {
    this.updateLinkItem.emit(row);
  }

  @Event({ bubbles: true, composed: true }) deleteItem: EventEmitter<any>;
  onDeleteLinkClick(row: any) {
    this.deleteItem.emit(row);
  }

  renderTableRows = () => {
    return this.list?.map((row, index) => {
      const filteredByKey = Object.fromEntries(
        Object.entries(row).filter(([key, value]) => key !== 'relatedId'),
      );

      let columns = Object.values(filteredByKey);
      return (
        <tr key={index}>
          {columns.map((column, index) => {
            return (
              index !== 0 && (
                <td
                  key={index}
                  // onClick={() => handleClick(column)}
                  //  class={` ${column.visible ? 'visible' : 'hidden'}`}
                >
                  <span class="flex items-center cursor-pointer">
                    {typeof column === 'boolean' ? (
                      column === true ? (
                        <p class="text-green-600">active</p>
                      ) : (
                        <p class="text-red-600">passive</p>
                      )
                    ) : (
                      <span>
                        {/* <span class="inline md:hidden">
                          <b>{titleList[index - 1]} : </b> {column}
                        </span> */}
                        <span class="hidden md:inline">{column}</span>
                      </span>
                    )}
                  </span>
                </td>
              )
            );
          })}
          <td class="text-right">
            <span class="flex text-xl ">
              <button-field
                btnSize="xs"
                content={<box-icon name="edit-alt" color="green"></box-icon>}
                className="btn-basic mr-3 md:mr-3 "
                onClick={() => this.onUpdateLinkClick(row)}
              ></button-field>

              <button-field
                btnSize="xs"
                content={<box-icon name="trash" color="red"></box-icon>}
                className="btn-basic"
                onClick={() => this.onDeleteLinkClick(row)}
              ></button-field>
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
          <tbody>{this.list ? this.renderTableRows() : <no-data colSpan={this.colSpan} />}</tbody>
        </table>
      </Host>
    );
  }
}
