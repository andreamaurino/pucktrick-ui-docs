---
sidebar_position: 1
---

# Missing Value Injection

The **missing** function introduces missing values (NaN) into a specified column of a dataset based on a given percentage.

`missing(train_df, column, percentage, original_df=None, extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies missing values directly to the dataset. 
2. [Extended](#ext) : Introduces missing values by comparing  the original dataset with a modified version of it, ensuring no overlapping missing values are applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset on which missing value injections will be applied. 
- ***column*** (str): The name of the column in which missing values will be introduced.
- ***percentage*** (float): The percentage of missing values to introduce into the specified column. The value must be between 0 and 1.
- ***original_df*** (DataFrame, default=None): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***extended*** (bool, default=False): Indicates whether to use extended mode. If `extended=True`, the function will consider existing modifications in the training dataset to avoid introducing missing values to entries that have already been altered.

### Functionality:

#### Default Mode:{#def}

If `extended = False` (default), missing value injection is based solely on the training dataset. The function directly calculates the number of entries to modify based on the specified percentage of `train_df`. It applies the missing value injection function to the specified column and returns the modified dataset.

*Example*:


      # Sample DataFrame
      data = { 'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 
             'honeydew', 'kiwi', 'lemon'],
             'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
             'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      train_df = pd.DataFrame(data)
      
      missing_df = missing(train_df, 'column_2', 0.30, original_df=None, extended=False)
      print(missing_df)

           column_1 column_2  column_3
      0       apple      NaN         1
      1      banana      NaN         2
      2      cherry      NaN         3
      3        date    brown         4
      4  elderberry   purple         5
      5         fig   purple         6
      6       grape    green         7
      7    honeydew    green         8
      8        kiwi    brown         9
      9       lemon   yellow        10


#### Extended Mode:{#ext}

If `extended = True`, the function will introduce missing values while considering existing modifications in `train_df`, ensuring that it does not introduce missing values to entries that have already been altered.
The function calculates the total number of entries to modify according to the specified percentage. It checks how many entries are already missing in both `original_df` and `train_df`, and subtracts the number of existing missing values to determine how many new entries can be set to *NaN*. It then applies the missing value injection function accordingly.

*Example*:

      # Sample original DataFrame
      original_data = { 'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 
             'honeydew', 'kiwi', 'lemon'],
             'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
             'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      original_df = pd.DataFrame(original_data)
      
      # Sample training DataFrame with existing missing values
      train_data = { 'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 
             'honeydew', 'kiwi', 'lemon'],
             'column_2': ['NaN', 'NaN', 'NaN', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
             'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      train_df = pd.DataFrame(train_data)
      
      missing_df = missing(train_df, 'column_3', 0.30, original_df, extended=True)
      print(missing_df)
      
           column_1 column_2  column_3
      0       apple      NaN       NaN
      1      banana      NaN       NaN
      2      cherry      NaN       NaN
      3        date    brown         4
      4  elderberry   purple         5
      5         fig   purple         6
      6       grape    green         7
      7    honeydew    green         8
      8        kiwi    brown         9
      9       lemon   yellow        10
