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
public class TestSecretaryAddTeacher {
    WebDriver driver;

    @Before
    public void createDriver() {
        driver = new FirefoxDriver();
        driver.get(getURLString());
        //to test all the functions of secretary we should login firstly
        loginAsTeacher();
        ///get the add teacher button
        WebElement add_teacher_button = driver.findElement(By.linkText("Add Teacher"));
        add_teacher_button.click();
    }

    @After
    public void freeDriver() {
        driver.quit();
    }


    /**
     * test add teacher function we will add a teacher  and go to the home page to see whether we have added the correct teacher
     *
     * @throws java.io.IOException
     */
    @Test
    public void test_add_a_teacher() throws java.io.IOException {
        WebElement input_textfiled = driver.findElement(By.id("addTeacherFirstname"));
        input_textfiled.sendKeys("james");
        input_textfiled = driver.findElement(By.id("addTeacherLastname"));
        input_textfiled.sendKeys("bound");
        input_textfiled = driver.findElement(By.id("addTeacherAddresse"));
        input_textfiled.sendKeys("lille");
        input_textfiled = driver.findElement(By.id("addTeacherPassword"));
        input_textfiled.sendKeys("admin");

        WebElement save_button = driver.findElement(By.id("addTeacherSaveButton"));
        save_button.click();




        WebElement table_element = driver.findElement(By.id("secretary_table"));
        List<WebElement> tr_collection = table_element.findElements(By.xpath("id('secretary_table')/thead/tr"));

        String last_teacher = "";

        System.out.println("NUMBER OF ROWS IN THIS TABLE = " + tr_collection.size());
        int row_num, col_num;
        row_num = 0;
        for (WebElement trElement : tr_collection) {
            List<WebElement> td_collection = trElement.findElements(By.xpath("th"));
            System.out.println("NUMBER OF COLUMNS=" + td_collection.size());
            col_num = 1;
            for (WebElement tdElement : td_collection) {
                System.out.println("row # " + row_num + ", col # " + col_num + "text=" + tdElement.getText());

                last_teacher = tdElement.getText();
                col_num++;
            }
            row_num++;
        }




        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the last teacher is which we have added then the function is all right
        assertEquals(last_teacher.equals("james"), true);

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
