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
 * @author CHENG Xiaojun
 */

public class TestWiki {
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
    public void testLien_Exercices_sur_JUnit3_8() throws java.io.IOException {


        //get dir path
        String currentDir = System.getProperty("user.dir");
        System.out.println("Current dir using System:" +currentDir);




        driver.get("http://forge.fil.univ-lille1.fr/OTI/wiki/WikiStart");

        WebElement element = driver.findElement(By.linkText("Exercices sur JUnit 3.8"));
        element.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element Créezunnouveauprojet present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.id("Créezunnouveauprojet")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
        assertEquals(driver.getCurrentUrl(), "http://forge.fil.univ-lille1.fr/OTI/wiki/JUnitExo");
        new File("/tmp/screenshot_test.jpg").delete();
    }


    @Test
    public void test_Lien_Maven() throws java.io.IOException {
        driver.get("http://forge.fil.univ-lille1.fr/OTI/wiki/WikiStart");

        WebElement element = driver.findElement(By.linkText("Maven"));
        element.click();

        // Wait for the page to load, timeout after 30 seconds, stop when element MavenSelenium present
        new WebDriverWait(driver, 30).until(new ExpectedCondition<Boolean>() {
            public Boolean apply(WebDriver d) {
                return d.findElement(By.linkText("MavenSelenium")).isDisplayed();
            }
        });

        File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("/tmp/screenshot_test.jpg"));
        assertEquals(driver.getCurrentUrl(), "http://forge.fil.univ-lille1.fr/OTI/wiki/Maven");
        new File("/tmp/screenshot_test.jpg").delete();
    }

}
