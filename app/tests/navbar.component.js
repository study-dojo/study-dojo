import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSigninPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#sign-in-button');
  }

  /** Check that the specified user is currently logged in. */
  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }

  /** Check that someone is logged in, then click items to logout. */
  async logout(testController) {
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Pull down login menu, go to sign up page. */
  async gotoSignupPage(testController) {
    await this.ensureLogout(testController);
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** Go to MyDojo page. */
  async gotoMyDojoPage(testController) {
    await testController.click('#navbar-my-dojo');
  }

  /** Go to Add Session page. */
  async gotoAddSessionPage(testController) {
    await testController.click('#navbar-add-session');
  }

  /** Go to Session List page. */
  async gotoSessionListPage(testController) {
    await testController.click('#navbar-session-list');
  }

  /** Go to Calender page. */
  async gotoCalenderPage(testController) {
    await testController.click('#navbar-calender');
  }
}

export const navBar = new NavBar();
