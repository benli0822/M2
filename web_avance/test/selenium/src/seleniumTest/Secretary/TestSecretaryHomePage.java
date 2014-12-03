package seleniumTest.Secretary;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;

/**
 * Created by jamesRMBP on 30/11/14.
 */


public class TestSecretaryHomePage {
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
     * test whether the data picker is displayed
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_home_page_display_datapicker() throws java.io.IOException {

        driver.get(getURLString());

        //to test all the functions of secretary we should login firstly
        loginAsTeacher();


        //////get the data picker element
        WebElement dp = driver.findElement(By.id("dp1"));


        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("dp1")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the student information table is shown, we can say the table is loaded correctly
        assertEquals(driver.findElement(By.id("dp1")).isDisplayed(), true);

        new File("/tmp/screenshot_test.jpg").delete();
    }

    /**
     * test for add a class action
     * @throws java.io.IOException
     */
    @Test
    public void test_home_page_add_a_class() throws java.io.IOException {

        driver.get(getURLString());

        //to test all the functions of secretary we should login firstly
        loginAsTeacher();


        //////get the table element which we will add a class
        WebElement table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));

        table_element.click();


        //WebDriverWait wait = new WebDriverWait(driver, 30);
        //WebElement element = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("create")));


        //get the create class button
        WebElement create_button = driver.findElement(By.xpath("//div[2]/div/form/div[5]/div/button"));
        System.out.println(create_button.isDisplayed());
        create_button.click();


        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return driver.findElement(By.xpath("(//div[@id='00'])[2]")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the class is added to the secretary table, we can see the drive class diplayed
        assertEquals((driver.findElement(By.xpath("(//div[@id='00'])[2]"))).getText(), "Drive Class");

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
        urlstring = "file:///" + dir.getParentFile().getParent() + "/index.html";
        return urlstring;
    }

    /**
     * this function is fire the action of login as a student
     */
    public void loginAsTeacher() {
        //fil the username and password

        WebElement element = driver.findElement(By.id("username"));
        element.sendKeys("admin.admin");

        element = driver.findElement(By.id("password"));
        element.sendKeys("admin");

        //fire login
        element = driver.findElement(By.id("loginButton"));
        element.click();
    }

}
