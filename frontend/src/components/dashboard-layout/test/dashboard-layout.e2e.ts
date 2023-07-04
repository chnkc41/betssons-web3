import { newE2EPage } from '@stencil/core/testing';

describe('dashboard-layout', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dashboard-layout></dashboard-layout>');

    const element = await page.find('dashboard-layout');
    expect(element).toHaveClass('hydrated');
  });
});
