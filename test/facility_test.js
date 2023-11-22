const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Facility Page Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/facility');
    });

    it('should have the correct page title', async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'South Alps Cold Storage: Facility');
    });

    it('should display the company logo', async () => {
        let logo = await driver.findElement(By.css('.company-logo'));
        assert(await logo.isDisplayed());
    });

    it('should display overlay text in the image section', async () => {
        let overlayText = await driver.findElement(By.css('.overlay p'));
        assert(await overlayText.isDisplayed());
    });

    it('should display the Google Maps iframe', async () => {
        let mapIframe = await driver.findElement(By.css('.container5 iframe'));
        assert(await mapIframe.isDisplayed());
    });

    it('should display the Contact Us section', async () => {
        let contactUsSection = await driver.findElement(By.css('.contact-us'));
        assert(await contactUsSection.isDisplayed());
    });

    it('should display social links', async () => {
        let socialLinks = await driver.findElement(By.css('.social-links'));
        assert(await socialLinks.isDisplayed());
    });

    /*it('should display accreditation images', async () => {
        let accreditationImages = await driver.findElements(By.css('.accreditation-box img'));
        assert(accreditationImages.length > 0);
    });*/

    after(async () => {
        await driver.quit();
    });
});
