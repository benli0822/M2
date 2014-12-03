package seleniumTest.Student;

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
 * Created by CHENGXIAOJUN ET JINBENLI on 30/11/14.
 */
public class TestStudentClassTable {
    WebDriver driver;

    @Before
    public void createDriver() {
        driver = new FirefoxDriver();
        driver.get(getURLString());
        //to test all the functions of student we should login firstly
        loginAsStudent();
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
    public void test_student_information_table() throws java.io.IOException {
  //////
        WebElement table_element = driver.findElement(By.id("student_table"));
        List<WebElement> tr_collection=table_element.findElements(By.xpath("id('student_table')/tbody/tr"));

        System.out.println("NUMBER OF ROWS IN THIS TABLE = "+tr_collection.size());
        int row_num,col_num;
        row_num=1;
        for(WebElement trElement : tr_collection)
        {
            List<WebElement> td_collection=trElement.findElements(By.xpath("td"));
            System.out.println("NUMBER OF COLUMNS="+td_collection.size());
            col_num=1;
            for(WebElement tdElement : td_collection)
            {
                System.out.println("row # "+row_num+", col # "+col_num+ "text="+tdElement.getText());
                col_num++;
            }
            row_num++;
        }

        // Wait for the page to load, timeout after 30 seconds, stop when element   present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("student_table")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the student information table is shown, we can say the table is loaded correctly
        assertEquals(row_num>1,true);

        new File("/tmp/screenshot_test.jpg").delete();
    }


    @Test
    public void test_student_table_display_color() throws java.io.IOException {

        driver.get(getURLString());

        //to test all the functions of student we should login firstly
        loginAsStudent();


        //////
        WebElement table_element = driver.findElement(By.id("student_table"));
        List<WebElement> tr_collection=table_element.findElements(By.xpath("id('student_table')/tbody/tr"));

        System.out.println("NUMBER OF ROWS IN THIS TABLE = "+tr_collection.size());
        int row_num,col_num;
        row_num=0;
        //get the element of the first tr, just to test the color
        WebElement trElement = tr_collection.get(row_num);

        //in our case, we use the different class name to display the different color so we just need to get the class name
        String className = trElement.getAttribute("class");





        // Wait for the page to load, timeout after 30 seconds, stop when element  present
        new WebDriverWait(driver, 10).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("student_table")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));

        //if the student information table is shown, we can say the table is loaded correctly
        assertEquals(className,"active");

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

    /**
     * this function is fire the action of login as a student
     */
    public void loginAsStudent(){
        //fil the username and password

        WebElement element = driver.findElement(By.id("username"));
        element.sendKeys("stu1.stu1");

        element = driver.findElement(By.id("password"));
        element.sendKeys("123");

        //fire login
        element = driver.findElement(By.id("loginButton"));
        element.click();
    }
}
