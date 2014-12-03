package seleniumTest.Secretary;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.util.List;

import static org.junit.Assert.assertEquals;

/**
 * Created by CHENG Xiaojun et JIN Benli on 03/12/14.
 */
public class TestSecretaryStudentInformationPage {


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
     * test whether the student information page is loaded correctly
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_display_student_information_page() throws java.io.IOException {

        driver.get(getURLString());

        //to test all the functions of secretary we should login firstly
        loginAsTeacher();


        ///get the student information button
        WebElement student_info_button = driver.findElement(By.linkText("Find Student Lesson Information"));

        student_info_button.click();


        // Wait for the page to load, timeout after 30 seconds, stop when element   present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("student_lesson_table")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the student information table is shown, we can say the table is loaded correctly
        assertEquals(driver.findElement(By.id("dp1")).isDisplayed(), true);

        new File("/tmp/screenshot_test.jpg").delete();
    }

    /**
     * test to search a student information and display it on the screen
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_display_a_student_information() throws java.io.IOException {

        driver.get(getURLString());

        //to test all the functions of secretary we should login firstly
        loginAsTeacher();

        //get the student information button
        WebElement student_info_button = driver.findElement(By.linkText("Find Student Lesson Information"));
        student_info_button.click();

        //get the search button, because the search label will be filled automatic, so we just need to click the search button to display the student class information
        WebElement search_button = driver.findElement(By.id("searchButton"));
        search_button.click();

        //////
        WebElement table_element = driver.findElement(By.id("student_lesson_table"));
        List<WebElement> tr_collection = table_element.findElements(By.xpath("id('student_lesson_table')/tbody/tr"));

        System.out.println("NUMBER OF ROWS IN THIS TABLE = " + tr_collection.size());
        int row_num, col_num;
        row_num = 1;
        for (WebElement trElement : tr_collection) {
            List<WebElement> td_collection = trElement.findElements(By.xpath("td"));
            System.out.println("NUMBER OF COLUMNS=" + td_collection.size());
            col_num = 1;
            for (WebElement tdElement : td_collection) {
                System.out.println("row # " + row_num + ", col # " + col_num + "text=" + tdElement.getText());
                col_num++;
            }
            row_num++;
        }

        // Wait for the page to load, timeout after 30 seconds, stop when elementpresent
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("student_lesson_table")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the student information table is shown, we can say the table is loaded correctly
        assertEquals(row_num > 1, true);

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
