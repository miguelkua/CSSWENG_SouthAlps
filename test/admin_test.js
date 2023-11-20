const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Admin/Login Page Load Time and Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should load the Admin/Login page within acceptable time', async () => {
        const startTime = new Date();

        await driver.get('http://localhost:3000/admin'); // Update URL as needed
        await driver.wait(until.elementLocated(By.css('.login-container')), 10000); // Wait for the login container

        const endTime = new Date();
        const loadTime = endTime - startTime;
        console.log(`Load time: ${loadTime} ms`);
        assert(loadTime < 10000);
    });

    it('should display the login form', async () => {
        let loginForm = await driver.findElement(By.css('.login-container form'));
        assert(await loginForm.isDisplayed());
    });

    it('should have input fields for username and password', async () => {
        let usernameInput = await driver.findElement(By.css('input[type="text"]'));
        let passwordInput = await driver.findElement(By.css('input[type="password"]'));
        assert(await usernameInput.isDisplayed() && await passwordInput.isDisplayed());
    });

    it('should have a login button', async () => {
        let loginButton = await driver.findElement(By.css('.login-button'));
        assert(await loginButton.isDisplayed());
    });

    after(async () => {
        await driver.quit();
    });
});
