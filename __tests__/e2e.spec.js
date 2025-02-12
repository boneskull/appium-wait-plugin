import { remote, command } from 'webdriverio';

const APPIUM_HOST = '127.0.0.1';
const APPIUM_PORT = 31337;
const WDIO_PARAMS = {
  connectionRetryCount: 0,
  hostname: APPIUM_HOST,
  port: APPIUM_PORT,
  path: '/wd/hub',
};
const capabilities = {
  platformName: 'Android',
  'appium:uiautomator2ServerInstallTimeout': '50000',
  'appium:automationName': 'UIAutomator2',
  'appium:app': '/Users/saikrisv/Downloads/VodQA.apk',
};
let driver;

describe('Plugin Test', () => {
  beforeEach(async () => {
    driver = await remote({ ...WDIO_PARAMS, capabilities });
  });

  it('Vertical swipe test', async () => {
    await driver.setWaitPluginTimeout('data', { timeout: 1111, intervalBetweenAttempts: 11 });
    await driver.$('~username').click();
    await driver.$('~username').clearValue();
    await driver.$('~username').setValue('admin');
    await driver.$('~login').click();
    await driver.$('~verticalSwipe').click();
  });

  afterEach(async () => {
    await driver.deleteSession();
  });
});

driver.addCommand(
  'setWaitPluginTimeout',
  command('POST', '/session/:sessionId/waitplugin/timeout', {
    command: 'setWaitPluginTimeout',
    parameters: [
      {
        name: 'data',
        type: 'object',
        description: 'a valid parameter',
        required: true,
      },
    ],
  })
);
