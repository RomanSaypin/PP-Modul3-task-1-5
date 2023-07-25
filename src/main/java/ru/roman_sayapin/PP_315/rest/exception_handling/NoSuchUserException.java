package ru.roman_sayapin.PP_315.rest.exception_handling;

public class NoSuchUserException extends RuntimeException{
    public NoSuchUserException(String message) {
        super(message);
    }
}
