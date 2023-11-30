const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Services Page Load Time and Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('safari').build();
    });

    it('should load the Services page within acceptable time', async () => {
        const startTime = new Date();

        await driver.get('http://localhost:3000/services');
        await driver.wait(until.elementLocated(By.css('.container11')), 10000);
        const endTime = new Date();
        const loadTime = endTime - startTime;
        console.log(`Load time: ${loadTime} ms`);
        assert(loadTime < 10000);
    });

    it('should display the company logo', async () => {
        let logo = await driver.findElement(By.css('.company-logo'));
        assert(await logo.isDisplayed());
    });

    it('should display the main services section', async () => {
        let mainServices = await driver.findElement(By.css('.container11'));
        assert(await mainServices.isDisplayed());
    });

    it('should display the value-added services section', async () => {
        let valueAddedServices = await driver.findElement(By.css('.container9'));
        assert(await valueAddedServices.isDisplayed());
    });

    after(async () => {
        await driver.quit();
    });
});
