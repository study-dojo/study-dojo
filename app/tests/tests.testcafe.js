import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { myDojoPage } from './mydojo.page';
import { calenderPage } from './calender.page';
import { addSession } from './addsession.page';
import { sessionList } from './sessionlist.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('study-dojo localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test.only('Test study-dojo', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoMyDojoPage(testController);
  await myDojoPage.isDisplayed(testController);
  await navBar.gotoAddSessionPage(testController);
  await addSession.isDisplayed(testController);
  await addSession.addNewSession(testController);
  await addSession.successfulSubmitIsDisplayed(testController);
  await addSession.clickSuccessOKButton(testController);
  await navBar.gotoSessionListPage(testController);
  await sessionList.isDisplayed(testController);
  await navBar.gotoCalenderPage(testController);
  await calenderPage.isDisplayed(testController);
});
