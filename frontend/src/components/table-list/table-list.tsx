import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'table-list',
  styleUrl: 'table-list.css',
  shadow: true,
})
export class TableList {
  @Prop({ mutable: true }) userName: string;
  @Prop() list: string[] = [];
  @Prop({ mutable: true }) colSpan: number = Object.keys(this.list?.length > 0 && this.list[0]).length + 1;

  componentDidLoad() {
    // this.APIData = 'Loading...';
    fetch('http://localhost:3010/devices')
      .then(response => response.json())
      .then(parsedRes => {
        console.log(parsedRes);
        this.list = parsedRes;
      })
      .catch(ex => console.log(ex));
  }

  renderTableRows = () => {
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
          {/* <td class="text-right" width={'100'}>
            <span class="flex text-xl ">
              {updateItem && (
                <Button size="sm" class='btn-basic mr-3 md:mr-3 '>
                  <BiEditAlt class="text-green-700" onClick={() => updateItem(row)} />
                </Button>
              )}

              {onDeleteClick && (
                <Button size="sm" class='btn-basic '>
                <BiTrash
                  class="text-red-700 "
                  onClick={() =>
                    onDeleteClick({
                      id: row.id,
                      name: row.name
                    })
                  }
                />
                </Button>
              )}
            </span>
          </td> */}
        </tr>
      );
    });
  };

  render() {
    return (
      <Host>
        <tbody>{this.list ? this.renderTableRows() : <no-data colSpan={this.colSpan} />}</tbody>
      </Host>
    );
  }
}
