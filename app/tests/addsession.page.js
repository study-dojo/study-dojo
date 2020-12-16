import { Selector } from 'testcafe';

class AddSessionPage {
  constructor() {
    this.pageId = '#add-study-session';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addNewSession(testController) {
    await testController.typeText('#title-field', 'HTML');
    await testController.typeText('#className-dropdown', 'ICS 314');
    await testController.click(Selector('#date-field'));
  }

  /** Asserts that this page is currently displayed. */
  async successfulSubmitIsDisplayed(testController) {
    await testController.click('#add-submit');
    await testController.expect('.swal-title').ok();
  }

  async clickSuccessOKButton(testController) {
    await testController.click('button');
  }
}

export const addSession = new AddSessionPage();
