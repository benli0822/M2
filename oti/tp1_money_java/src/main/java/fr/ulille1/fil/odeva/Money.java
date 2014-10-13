package fr.ulille1.fil.odeva;

public class Money {
    private int value;
    private String currency;


    Money(int value, String currency) {
        this.value = value;
        this.currency = currency;
    }

    public int getValue() {
        return this.value;
    }

    public String getCurrency() {
        return this.currency;
    }

    public String toString() {
        return this.getValue() + " (" + this.getCurrency() + ")";
    }

    /**
     * modify the default equals
     * @param obj
     * @return
     */
    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Money))
            return false;
        if (obj == this)
            return true;

        Money m = (Money) obj;
        return m.getValue() == this.getValue() && m.getCurrency() == this.getCurrency();
    }

}
