---
sidebar_position: 2
---

## Error strategy

This is the main news of the version 0.5 of Pucktrick. An error strategy is a json file that user must create to define:
1. The subset of features or target variable to be consdered (*affected_features*), use 'all' in case you want to select all rows
2. A pradicate for selecting rows to be modified (*selection_criteria*), use 'all' in case you want to select all rows
3. The perentage of corruption
4. The mode of  corruption (new or extended)
5. Distribution type with parameter (if needed)

An example of JSON file is the follows:

'Strategy': {'affected_features': ['marital-status', 'relationship'], 'selection_criteria': 'all', 'percentage': 0.2, 'mode': 'new', 'perturbate_data': {'distribution': 'random'}


   
