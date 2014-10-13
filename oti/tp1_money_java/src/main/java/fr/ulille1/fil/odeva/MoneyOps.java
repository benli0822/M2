/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package fr.ulille1.fil.odeva;

/**
 *
 * @author marius
 */
public class MoneyOps {
  private static MoneyFactory mf = MoneyFactory.getDefaultFactory();

  /**
   * Add moneys having the same currency
  */
  public static Money simpleAdd(Money m1, Money m2) throws IncompatibleCurrencyException, UnexistingCurrencyException
  {
    Money m=mf.createMoney(m1.getValue()+m2.getValue(),m1.getCurrency());
    return m;
  }
}
