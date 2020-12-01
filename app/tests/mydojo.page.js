import { Selector } from 'testcafe';

class MyDojoPage {
  constructor() {
    this.pageId = '#my-dojo-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const myDojoPage = new MyDojoPage();
