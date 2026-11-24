import type { Project } from "./types";

// Order matters: the first project is the featured card, the rest fill the two-column grid.
export const projectsEn: Project[] = [
  {
    slug: "revzone-car-rental-app",
    visual: "mobile",
    period: "2025 – 2026",
    title: "RevZone — Peer-to-Peer Car Rental App",
    category: "Mobile App · Security",
    description:
      "A React Native app where people in Morocco rent cars from local owners, backed by a Node.js API with security designed in from the start.",
    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "JWT"],
    link: "https://github.com/adnane-amrs/REVZONE_MOBILE",
    details: {
      type: "Master's project · Full-stack",
      context:
        "RevZone works like an Airbnb for cars. Owners list a car with photos, a daily price and the days it's available; renters search by city and dates, send a booking request, chat with the owner and review the trip afterwards. It started in the Advanced Web & Mobile Application Security module of my Master's as a social network for car enthusiasts, then was rebuilt as a rental platform while keeping and extending the original security work.",
      objectives: [
        "Let anyone switch between renter mode and owner mode in the same app.",
        "Cover the whole rental flow: search, booking requests, chat, trips and reviews.",
        "Design security in from the start, with a STRIDE threat model and server-side business rules.",
      ],
      steps: [
        {
          title: "Mobile app",
          text: "React Native 0.79 with Expo SDK 53, file-based navigation with expo-router, Zustand stores and Reanimated 3 animations, in a light and a dark theme with no UI library.",
        },
        {
          title: "REST API",
          text: "Node.js and Express 5 with Mongoose on MongoDB Atlas. Photos go to Cloudinary through signed uploads, and user activity is logged with Winston.",
        },
        {
          title: "Booking engine",
          text: "Bookings move from pending to accepted, active and completed as dates pass. Overlaps with accepted bookings and blocked days are checked at request time and again at acceptance.",
        },
        {
          title: "Security",
          text: "JWT auth with bcrypt, role-based access control, rate limits, validation that blocks NoSQL injection, and prices always computed on the server, never trusted from the client.",
        },
      ],
      highlights: [
        "Two-sided marketplace with renter mode, owner mode and an admin dashboard.",
        "STRIDE threat model with a mitigation for every threat.",
        "Driver license verification, stored privately and opened only through signed URLs.",
      ],
    },
  },
  {
    slug: "document-extraction-tms",
    visual: "detection",
    period: "2025 – 2026",
    title: "Automated Data Extraction & Structuring (TMS)",
    category: "Computer Vision",
    description:
      "An intelligent extraction system for Moroccan administrative documents inside a Transport Management System.",
    stack: ["Python", "OpenCV", "YOLOv11", "Tesseract OCR"],
    details: {
      type: "Academic project",
      context:
        "Transport companies handle a constant flow of Moroccan administrative documents whose information has to be typed into their Transport Management System (TMS) by hand. This project replaces that manual entry with a computer vision pipeline that reads each document and returns its data as structured fields, ready to be stored in the TMS.",
      objectives: [
        "Locate the key information zones on scanned administrative documents automatically.",
        "Read the text in each zone reliably, despite scan quality and varied layouts.",
        "Turn the result into structured records the TMS can use directly.",
      ],
      steps: [
        {
          title: "Pre-processing",
          text: "Scans are cleaned with OpenCV — resizing, denoising, deskewing and thresholding — so every document reaches the model in a consistent shape.",
        },
        {
          title: "Zone detection",
          text: "A YOLOv11 model fine-tuned on the target documents detects and crops each field of interest.",
        },
        {
          title: "Text recognition",
          text: "Tesseract OCR reads the text inside every detected zone instead of the whole page, which keeps the output focused and clean.",
        },
        {
          title: "Structuring",
          text: "Recognised values are mapped to named fields and assembled into a structured record for the TMS.",
        },
      ],
      highlights: [
        "End-to-end flow from a scanned image to a structured record.",
        "Combines deep-learning detection (YOLO) with classic OCR (Tesseract).",
        "Built around real Moroccan administrative documents.",
      ],
    },
  },
  {
    slug: "document-classification-nlp",
    visual: "classification",
    period: "2025 – 2026",
    title: "Intelligent Document Classification",
    category: "NLP",
    description: "An end-to-end pipeline that automatically classifies and organises incoming PDF/TXT documents.",
    stack: ["Python", "1D CNN", "Scikit-learn", "Gradio", "PyPDF"],
    link: "https://github.com/adnane-amrs/Document-Classification-NLP",
    details: {
      type: "Academic project · Open source",
      context:
        "Incoming documents usually land in one place and have to be opened, read and filed by hand. This project automates that sorting: it reads PDF and TXT files, predicts their category with a neural network and organises them accordingly, all behind a simple web interface.",
      objectives: [
        "Extract usable text from both PDF and plain-text files.",
        "Classify each document into the right category with a deep learning model.",
        "Make the whole pipeline usable by non-technical people through a web interface.",
      ],
      steps: [
        {
          title: "Ingestion",
          text: "PDF files are parsed with PyPDF and TXT files are read directly, producing raw text for every document.",
        },
        {
          title: "Pre-processing",
          text: "Text is cleaned, tokenised and turned into sequences the model can learn from, with Scikit-learn used for data preparation and evaluation.",
        },
        {
          title: "Classification",
          text: "A 1D convolutional neural network learns patterns in the text sequences and predicts the category of each document.",
        },
        {
          title: "Interface & filing",
          text: "A Gradio app lets users drop in documents, see the predicted class and get them organised automatically.",
        },
      ],
      highlights: [
        "Complete pipeline: from raw files to organised folders.",
        "Interactive Gradio demo for non-technical users.",
        "Source code available on GitHub.",
      ],
    },
  },
  {
    slug: "olist-ecommerce-data-platform",
    visual: "lineage",
    period: "2026",
    title: "Olist E-commerce Data Platform",
    category: "Data Engineering",
    description:
      "An end-to-end data platform that turns about 100k real marketplace orders into tested analytics tables and dashboards.",
    stack: ["Python", "PostgreSQL", "dbt", "Metabase", "Docker"],
    link: "https://github.com/adnane-amrs/olist-ecom-dataplatform",
    details: {
      type: "Personal project",
      context:
        "Olist connects small Brazilian merchants to large online marketplaces, and its public dataset covers the whole life of an order: customer, seller, items, payment, delivery and review. This project takes the raw CSV exports and builds the kind of layered platform a modern data team runs, scaled down to a laptop with Docker, so questions about revenue, late deliveries and review scores can be answered reliably.",
      objectives: [
        "Load every source file reproducibly, with load metadata on each row.",
        "Model the data in layers, from raw copies to business-ready fact and dimension tables.",
        "Test the data and trace every metric back to its source rows.",
      ],
      steps: [
        {
          title: "Ingestion",
          text: "A Python script bulk-loads the 9 Olist CSV files, about 1.5M rows, into a raw PostgreSQL schema with COPY, adding ingestion time and source file columns.",
        },
        {
          title: "Raw layer",
          text: "Every column is stored as text, so the raw layer matches the files exactly and type fixes happen later in dbt, without reloading anything.",
        },
        {
          title: "Transformation",
          text: "dbt builds cleaned staging views and star-schema marts, with tests such as unique, not-null keys and accepted order statuses.",
        },
        {
          title: "Dashboards",
          text: "Metabase, also running in Docker, sits on top of the marts to explore sales, delivery performance and customer satisfaction.",
        },
      ],
      highlights: [
        "Raw → staging → marts architecture on PostgreSQL 16.",
        "Data quality tests built into the dbt models.",
        "Dockerised and reproducible, with uv, ruff, sqlfluff and pre-commit.",
      ],
    },
  },
  {
    slug: "dbt-snowflake-airflow-pipeline",
    visual: "airflow",
    period: "2026",
    title: "dbt + Snowflake Pipeline Orchestrated with Airflow",
    category: "Data Engineering",
    description: "A layered dbt pipeline on Snowflake, built and tested every day by an Airflow DAG running in Docker.",
    stack: ["Snowflake", "dbt", "Airflow", "Docker", "Python"],
    link: "https://github.com/adnane-amrs/data-engineering-dbt-snowflake-airflow-project",
    details: {
      type: "Personal project",
      context:
        "Raw order data lives in Snowflake and has to become reliable, documented tables for analysis. This project builds a layered dbt pipeline, from declared sources to staging models and a daily revenue mart, then hands it to Apache Airflow so it runs and is tested automatically every day.",
      objectives: [
        "Declare the raw Snowflake tables as dbt sources.",
        "Build staging models and a first business mart, covered by tests.",
        "Run the whole pipeline on a daily schedule, isolated in Docker.",
      ],
      steps: [
        {
          title: "Sources",
          text: "The raw orders and order items tables are declared in sources.yml, so every model traces back to them in the lineage graph.",
        },
        {
          title: "Models",
          text: "Staging models clean the raw tables and feed the fct_daily_order_revenue mart, covered by dbt tests and documented with dbt docs.",
        },
        {
          title: "Orchestration",
          text: "An Airflow 2.10 DAG runs dbt run, then dbt test, every day, with Airflow and its Postgres metadata database started by Docker Compose.",
        },
        {
          title: "Isolation",
          text: "dbt lives in its own virtualenv inside the Airflow image, and Snowflake credentials come from environment variables that are never committed.",
        },
      ],
      highlights: [
        "Daily DAG: dbt run → dbt test, both green.",
        "Lineage from raw sources to the revenue mart.",
        "Credentials kept out of Git with env files and a Docker-only dbt profile.",
      ],
    },
  },
  {
    slug: "moroccan-ecommerce-analysis",
    visual: "chart",
    period: "2026",
    title: "Moroccan E-commerce Sales & Profitability",
    category: "Data Analysis · ML",
    description:
      "End-to-end analysis of Moroccan e-commerce sales, from data cleaning to a model that predicts whether an order is profitable.",
    stack: ["Python", "pandas", "Seaborn", "Scikit-learn"],
    link: "https://github.com/adnane-amrs/Moroccan-E-Commerce-Analysis",
    details: {
      type: "Personal project",
      context:
        "Two relational datasets describe Moroccan e-commerce orders: one with customers, cities and dates, the other with products, amounts, profit and payment method. This project merges them, explores which regions, cities and payment methods drive sales, and trains a model that predicts whether an order will be profitable.",
      objectives: [
        "Merge and clean orders and order details into one master dataset.",
        "Find which regions, cities and payment methods perform best.",
        "Predict order profitability and see which features drive it.",
      ],
      steps: [
        {
          title: "Preparation",
          text: "The two files are joined on Order ID, dates are converted to datetimes, and month and year are extracted for seasonal analysis.",
        },
        {
          title: "Exploration",
          text: "Sales are broken down by region and city, and the hypothesis that installment payments come with larger orders than cash is tested.",
        },
        {
          title: "Modelling",
          text: "Orders are labelled profitable or not, categorical features are one-hot encoded and a Random Forest classifier is trained.",
        },
        {
          title: "Evaluation",
          text: "The model is evaluated with a classification report and a confusion matrix, and feature importance shows what drives profitability.",
        },
      ],
      highlights: [
        "Three notebooks: preparation, exploratory analysis and modelling.",
        "Business questions tied to Moroccan cities and payment habits.",
        "Feature importance to explain what makes an order profitable.",
      ],
    },
  },
  {
    slug: "dbt-duckdb-job-postings",
    visual: "sql",
    period: "2026",
    title: "Job Postings Analytics with dbt & DuckDB",
    category: "Analytics Engineering",
    description:
      "Analytics engineering on about 843k raw job postings, modelled with dbt straight from Parquet files through DuckDB.",
    stack: ["dbt", "DuckDB", "Parquet", "Python", "uv"],
    link: "https://github.com/adnane-amrs/dbt-duckdb-pipeline",
    details: {
      type: "Personal project",
      context:
        "The dataset holds 12 months of data-job postings, about 843k rows, plus the skills mentioned in each posting, about 3.3M rows. Instead of loading it into a database server, dbt reads the raw Parquet files directly through DuckDB, an embedded analytical database, so the whole project runs on a laptop with no infrastructure to manage.",
      objectives: [
        "Query raw Parquet files directly, without a database server.",
        "Clean the postings and drop the rows with scrape errors.",
        "Lay the groundwork for marts on top skills, remote share and posting trends.",
      ],
      steps: [
        {
          title: "Download",
          text: "A Python script downloads the 12 monthly Parquet files and the skills file, about 85 MB, and skips the files already on disk.",
        },
        {
          title: "Environment",
          text: "uv manages Python 3.13 and the dependencies, and the dbt profile points at a local DuckDB database file.",
        },
        {
          title: "Modelling",
          text: "The job_posting view selects the core fields from all monthly files and removes the roughly 151k rows that have scrape errors.",
        },
        {
          title: "Querying",
          text: "Results are queried with the DuckDB CLI, for example to count postings per search term.",
        },
      ],
      highlights: [
        "Zero-infrastructure stack: dbt reads Parquet through DuckDB.",
        "Built on dbt's Fusion engine (v2).",
        "Clear roadmap toward staging models, tests and marts.",
      ],
    },
  },
  {
    slug: "house-price-prediction",
    visual: "predictor",
    period: "2026",
    title: "House Price Prediction App",
    category: "Machine Learning",
    description: "A Streamlit app that estimates a property's sale price in real time from a trained Random Forest model.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Plotly"],
    link: "https://github.com/adnane-amrs/House-Price-Prediction",
    details: {
      type: "Personal project",
      context:
        "Estimating a fair price for a house usually takes an expert. This project trains a Random Forest regressor on historical house sales and wraps it in an interactive Streamlit app: set the property's features and get a price estimate instantly, shown against comparable homes.",
      objectives: [
        "Train a regression model on historical house sales.",
        "Serve it in a simple, interactive web app.",
        "Make the estimate easy to read next to market data.",
      ],
      steps: [
        {
          title: "Data",
          text: "Historical sales with features such as living area, bedrooms, bathrooms, overall quality and year sold.",
        },
        {
          title: "Model",
          text: "A Random Forest regressor is trained on these features and saved with joblib.",
        },
        {
          title: "App",
          text: "Streamlit loads the model once with caching; sidebar sliders set the property's features and the predicted price updates live.",
        },
        {
          title: "Visualisation",
          text: "A Plotly scatter chart places the estimate among comparable homes by living area and quality.",
        },
      ],
      highlights: [
        "Real-time predictions from a saved model.",
        "Interactive Streamlit interface.",
        "Plotly chart for market comparison.",
      ],
    },
  },
];
