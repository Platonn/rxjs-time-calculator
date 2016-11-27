import { TimeCalculatorPage } from './app.po';

describe('time-calculator App', function() {
  let page: TimeCalculatorPage;

  beforeEach(() => {
    page = new TimeCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
