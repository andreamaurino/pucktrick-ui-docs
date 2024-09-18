---
sidebar_position: 1
---

# Installation

This page will guide you through the installation of the application using Docker.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installdocker)
   - [Using Docker](#using-docker)
   - [Using Docker Compose](#using-docker-compose)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (for Docker Compose installation)
- A modern web browser (e.g., Chrome, Firefox, Edge)

## Installation {#installdocker}

### Using Docker Compose

1. **In the terminal, navigate to the project directory**

2. **Start the Docker Compose Services**

   If not already done, download and install the images. Then, run the containers using the following command:

   ```sh
   docker-compose up
   ```

   Otherwise, if you want to run containers in detached mode, use the following command:

   ```sh
   docker-compose up -d
   ```

3. **Access the Application**

   Open your web browser and navigate to `http://localhost:3000` to access the MantisTable UI.

   :::warning
   For a correct start of MantisTable UI it is necessary to modify the configuration file as indicated in the [Configuration](configuration.md) page.
   Note that if the configuration file specifies a different port, you have to change it (`3000`) with the correct one.
   :::
