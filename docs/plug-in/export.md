---
sidebar_position: 1
---

# Export Plugins

Export plugins enable MantisTable UI to export data and annotations in user-defined formats.

### General Guidelines

1. **Isolation:** Each plugin should operate independently and not interfere with other plugins or the core functionality of MantisTable UI.
2. **Configuration:** Plugins should allow configuration through environment variables or configuration files.
3. **Documentation:** Provide clear documentation for each plugin, including usage instructions, dependencies, and configuration options.

### Export Plugin Example

**Structure:**

```
/export-plugin-example
  export.py
  config.json
  input.json
  output/
    kg.json
  README.md
```

**export.py:**

```python
file_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json"
file_open = open(file_path, encoding="utf-8")
data = json.load(file_open)
# EXPORT CODE
export_file_path = f"{os.path.dirname(os.path.realpath(__file__))}/output/kg.json"
```

**config.json:**

```json
{
  "type": "export",
  "output": "kg.json",
  "entry_file": "export.py",
  "name": "json",
  "description": "The 'json' Export Plugin allows users to export annotated tables from Wikidata into JSON triples. This plugin processes tables annotated with Wikidata properties and values, converting them into a structured JSON format that represents each cell's data as <subject-predicate-object> triples. It simplifies data extraction and integration for developers and researchers working with linked data and semantic web applications"
}
```

The entry file is specified by the `entry_file` field in the `config.json` file and it represents the entry point of the plugin, as it is the file that is executed to apply the plugin. Once the plugin is selected, the annotated table (defined in the output of the STI sytem ~ [External STI Approach](/docs/sti/external-sti-approach)) is injected in the `input.json` file. Then, the `entry_file` is applied using the `subprocess` module in python and, finally, the output is read in the file defined by the `config.json` using the `output` field in the `output` directory. For this reason, it is very important to use the following structure to identify the correct file path in the plugin:

```python
file_path = f"{os.path.dirname(os.path.realpath(__file__))}/input.json" # input
export_file_path = f"{os.path.dirname(os.path.realpath(__file__))}/output/kg.json" # output
```

The plugin is executed in an isolated environment. Therefore, you can't install you own libraries, but the following ones are already installed:

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

- **`TTL`**

  The `Turtle` (ttl) plugin facilitates the creation of export files from annotated tables in Wikidata. This tool converts the annotated data into Turtle triples, a popular format for representing RDF (Resource Description Framework) data. Users can effortlessly generate these export files to be utilized in various semantic web applications, ensuring a smooth and structured data interchange.

- **`XML`**

  The `XML` Export Plugin is designed to generate XML files containing triples extracted from annotated tables within Wikidata. This plugin identifies and processes annotated data, transforming it into structured XML format. The resulting XML triples encapsulate relationships and entities, facilitating data interoperability and integration with other systems. Ideal for developers and data scientists, this tool enhances data extraction and export capabilities from Wikidata's rich dataset.

- **`JSON`**

  The `JSON` Export Plugin allows users to export annotated tables from Wikidata into JSON triples. This plugin processes tables annotated with Wikidata properties and values, converting them into a structured JSON format that represents each cell's data as `<subject-predicate-object>` triples. It simplifies data extraction and integration for developers and researchers working with linked data and semantic web applications.

- **`N3`**

  This plugin enables users to export annotated tables from Wikidata into `N3` (Notation3) triples format. By integrating with Wikidata's data model, it captures semantic annotations and converts them into structured N3 triples. This facilitates interoperability and enhances data sharing by adhering to linked data principles. Ideal for researchers and developers, it simplifies the extraction of rich, machine-readable data from Wikidata's vast knowledge base.

- **`NTriples`**

  This plugin enables users to export annotated tables from Wikidata into `NTriples` format. It efficiently converts the structured data and metadata from Wikidata entries into a series of RDF triples, adhering to the NTriples specification. Ideal for researchers and developers, it facilitates data integration and interoperability within semantic web applications. You can simply annotate your table in Wikidata, and use the plugin to generate an export file containing the corresponding NTriples triples.

- **`TRIG`**

  The `TRIG` plugin facilitates the creation of export files from annotated tables in Wikidata. This tool converts the annotated data into Turtle triples, a popular format for representing RDF (Resource Description Framework) data. Users can effortlessly generate these export files to be utilized in various semantic web applications, ensuring a smooth and structured data interchange.
