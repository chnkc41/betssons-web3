import { newE2EPage } from '@stencil/core/testing';

describe('table-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-list></table-list>');

    const element = await page.find('table-list');
    expect(element).toHaveClass('hydrated');
  });
});
