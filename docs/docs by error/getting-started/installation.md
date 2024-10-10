---
sidebar_position: 1
---

## Installation

This guide will walk you through the installation of Pucktrick. By following these instructions, you can install the library and its dependencies quickly and easily, whether through **Docker** or using **pip**.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#install)

## Prerequisites

Before you begin, ensure you have the following python package installed on your system:

- numpy>=1.19.2
- pandas>=1.2.0

If they are not installed, you can do so by running:

    pip install numpy pandas
    
Also, make sure you are using Python 3.7 or higher.

## Installation {#install}

### Installing via pip
 
To install Pucktrick for the first time:

    pip install pucktrick 

To upgrade to the latest version:

    pip install --upgrade pucktrick

### Installing via Docker

Create a Docker image using the following Dockerfile:

    FROM python:3.8-slim
    
    WORKDIR /app
    
    # Install dependencies
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    
    # Copy the library code
    COPY . .
    
    CMD ["python", "your_script.py"]
    
Build and run the Docker container:

    docker build -t pucktrick .
    docker run -it --rm pucktrick

Now you're ready to use Pucktrick in your development environment.
