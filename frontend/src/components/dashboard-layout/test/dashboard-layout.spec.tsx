import { newSpecPage } from '@stencil/core/testing';
import { DashboardLayout } from '../dashboard-layout';

describe('dashboard-layout', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DashboardLayout],
      html: `<dashboard-layout></dashboard-layout>`,
    });
    expect(page.root).toEqualHtml(`
      <dashboard-layout>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dashboard-layout>
    `);
  });
});
