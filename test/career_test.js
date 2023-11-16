const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');

describe('Careers Page Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('safari').build();
    });

    it('should load careers page successfully', async () => {
        await driver.get('http://localhost:3000/careers');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'South Alps Cold Storage: Careers');
    });

    it('should display the main heading correctly', async () => {
        let heading = await driver.findElement(By.css('.overlay h1')).getText();
        assert.strictEqual(heading, 'Careers');
    });

    it('should display the main overlay paragraph correctly', async () => {
        let paragraph = await driver.findElement(By.css('.overlay p')).getText();
        assert.strictEqual(paragraph, 'Let us help you plan your next career move');
    });

    it('should display the main image correctly', async () => {
        let image = await driver.findElement(By.css('.container11 img'));
        assert(await image.isDisplayed());
    });

        // Testing additional image sections
    it('should display the first image in the image section correctly', async () => {
        let image = await driver.findElement(By.css('.image-section .image-box:nth-child(1) img'));
        assert(await image.isDisplayed());
    });

    it('should display the text for the first image box correctly', async () => {
        let text = await driver.findElement(By.css('.image-section .image-box:nth-child(1) p')).getText();
        assert.strictEqual(text, 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.'); // Replace with actual expected text
    });

    // Testing the Contact Us section
    it('should display the Contact Us header correctly', async () => {
        let contactUsHeader = await driver.findElement(By.css('.contact-us .heading-text')).getText();
        assert.strictEqual(contactUsHeader, 'Contact Us');
    });

    // Testing social links
    it('should display the email section in social links', async () => {
        let emailSection = await driver.findElement(By.css('.social-links .email-1'));
        assert(await emailSection.isDisplayed());
    });

    after(async () => {
        await driver.quit();
    });
});
