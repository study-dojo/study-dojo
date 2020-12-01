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
    await testController.typeText("#topic-field", "HTML");
    await testController.typeText("#className-field", "ICS 314");
    await testController.click("#status-dropdown");
    await testController.click(Selector("option").withText("Sensei"));
    await testController.typeText("#sessionDate-field", "12/10/2020");
    await testController.typeText("#sessionTime-field", "8:00 am");
  }

  /** Asserts that this page is currently displayed. */
  async successfulSubmitIsDisplayed(testController) {
    await testController.click("#add-submit");
    await testController.expect(".swal-title").ok();
  }

  async clickSuccessOKButton(testController) {
    await testController.click("button");
  }
}

export const addSession = new AddSessionPage();
