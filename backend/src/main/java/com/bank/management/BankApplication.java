package com.bank.management;

import com.bank.management.service.BankService;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.stream.Collectors;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class BankApplication {
    private static BankService bankService = new BankService();
    private static JSONParser parser = new JSONParser();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Handle balance requests
        server.createContext("/balance", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if ("GET".equals(exchange.getRequestMethod())) {
                    JSONObject response = new JSONObject();
                    response.put("balance", bankService.getBalance());
                    sendResponse(exchange, response.toJSONString());
                }
            }
        });

        // Handle deposit and withdraw
        server.createContext("/transaction", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if ("POST".equals(exchange.getRequestMethod())) {
                    try {
                        String body = new BufferedReader(new InputStreamReader(exchange.getRequestBody()))
                                .lines().collect(Collectors.joining("\n"));
                        JSONObject json = (JSONObject) parser.parse(body);

                        String type = (String) json.get("type");
                        Double amount = Double.parseDouble(json.get("amount").toString());

                        boolean success = false;
                        if ("deposit".equals(type)) {
                            success = bankService.deposit(amount);
                        } else if ("withdraw".equals(type)) {
                            success = bankService.withdraw(amount);
                        }

                        JSONObject response = new JSONObject();
                        response.put("success", success);
                        response.put("balance", bankService.getBalance());
                        sendResponse(exchange, response.toJSONString());
                    } catch (Exception e) {
                        sendErrorResponse(exchange, "Invalid request");
                    }
                }
            }
        });

        // Handle transaction history
        server.createContext("/transactions", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                if ("GET".equals(exchange.getRequestMethod())) {
                    JSONObject response = new JSONObject();
                    response.put("transactions", bankService.getTransactions());
                    sendResponse(exchange, response.toJSONString());
                }
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Bank server started on port 8080");
    }

    private static void sendResponse(HttpExchange exchange, String response) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.sendResponseHeaders(200, response.getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.getBytes());
        }
    }

    private static void sendErrorResponse(HttpExchange exchange, String message) throws IOException {
        JSONObject response = new JSONObject();
        response.put("error", message);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(400, response.toJSONString().getBytes().length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(response.toJSONString().getBytes());
        }
    }
}
