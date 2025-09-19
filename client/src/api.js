import axios from "axios";

const API = axios.create({
  baseURL: "https://dailybrief-b1ud.onrender.com/all-news", // Backend URL
});

// All news
export const fetchAllNews = async (page = 1, pageSize = 20) => {
  try {
    const response = await API.get(`/all-news?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all news:", error);
    return { success: false, message: "Failed to fetch news" };
  }
};

// Top headlines
export const fetchTopHeadlines = async (category = "general", page = 1, pageSize = 20) => {
  try {
    const response = await API.get(`/top-headlines?category=${category}&page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return { success: false, message: "Failed to fetch top headlines" };
  }
};

// India news (or any country)
export const fetchCountryNews = async (country = "in", page = 1, pageSize = 20) => {
  try {
    const response = await API.get(`/country/${country}?page=${page}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching country news:", error);
    return { success: false, message: "Failed to fetch country news" };
  }
};