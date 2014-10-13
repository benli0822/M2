package fr.ulille1.fil.odeva;

import junit.framework.TestCase;

/**
 * Unit test for simple App.
 */
public class MoneyAddTestCase
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public MoneyAddTestCase( String testName )
    {
        super( testName );
    }

    private Money f12EUR,  f14EUR;
    private MoneyFactory mf;

    public void setUp() throws UnexistingCurrencyException
    {
      mf=MoneyFactory.getDefaultFactory();
      f12EUR=mf.createMoney(12, "EUR");
      f14EUR=mf.createMoney(14, "EUR");;
    }

    /**
     * simpleAdd
     */
    public void testSimpleAdd() throws UnexistingCurrencyException
    {
        Money expected=mf.createMoney(26, "EUR");
        Money result=MoneyOps.simpleAdd(f12EUR,f14EUR);
        assertEquals(expected,result);
    }


    /**
     * test for equals
     * @throws UnexistingCurrencyException
     */
    public void testEquals() throws UnexistingCurrencyException {
        Money expected = mf.createMoney(14, "EUR");
        assertTrue(expected.equals(f14EUR));
    }
}
