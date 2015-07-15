package com.company;

import org.junit.Test;

import static org.junit.Assert.*;
import static org.hamcrest.core.Is.is;

/**
 * Created by syuta on 2015/07/15.
 */
public class CalcTest {

    @Test
    public void testAdd() throws Exception {
        assertThat(Calc.add(1,2),is(3));
    }
}