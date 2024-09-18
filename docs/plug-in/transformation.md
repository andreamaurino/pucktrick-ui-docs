---
sidebar_position: 3
---

# Transformation

Transformation plugins allow to modify table data by applying `Transformations` to the data. Each plugin is applied to individual columns and enables the user to modify a column while leaving the rest of the table unchanged. Alternatively, it enables to add a new column based on an existing one.

### General Guidelines

1. **Isolation:** Each plugin should operate independently and not interfere with other plugins or the core functionality of MantisTable UI.
2. **Configuration:** Plugins should allow configuration through environment variables or configuration files.
3. **Documentation:** Provide clear documentation for each plugin, including usage instructions, dependencies, and configuration options.

### Transformation Plugin Example

**Structure:**

```
/addon-plugin-example
  transform.py
  config.json
  input.json
  output/
    transform.json
  README.md
```

**export.py:**

```python
### Read Annotated Table
file_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json"
file_open = open(file_path, encoding="utf-8")
data = json.load(file_open)

# TRANSFORM CODE

# Write output on output.html
with open(f"{os.path.dirname(os.path.realpath(__file__))}/output/transform.json", 'w', encoding="utf-8") as f:
    json.dump({"new_column": new_column}, f)
```

**config.json:**

```json
{
  "type": "transform",
  "output": "transform.json",
  "entry_file": "transform.py",
  "name": "uppercase",
  "description": "Transform plugin",
  "column_type": "STRING" // "STRING" | "DATETIME" | "TIME" | "EMAIL" | "URL" | "FLOAT" | "INTEGER" | "DATE"
}
```

The entry file is specified by the `entry_file` field in the `config.json` file and it represents the entry point of the plugin, as it is the file that is executed to apply the plugin. Once the plugin is selected, the annotated table (defined in the output of the STI sytem ~ [External STI Approach](/docs/sti/external-sti-approach)) is injected in the `input.json` file. Then, the `entry_file` is applied using the `subprocess` module in python and, finally, the output is read in the file defined by the `config.json` using the `output` field (usually defined as `output.html`) in the root folder. For this reason it is very important to use the following structure to identify the correct file path in the plugin:

```python
table_input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json" # input table
output_file_path = f"{os.path.dirname(os.path.realpath(__file__))}/output/transform.json" # output html
```

The plugin is executed on an isolated environment, so you can't install your own libraries but some are already installed:

```
tqdm
rdflib
pandas
numpy
requests
```

## Using Plugins in MantisTable UI

1. **Install the Plugin:**

   - Place the plugin files in the appropriate directory as specified in the configuration file.
   - Ensure all dependencies are installed and properly configured.

2. **Configure the Plugin:**

   - Update the `config.json` file with the necessary configuration parameters.

3. **Access Plugin Functionality:**
   - Export plugins can be accessed through the export menu in the UI.
   - Add-on plugins are typically accessed through semantic processing options.
   - Transformation plugins can be applied through the data transformation tools in the UI.

## Plugin already available

- **`UPPERCASE`**

  The `uppercase` plugin has been added to have a simple example on how plugins work in MantisTable UI. This plugin works with `STRING` only columns and converts each cell's text to uppercase text.

- **`REVERSE_GEOCODING`**

The `reverse_geocoding` plugin works with `GEOCOODING` columns by converting geocoordinates to complete addresses. It uses [Open Street Map API](https://nominatim.openstreetmap.org/ui/reverse.html) to obtain the corresponding address of the geocoordinates.
