const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Home Page Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000/home');
    });

    it('should have the correct page title', async () => {
        const title = await driver.getTitle();
        assert.strictEqual(title, 'South Alps Cold Storage: Home');
    });
    it('should display the company logo', async () => {
        let logo = await driver.findElement(By.css('.company-logo'));
        assert(await logo.isDisplayed());
    });

    it('should display the first image in two photos section', async () => {
        let image1 = await driver.findElement(By.css('.container2 .image-card:nth-child(1) .image'));
        assert(await image1.isDisplayed());
    });

    it('should display the map', async () => {
        let map = await driver.findElement(By.css('.container5 iframe'));
        assert(await map.isDisplayed());
    });

    /*it('should display accreditation images', async () => {
        let accreditationImages = await driver.findElements(By.css('.accreditation-box img'));
        assert(accreditationImages.length > 0);
    });*/

    //Navbar Testing
    it('should navigate to the Facility page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Facility'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/facility'), 10000); 
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/facility');
    
        await driver.get('http://localhost:3000/home'); 
    });

    it('should navigate to the Services page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Services'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/services'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/services');
    
        await driver.get('http://localhost:3000/home'); 
    });

    it('should navigate to the Careers page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Careers'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/career'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/careers');
    
        await driver.get('http://localhost:3000/home');
    });

    it('should navigate to the Contact Us page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Contact Us'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/quotes'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/quotes');
    
        await driver.get('http://localhost:3000/home');
    });

    after(async () => {
        await driver.quit();
    });
});
