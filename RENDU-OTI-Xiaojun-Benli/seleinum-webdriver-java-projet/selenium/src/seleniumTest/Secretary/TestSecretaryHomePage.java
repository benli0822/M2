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
 * Created by CHENG Xiaojun et JIN Benli on 30/11/14.
 */


public class TestSecretaryHomePage {
    WebDriver driver;

    @Before
    public void createDriver() {
        driver = new FirefoxDriver();
        driver.get(getURLString());
        //to test all the functions of secretary we should login firstly
        loginAsTeacher();

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


        //////get the data picker element
        WebElement dp = driver.findElement(By.id("dp1"));


        // Wait for the page to load, timeout after 30 seconds, stop when element  present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("dp1")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the datapicker is shown, we can say the datapicker is loaded correctly
        assertEquals(driver.findElement(By.id("dp1")).isDisplayed(), true);

        new File("/tmp/screenshot_test.jpg").delete();
    }

    /**
     * test for add a class action
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_home_page_add_a_class() throws java.io.IOException {
        //////get the table element which we will add a class
        WebElement table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));

        table_element.click();

        //get the create class button
        WebElement create_button = driver.findElement(By.xpath("//div[2]/div/form/div[5]/div/button"));
        create_button.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element  present
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
     * test the usage of radio box to select which type of class will be added
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_home_page_add_a_lecture_class() throws java.io.IOException {
        //////get the table element which we will add a class
        WebElement table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));
        table_element.click();

        //click the lecture class to add a lecture class
        WebElement radio_box_element = driver.findElement(By.xpath("(//div[@id='classes']/div/label[2])[2]"));
        radio_box_element.click();

        //get the create class button
        WebElement create_button = driver.findElement(By.xpath("//div[2]/div/form/div[5]/div/button"));
        create_button.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element  present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return driver.findElement(By.xpath("(//div[@id='00'])[2]")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the class is added to the secretary table, we can see the lecture class diplayed
        assertEquals((driver.findElement(By.xpath("(//div[@id='00'])[2]"))).getText(), "Lecture Class");

        new File("/tmp/screenshot_test.jpg").delete();
    }

    /**
     * test the open and close of the popover
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_home_page_open_and_close_popover() throws java.io.IOException {
        //////get the table element which we will add a class
        WebElement table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));
        table_element.click();

        //get the close button
        WebElement create_button = driver.findElement(By.linkText("x"));
        create_button.click();


        // Wait for the page to load, timeout after 30 seconds, stop when element  present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return driver.findElement(By.xpath("(//div[@id='00'])[2]")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the class is added to the secretary table, we can see the lecture class diplayed
        assertEquals((driver.findElement(By.id("popover-content")).isDisplayed()), false);

        new File("/tmp/screenshot_test.jpg").delete();
    }

    @Test
    public void test_home_page_delete_a_class() throws java.io.IOException {
        //////get the table element which we will add a class
        WebElement table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));

        table_element.click();

        //get the create class button
        WebElement create_button = driver.findElement(By.xpath("//div[2]/div/form/div[5]/div/button"));
        System.out.println(create_button.isDisplayed());
        create_button.click();

        //////get the table element which we will add a class
        table_element = driver.findElement(By.xpath("(//div[@id='00'])[2]"));
        //and open the edit page to delete this class
        table_element.click();

        //get the delete button
        WebElement delete_button = driver.findElement(By.xpath("//div[8]/div[2]/div/form/div[5]/div/button[3]"));
        delete_button.click();


        // Wait for the page to load, timeout after 30 seconds, stop when element  present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return driver.findElement(By.xpath("(//div[@id='00'])[2]")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the class is deleted from the secretary table, we can't see the drive class diplayed
        assertEquals((driver.findElement(By.xpath("(//div[@id='00'])[2]"))).getText().equals("Driver Class"), false);

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
     * this function is fire the action of login as a teacher
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
