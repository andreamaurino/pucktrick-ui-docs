---
sidebar_position: 2
---

# Configuration

This document describes the configuration file parameters for MantisTable UI. The configuration file is essential for connecting to databases, setting up external services, and customising application behavior.

## How to Use the Configuration File

1. **Copy the Example File**

   First, make a copy of the `.env.example.prod` file. This can be done using the following command in a terminal:

   ```sh
   cp .env.example.prod .env
   ```

   The `.env.example.prod` is located inside the main folder:

   ```bash
    mantistable-ui
    ├── export
    ├── public
    ├── src
    ├── .gitignore
    ├── README.md
    ├── components.json
    ├── docker-compose.yml
    ├── drizzle.config.ts
    ├── .env.example.dev
    ├── .env.example.prod
    .
   ```

2. **Edit the Configuration File**

   Open the newly created `.env` file in a text editor of your choice. Modify the parameters as needed to fit your environment. Below is an example of how the file might look after customization:

   ```env
   # PostgreSQL
   POSTGRESQL_PASS="..."
   POSTGRES_HOST="..."
   POSTGRES_PORT="..."
   POSTGRES_DB="..."
   POSTGRES_USER="..."

   # MongoDB
   MONGO_INITDB_ROOT_USERNAME="..."
   MONGO_INITDB_ROOT_PASSWORD="..."

   # STI service
   STI_HOST="..."
   # UPLOAD
   STI_HOST_UPLOAD_AND_PROCESS_PATH = "..."
   STI_HOST_UPLOAD_AND_PROCESS_PARAMS = "..."
   # DOWNLOAD
   STI_HOST_DOWNLOAD_PATH_ONE = "..."
   STI_HOST_DOWNLOAD_PATH_DATASET = "..."
   STI_HOST_DOWNLOAD_PATH_TWO = "..."
   STI_HOST_DOWNLOAD_PARAMS = "..."

   # Plugins
   PLUGINS_HOST="..."
   NEXT_PUBLIC_PLUGINS_HOST="..."
   PLUGINS_PORT="..."

   # Mantis
   MANTIS_OUTSIDEPORT="..."

   # Mantistablex Variables
   GPT_KEY="..."
   GPT_ENDPOINT="..."
   ```

## Configuration Parameters

### PostgreSQL

- **`POSTGRESQL_PASS`**

  ```plaintext
  POSTGRESQL_PASS="password!"
  ```

  The password for the PostgreSQL database.

- **`POSTGRES_HOST`**

  ```plaintext
  POSTGRES_HOST="localhost"
  ```

  The hostname or IP address of the PostgreSQL server. The service is available also inside the Docker Network, so it is possible to specify `postgres`, which is the name of the service.

- **`POSTGRES_PORT`**

  ```plaintext
  POSTGRES_PORT="5432"
  ```

  The port on which the PostgreSQL server is running. `5432` is the default one.

- **`POSTGRES_DB`**

  ```plaintext
  POSTGRES_DB="mantistableui"
  ```

  The name of the PostgreSQL database to connect to.

- **`POSTGRES_USER`**

  ```plaintext
  POSTGRES_USER="user"
  ```

  The username for the PostgreSQL database.

### MongoDB

- **`MONGO_INITDB_ROOT_USERNAME`**

  ```plaintext
  MONGO_INITDB_ROOT_USERNAME="root"
  ```

  The root username for the MongoDB instance.

- **`MONGO_INITDB_ROOT_PASSWORD`**

  ```plaintext
  MONGO_INITDB_ROOT_PASSWORD="password!"
  ```

  The root password for the MongoDB instance.

### External STI Services

- **`STI_HOST`**

```plaintext
STI_HOST="http://sti_process/"
```

The base address of the STI endpoint. Replace this with the appropriate URL for your setup.

- **`STI_HOST_UPLOAD_AND_PROCESS_PATH`**

```plaintext
STI_HOST_UPLOAD_AND_PROCESS_PATH="/path_of_your_endpoint"
```

The path of the STI endpoint available to upload and process a single table, which is concatenated with `STI_HOST` base address. Replace this with the appropriate path for your setup.

- **`STI_HOST_UPLOAD_AND_PROCESS_PARAMS`**

```plaintext
STI_HOST_UPLOAD_AND_PROCESS_PARAMS="?token=...."
```

This environment variable is needed to add further parameters such as the `token`. Replace this with the appropriate parameters, if needed.

- **`STI_HOST_DOWNLOAD_PATH_ONE`**

```plaintext
STI_HOST_DOWNLOAD_PATH_ONE="/path_one_download"
```

The path of the STI endpoint for the download process, which is concatenated with `STI_HOST` base address. Replace this with the path for your setup.

- **`STI_HOST_DOWNLOAD_PATH_DATASET`**

```plaintext
STI_HOST_DOWNLOAD_PATH_DATASET="/dataset_name"
```

The path of the STI endpoint for the download process, which is concatenated with `STI_HOST_DOWNLOAD_PATH_ONE` address. Replace this with the name of your dataset, if needed.

- **`STI_HOST_DOWNLOAD_PATH_TWO`**

```plaintext
STI_HOST_DOWNLOAD_PATH_TWO="/path_two_download"
```

The path of the STI endpoint for the download process, which is concatenated with `STI_HOST_DOWNLOAD_PATH_DATASET` address. Replace this with the second path for your setup.

- **`STI_HOST_DOWNLOAD_PARAMS`**

```plaintext
STI_HOST_DOWNLOAD_PARAMS="?token=...."
```

This environment variable is needed to add further parameters such as the `token`. Replace this with the appropriate parameters, if needed.

:::warning
The external Semantic Table Interpretation service must expose APIs as indicated in [External STI Approach](/docs/sti/external-sti-approach) page.
:::

### Plugins

- **`PLUGINS_HOST`**

  ```plaintext
  PLUGINS_HOST="http://api:5000"
  ```

  The address of the plugin service. The address specified here, such as `http://api:5000`, is external to the docker network because it is used in the frontend module.

- **`NEXT_PUBLIC_PLUGINS_HOST`**

  ```plaintext
  NEXT_PUBLIC_PLUGINS_HOST="http://localhost:5001"
  ```

  The address of the plugin service. The address specified here is used inside the docker network, such as `http://localhost:5001`, because it is used in the frontend module.

- **`PLUGINS_PORT`**

  ```plaintext
  PLUGINS_PORT="5001"
  ```

  The port on which the plugins service (Doker container) will run.

### MantisTable

- **`MANTIS_OUTSIDEPORT`**

  ```plaintext
  MANTIS_OUTSIDEPORT="3000"
  ```

  The port on which the frontend platform service (Doker container) will run.

### Mantistablex

- **`GPT_KEY`**

  ```plaintext
  GPT_KEY="..."
  ```

  The private key from GPT APIs used to execute the mantistablex plugin.

- **`GPT_ENDPOINT`**

  ```plaintext
  GPT_ENDPOINT="..."
  ```

  The endpoint from GPT APIs used to execute the mantistablex plugin.

## Configuration File Example

Below is a complete example of a configuration file with all parameters:

```plaintext
   # PostgreSQL
   POSTGRESQL_PASS="table_ui2024!"
   POSTGRES_HOST="postgres"
   POSTGRES_PORT="5432"
   POSTGRES_DB="postgrestableui"
   POSTGRES_USER="postgres"

   # MongoDB
   MONGO_INITDB_ROOT_USERNAME="root"
   MONGO_INITDB_ROOT_PASSWORD="export2024!"

   # STI service
   STI_HOST="https://selbat.datai.disco.unimib.it/"
   # UPLOAD
   STI_HOST_UPLOAD_AND_PROCESS_PATH = "dataset/createWithArray"
   STI_HOST_UPLOAD_AND_PROCESS_PARAMS = "?token=selBat_demo_2023"
   # DOWNLOAD
   STI_HOST_DOWNLOAD_PATH_ONE = "dataset/"
   STI_HOST_DOWNLOAD_PATH_DATASET = "mantisTables/"
   STI_HOST_DOWNLOAD_PATH_TWO = "table/"
   STI_HOST_DOWNLOAD_PARAMS = "?token=selBat_demo_2023"

   # Plugins
   PLUGINS_HOST="http://api:5000"
   NEXT_PUBLIC_PLUGINS_HOST="http://localhost:5001"
   PLUGINS_PORT="5001"

   # Mantis
   MANTIS_OUTSIDEPORT="3000"

   # Mantistablex Variables
   GPT_KEY="..."
   GPT_ENDPOINT="..."
```

## Conclusion

The configuration file for MantisTable UI is **crucial** for ensuring proper connections to databases and external services. By correctly setting these parameters, you are ensuring smooth operation and integration of MantisTable UI within your environment.

:::warning
Check if the `/plugins` folder under `/app` directory in plguns API is present, otherwise, create it empty.
:::
