import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.ExpectedCondition.*;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;


import static org.junit.Assert.*;
import org.junit.*;
import org.junit.Test;

public class ExampleTest {
    WebDriver driver;
    @Before
    public void createDriver() {
    	driver = new FirefoxDriver();
    }

    @After
    public void freeDriver() {
       driver.quit();
    }
    
    @Test
    public void test() throws java.io.IOException{
        driver.get("http://localhost/~bilasco/Money/index.php");

        WebElement element = driver.findElement(By.name("v1"));
	element.sendKeys("12");

        element = driver.findElement(By.name("c1"));
	element.sendKeys("EUR");
	
        element = driver.findElement(By.name("v2"));
	element.sendKeys("22");

        element = driver.findElement(By.name("c2"));
	element.sendKeys("EUR");

        element.submit();

        // Wait for the page to load, timeout after 10 seconds, stop when results present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>(){
		public Boolean apply(WebDriver d) {
		   return d.findElement(By.id("result_detail")).isDisplayed();
		}
	});

	File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
	FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
	assertEquals(driver.findElement(By.id("result_detail")).getText(),"(EUR) 34");
	new File("/tmp/screenshot_test.jpg").delete();
    }
    
    @Test
    public void testNOK() throws java.io.IOException{
        driver.get("http://localhost/~bilasco/Money/index.php");

        WebElement element = driver.findElement(By.name("v1"));
	element.sendKeys("12");

        element = driver.findElement(By.name("c1"));
	element.sendKeys("EUR");
	
        element = driver.findElement(By.name("v2"));
	element.sendKeys("22");

        element = driver.findElement(By.name("c2"));
	element.sendKeys("EUR");

        element.submit();

        // Wait for the page to load, timeout after 10 seconds, stop when results present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>(){
		public Boolean apply(WebDriver d) {
		   return d.findElement(By.id("result_detail"))!=null;
		}
	});
	File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
	FileUtils.copyFile(scrFile, new File("/tmp/screenshot_testnok.jpg"));

	assertEquals(driver.findElement(By.id("result_detail")).getText(),"(EUR) 36");
	new File("/tmp/screenshot_testnok.jpg").delete();
    }
    
    @Test
    public void testOK2() throws java.io.IOException{
        driver.get("http://localhost/~bilasco/Money/index.php");

        WebElement element = driver.findElement(By.name("v1"));
	element.sendKeys("12");

        element = driver.findElement(By.name("c1"));
	element.sendKeys("EUR");
	
        element = driver.findElement(By.name("v2"));
	element.sendKeys("22");

        element = driver.findElement(By.name("c2"));
	element.sendKeys("eUR");

        element.submit();

        // Wait for the page to load, timeout after 10 seconds, stop when results present
        new WebDriverWait(driver, 10).until(ExpectedConditions.presenceOfElementLocated(By.id("result_detail")));
	File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
	FileUtils.copyFile(scrFile, new File("/tmp/screenshot_testok2.jpg"));

	assertEquals(driver.findElement(By.id("result_detail")).getText(),"(EUR) 34");
	new File("/tmp/screenshot_testok2.jpg").delete();
    }
    
}
