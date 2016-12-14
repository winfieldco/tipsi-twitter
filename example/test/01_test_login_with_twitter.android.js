import test from 'tape-async'
import helper from './utils/helper'

const { driver, idFromAccessId, idFromXPath, idFromText } = helper

test('Test sample auth with Twitter', async(t) => {

  const loginButton = idFromAccessId('loginButton')

  const loginInput = idFromXPath(`//*/
    android.view.View[2]/android.widget.EditText[1]
  `)

  const passwordInput = idFromXPath(`//*/
    android.view.View[4]/android.widget.EditText[1]
  `)

  const okButton = idFromXPath(`//*/
    android.widget.Button[1]
  `)

  const errorText = idFromAccessId('error_message')
  const twitterResponseText = idFromAccessId('twitter_response')

  try {
    await driver.waitForVisible(loginButton, 70000)
    t.pass('`Login with Twitter` button should be visible')

    await driver.click(loginButton)
    t.pass('User can click `Login with Twitter` button')

    await driver.waitForVisible(loginInput, 60000)
    t.pass('loginInput should be visible')
    await driver.click(loginInput)
    await driver.keys('mail.dmitriy.malets@gmail.com')
    t.pass('User should be able to write login')

    await driver.back()

    await driver.waitForVisible(passwordInput, 5000)
    t.pass('passwordInput should be visible')
    await driver.click(passwordInput)
    await driver.keys('q1W2e3R4t5Y6twi')
    t.pass('User should be able to write password')

    await driver.back()

    await driver.waitForVisible(okButton, 5000)
    t.pass('okButton should be visible')
    await driver.click(okButton)
    t.pass('User can click okButton')

    try {
      await driver.waitForVisible(tipsiResponseText, 30000)
      t.pass('tipsiResponseText should be visible')
      const fbUserId = await driver.getText(tipsiResponseText)
      t.pass('tipsiResponseText == '+fbUserId)
    } catch (error) {
      await driver.waitForVisible(errorText, 5000)
      t.pass('errorText should be visible')
      const fbUserId = await driver.getText(errorText)
      t.pass('errorText == '+fbUserId)
    }
    // to be continued ...
  } catch (error) {
    await helper.screenshot()
    await helper.source()

    throw error
  }
})