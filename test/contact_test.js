const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Contact Us Page Load Time and Content Tests', function() {
    this.timeout(30000);
    let driver;

    before(async () => {
        //driver = await new Builder().forBrowser('safari').build();
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should load contact us page successfully', async () => {
        await driver.get('http://localhost:3000/quotes');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'South Alps Cold Storage: Contact Us');
    });

    it('should display the company logo', async () => {
        let logo = await driver.findElement(By.css('.company-logo'));
        assert(await logo.isDisplayed());
    });

    it('should display the form', async () => {
        let formContainer = await driver.findElement(By.css('.form-container-1'));
        let form = await formContainer.findElement(By.css('form'));
        
        // Wait for the form to be visible
        await driver.wait(until.elementIsVisible(form), 10000);
    
        assert(await form.isDisplayed());
    });
    

    it('should display the Google Maps iframe', async () => {
        let mapIframe = await driver.findElement(By.css('.container5 iframe'));
        assert(await mapIframe.isDisplayed());
    });

    //Navbar Testing
    it('should navigate to the Services page when clicked', async () => {
        let servicesLink = await driver.findElement(By.linkText('Services'));
        await servicesLink.click();
        await driver.wait(until.urlContains('/services'), 10000); 
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/services');
    
        await driver.get('http://localhost:3000/quotes'); 
    });

    it('should navigate to the Home page when clicked', async () => {
        let homeButton = await driver.findElement(By.css('.company-logo')); // Adjust the selector
        await homeButton.click();
        await driver.wait(until.urlContains('/home'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/home');
    
        await driver.get('http://localhost:3000/quotes'); 
    });

    it('should navigate to the Careers page when clicked', async () => {
        let careersLink = await driver.findElement(By.linkText('Careers'));
        await careersLink.click();
        await driver.wait(until.urlContains('/career'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/careers');
    
        await driver.get('http://localhost:3000/quotes');
    });

    it('should navigate to the Facility page when clicked', async () => {
        let facilityLink = await driver.findElement(By.linkText('Facility'));
        await facilityLink.click();
        await driver.wait(until.urlContains('/facility'), 10000);
    
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://localhost:3000/facility');
    
        await driver.get('http://localhost:3000/quotes');
    });

    //Form Testing

    it('should accept input in the Last Name field', async () => {
        let lastNameInput = await driver.findElement(By.css('#last-name'));
        await lastNameInput.clear();
        await lastNameInput.sendKeys('Doe');
    
        let inputValue = await lastNameInput.getAttribute('value');
        assert.strictEqual(inputValue, 'Doe');
    });
    
    it('should accept input in the First Name field', async () => {
        let firstNameInput = await driver.findElement(By.css('#first-name'));
        await firstNameInput.clear();
        await firstNameInput.sendKeys('John');
    
        let inputValue = await firstNameInput.getAttribute('value');
        assert.strictEqual(inputValue, 'John');
    });

    it('should accept input in the email field', async () => {
        let emailInput = await driver.findElement(By.css('#company-email'));
        await emailInput.clear();
        await emailInput.sendKeys('qa_test@gmail.com');
    
        let inputValue = await emailInput.getAttribute('value');
        assert.strictEqual(inputValue, 'qa_test@gmail.com');
    });

    it('should accept input in the contact number field', async () => {
        let numberInput = await driver.findElement(By.css('#company-email'));
        await numberInput.clear();
        await numberInput.sendKeys('09123456789');
    
        let inputValue = await numberInput.getAttribute('value');
        assert.strictEqual(inputValue, '09123456789');
    });
    
    after(async () => {
        await driver.quit();
    });
});
