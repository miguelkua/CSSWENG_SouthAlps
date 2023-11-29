const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const path = require('path');

describe('Careers Page Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
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

    it('should display the first image in the image section correctly', async () => {
        let imageContainer = await driver.findElement(By.css('.container-careers .card-11:nth-child(1)'));
        let image = await imageContainer.findElement(By.css('img'));
        assert(await image.isDisplayed());
    });
    

    it('should display the text for the first image box correctly', async () => {
        let textContainer = await driver.findElement(By.css('.container-careers .card-11:nth-child(1)'));
        let text = await textContainer.findElement(By.css('p')).getText();
        assert.notStrictEqual(text, '');
    });
    

    it('should display the Contact Us header correctly', async () => {
        let contactUsHeader = await driver.findElement(By.css('.contact-us .heading-text')).getText();
        assert.strictEqual(contactUsHeader, 'Contact Us');
    });

    it('should display the email section in social links', async () => {
        let emailSection = await driver.findElement(By.css('.social-links .email-1'));
        assert(await emailSection.isDisplayed());
    });

    //Navbar Testing
    it('should navigate to the Services page when clicked', async () => {
        let servicesLink = await driver.findElement(By.linkText('Services'));
        await servicesLink.click();
        await driver.wait(until.urlContains('/services'), 10000); 
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/services');
    
        await driver.get('http://localhost:3000/careers'); 
    });

    it('should navigate to the Home page when clicked', async () => {
        let homeButton = await driver.findElement(By.css('.company-logo')); // Adjust the selector
        await homeButton.click();
        await driver.wait(until.urlContains('/home'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/home');
    
        await driver.get('http://localhost:3000/careers'); 
    });

    it('should navigate to the Facility page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Facility'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/facility'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/facility');
    
        await driver.get('http://localhost:3000/careers');
    });

    it('should navigate to the Contact Us page when clicked', async () => {
        let quotesLink = await driver.findElement(By.linkText('Contact Us'));
        await quotesLink.click();
        await driver.wait(until.urlContains('/quotes'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/quotes');
    
        await driver.get('http://localhost:3000/careers');
    });

    after(async () => {
        await driver.quit();
    });
});
