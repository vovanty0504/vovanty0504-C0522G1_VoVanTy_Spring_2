package com.example.back_end.payload.request;

import java.util.List;

public class LoginResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private List<String> roles;

    public LoginResponse() {
    }

    public LoginResponse(String accessToken, String username, List<String> roles) {
        this.accessToken = accessToken;
        this.username = username;
        this.roles = roles;
    }

    public LoginResponse(String accessToken, String tokenType, String username, List<String> roles) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.username = username;
        this.roles = roles;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
