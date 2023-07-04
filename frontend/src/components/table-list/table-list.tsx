import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'table-list',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class TableList {
  @Prop({ mutable: true }) userName: string;
  @Prop({ mutable: true }) list: string[] = [];
  @Prop({ mutable: true }) colSpan: number = Object.keys(this.list?.length > 0 && this.list[0]).length + 1;

  componentWillLoad() {
    // this.APIData = 'Loading...';
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(parsedRes => {
        console.log(parsedRes.users);
        this.list = parsedRes.users;
      })
      .catch(ex => console.log(ex));
  }

  updateItem(row) {
    console.log(row);
  }

  onDeleteClick(row) {
    console.log(row);
  }

  renderTableRows = () => {
    {
      console.log(this.list);
    }
    return this.list?.map((row, index) => {
      const filteredByKey = Object.fromEntries(Object.entries(row).filter(([key, value]) => key !== 'relatedId'));

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
              <button class="btn-basic mr-3 md:mr-3  text-green-700" onClick={() => this.updateItem(row)}>
                Edit
              </button>

              <button class="btn-basic text-red-700" onClick={() => this.onDeleteClick(row)}>
                {' '}
                Delete{' '}
              </button>
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
