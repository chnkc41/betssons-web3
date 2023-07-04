import { newE2EPage } from '@stencil/core/testing';

describe('no-data', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<no-data></no-data>');

    const element = await page.find('no-data');
    expect(element).toHaveClass('hydrated');
  });
});
