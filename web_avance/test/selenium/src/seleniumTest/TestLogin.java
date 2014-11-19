package seleniumTest;


import static org.junit.Assert.assertEquals;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

/**
 * @author CHENG Xiaojun et JIN Benli
 */

public class TestLogin {
    WebDriver driver;

    @Before
    public void createDriver() {
        driver = new FirefoxDriver();
    }

    @After
    public void freeDriver() {
        driver.quit();
    }


    /**
     * test whether login error label is show
     * @throws java.io.IOException
     */
    @Test
    public void test_login_error_label_display() throws java.io.IOException {

        driver.get(getURLString());


        WebElement element = driver.findElement(By.id("loginButton"));
        element.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("loginError")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
        assertEquals(driver.findElement(By.id("loginError")).getText(), "Wrong username or password, try again");

        new File("/tmp/screenshot_test.jpg").delete();
    }

    /**
     * test  login as a secretary
     * @throws java.io.IOException
     */
    @Test
    public void test_login_as_secretary() throws java.io.IOException {

        driver.get(getURLString());

        //fil the username and password

        WebElement element = driver.findElement(By.id("username"));
        element.sendKeys("admin.admin");

        element = driver.findElement(By.id("password"));
        element.sendKeys("admin");

        //fire login
        element = driver.findElement(By.id("loginButton"));
        element.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("secretary_table")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
        //if we see the secretary table so we can see we have login successful
        assertEquals(driver.findElement(By.id("secretary_table")).isDisplayed(), true);

        new File("/tmp/screenshot_test.jpg").delete();

    }
    /**
     * test  login as a client
     * @throws java.io.IOException
     */
    @Test
    public void test_login_as_client() throws java.io.IOException {

        driver.get(getURLString());

        //fil the username and password

        WebElement element = driver.findElement(By.id("username"));
        element.sendKeys("stu1.stu1");

        element = driver.findElement(By.id("password"));
        element.sendKeys("123");

        //fire login
        element = driver.findElement(By.id("loginButton"));
        element.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("studentName")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
        //if we see the student name so we can see we have login successful
        assertEquals(driver.findElement(By.id("studentName")).isDisplayed(), true);

        new File("/tmp/screenshot_test.jpg").delete();

    }
    /**
     * this function is to the absolute file path of the index.html
     *
     * @return absolute file path of the index.html
     */
    public String getURLString() {
        String urlstring = "";
        //get dir path
        String currentDir = System.getProperty("user.dir");
        //System.out.println("Current dir using System:" + currentDir);

        File dir = new File(currentDir);
        if (!dir.exists()) {
            System.out.println("file not existe");
            return urlstring;
        }
        //System.out.println(dir.getParentFile().getParent() + "/index.html");
        urlstring = "file:///"+dir.getParentFile().getParent() + "/index.html";
        return urlstring;
    }

}
