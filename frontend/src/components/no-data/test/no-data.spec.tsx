import { newSpecPage } from '@stencil/core/testing';
import { NoData } from '../no-data';

describe('no-data', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NoData],
      html: `<no-data></no-data>`,
    });
    expect(page.root).toEqualHtml(`
      <no-data>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </no-data>
    `);
  });
});
