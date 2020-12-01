import { Selector } from 'testcafe';

class SessionListPage {
  constructor() {
    this.pageId = '#session-list';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const sessionList = new SessionListPage();
