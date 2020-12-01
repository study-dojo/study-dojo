import { Selector } from 'testcafe';

class CalenderPage {
  constructor() {
    this.pageId = '#my-calender-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const calenderPage = new CalenderPage();
