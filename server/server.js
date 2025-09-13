require('dotenv').config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Allow frontend to connect (adjust origins if you deploy later)
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
}));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

// Unified fetch function with proper logging and error handling
function fetchNews(url, res) {
    console.log("Fetching URL:", url); // debug URL
    axios.get(url)
        .then(response => {
            const totalResults = response.data.totalResults || 0;
            console.log("Total results:", totalResults);

            if (totalResults > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Successfully fetched the data",
                    data: response.data
                });
            } else {
                res.json({
                    status: 200,
                    success: true,
                    message: "No more results to show"
                });
            }
        })
        .catch(error => {
            console.error("Axios error:", error.message); // debug error
            res.status(500).json({
                status: 500,
                success: false,
                message: "Fail to fetch data from the API",
                error: error.message
            });
        });
}

// ✅ Default home route
app.get("/", (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: "✅ News Aggregator Backend is running",
        endpoints: [
            "/all-news",
            "/top-headlines?category=technology",
            "/country/:iso"
        ]
    });
});

// All news route
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;

    let url = `https://newsapi.org/v2/everything?q=news&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// Top headlines route
app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 80;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";

    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// Country news route
app.get("/country/:iso", (req, res) => {
    const country = req.params.iso.toLowerCase(); // lowercase for API
    const pageSize = parseInt(req.query.pageSize) || 80;
    const page = parseInt(req.query.page) || 1;

    // Validate country code
    const validCountries = ["in","us","gb","au","ca","fr","de","jp"];
    if (!validCountries.includes(country)) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "Invalid country code"
        });
    }

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
    fetchNews(url, res);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});