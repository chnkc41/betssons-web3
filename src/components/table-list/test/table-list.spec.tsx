import { newSpecPage } from '@stencil/core/testing';
import { TableList } from '../table-list';

describe('table-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableList],
      html: `<table-list></table-list>`,
    });
    expect(page.root).toEqualHtml(`
      <table-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-list>
    `);
  });
});
