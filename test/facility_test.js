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

    //Navbar Testing
    it('should navigate to the Services page when clicked', async () => {
        let servicesLink = await driver.findElement(By.linkText('Services'));
        await servicesLink.click();
        await driver.wait(until.urlContains('/services'), 10000); 
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/services');
    
        await driver.get('http://localhost:3000/facility'); 
    });

    it('should navigate to the Home page when clicked', async () => {
        let homeButton = await driver.findElement(By.css('.company-logo')); // Adjust the selector
        await homeButton.click();
        await driver.wait(until.urlContains('/home'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/home');
    
        await driver.get('http://localhost:3000/services'); 
    });

    it('should navigate to the Careers page when clicked', async () => {
        let careersLink = await driver.findElement(By.linkText('Careers'));
        await careersLink.click();
        await driver.wait(until.urlContains('/career'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/careers');
    
        await driver.get('http://localhost:3000/facility');
    });

    it('should navigate to the Contact Us page when clicked', async () => {
        let quotesLink = await driver.findElement(By.linkText('Contact Us'));
        await quotesLink.click();
        await driver.wait(until.urlContains('/quotes'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/quotes');
    
        await driver.get('http://localhost:3000/facility');
    });

    after(async () => {
        await driver.quit();
    });
});
