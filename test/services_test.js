const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Services Page Load Time and Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should load the Services page within acceptable time', async () => {
        const startTime = new Date();

        await driver.get('http://localhost:3000/services'); // Update URL as needed
        await driver.wait(until.elementLocated(By.css('.container11')), 10000); // Wait for the main container

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

    //Navbar Testing
    it('should navigate to the Facility page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Facility'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/facility'), 10000); 
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/facility');
    
        await driver.get('http://localhost:3000/services'); 
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
    
        await driver.get('http://localhost:3000/services');
    });

    it('should navigate to the Contact Us page when clicked', async () => {
        let quotesLink = await driver.findElement(By.linkText('Contact Us'));
        await quotesLink.click();
        await driver.wait(until.urlContains('/quotes'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/quotes');
    
        await driver.get('http://localhost:3000/services');
    });

    after(async () => {
        await driver.quit();
    });
});
