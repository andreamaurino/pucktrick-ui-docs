---
sidebar_position: 2
---

# Add-on

Add-on plugins enable MantisTable UI to perform arbitrary tasks on the annotated table. An example of add-on plugin is (`mantistablex`), which performs the lexicalization of an annotated table.

### General Guidelines

1. **Isolation:** Each plugin should operate independently and not interfere with other plugins or the core functionality of MantisTable UI.
2. **Configuration:** Plugins should allow configuration through environment variables or configuration files.
3. **Documentation:** Provide clear documentation for each plugin, including usage instructions, dependencies, and configuration options.

### Add-on Plugin Example

**Structure:**

```
/addon-plugin-example
  mantistablex.py
  config.json
  input.json
  inputData.json
  input.html
  output.html
  README.md
```

**export.py:**

```python
### Read Annotated Table
table_input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json"
file_input = open(table_input_path, encoding="utf-8")
original_table = json.load(file_input)
# Read Input Data for the Plugin
input_data_path = f"{os.path.dirname(os.path.realpath(__file__))}/inputData.json"
file_input_data = open(input_data_path, encoding="utf-8")
input_data: dict = json.load(file_input_data)

# ADD-ON CODE

# Write output on output.html
output_file_path = f"{os.path.dirname(os.path.realpath(__file__))}/output.html"
```

**config.json:**

```json
{
  "type": "addon",
  "name": "mantistablex",
  "description": "MantisTableX plugin converts structured data into natural language descriptions. Given an input table with annotations specifying the relationships and significance of its data, the tool generates coherent textual summaries or narratives that convey the table's information in readable and contextually appropriate sentences.",
  "entry_file": "mantistablex.py",
  "output": "output.html"
}
```

The entry file is specified by the `entry_file` field in the `config.json` file and it represents the entry point of the plugin, as it is the file that is executed to apply the plugin. Once the plugin is selected, the annotated table (defined in the output of the STI sytem ~ [External STI Approach](/docs/sti/external-sti-approach)) is injected in the `input.json` file. In this case, there is also the possibility to define an html form to enable the user to send input data to the add-on plugin for its execution. To add input data, it is important to define the form in the `input.html` file using a `<div>` as root element. Then, the `entry_file` is applied using the `subprocess` module in python and, finally, the output is read in the file defined by the `config.json` using the `output` field (usually defined as `output.html`) in the root folder. For this reason, it is crucial to use the following structure to identify the correct file path in the plugin:

```python
table_input_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json" # input table
input_data_path = f"{os.path.dirname(os.path.realpath(__file__))}/inputData.json" # input data
output_file_path = f"{os.path.dirname(os.path.realpath(__file__))}/output.html" # output html
```

The plugin is executed in an isolated environment. Therefore, you can't install you own libraries, but the following ones are already installed:

```
tqdm
rdflib
pandas
numpy
requests
```

Add-on plugins are very powerful because they let the plugin developer define the UI to be used to display the data entry form and the plugin's output, by using HTML Markup Language and inline CSS to style the content.

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

## Already available plugins

- **`Mantistablex`**

  `Mantistablex` plugin converts structured data into natural language descriptions. Given an input table with annotations specifying the relationships and significance of its data, the tool generates coherent textual summaries or narratives that convey the table's information in readable and contextually appropriate sentences.
