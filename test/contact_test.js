const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Contact Us Page Load Time and Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('safari').build();
    });

    it('should load the Contact Us page within acceptable time', async () => {
        const startTime = new Date();

        await driver.get('http://localhost:3000/quotes');
        await driver.wait(until.elementLocated(By.css('.form-container')), 10000);
        const endTime = new Date();
        const loadTime = endTime - startTime;
        console.log(`Load time: ${loadTime} ms`);
        assert(loadTime < 10000);
    });

    it('should display the company logo', async () => {
        let logo = await driver.findElement(By.css('.company-logo'));
        assert(await logo.isDisplayed());
    });

    it('should display the form', async () => {
        let form = await driver.findElement(By.css('.form-container form'));
        assert(await form.isDisplayed());
    });

    it('should display the Google Maps iframe', async () => {
        let mapIframe = await driver.findElement(By.css('.container5 iframe'));
        assert(await mapIframe.isDisplayed());
    });

    after(async () => {
        await driver.quit();
    });
});
