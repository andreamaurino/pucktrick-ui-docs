---
sidebar_position: 1
---

# Noise - Categorical Variables

The **noiseCategorical** function introduces noise into a *categorical (numerical or string) column* of a dataset by replacing values with new ones (existing or fake). 

`noiseCategorical(train_df, column, percentage, type = "string", fake_values=False, original_df=None, extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies noise directly to the dataset. 
2. [Extended](#ext) : Introduces noise by comparing  the original dataset with a modified version of it, ensuring no overlapping noise is applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset where noise will be introduced.
- ***column*** (str): The name of the categorical column in which noise will be introduced.
- ***percentage*** (float): The percentage of the column’s values to be modified. The value must be between 0 and 1.
- ***type*** (str, default="string"): Specifies the type of the categorical data. Possible values are *"string"* for textual categories and *"int"* for numerical categories.
- ***fake_values*** (bool, default=False): If `fake_values = True`, new random string values are introduced instead of existing values from the dataset.
- ***original_df*** (DataFrame, optional): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***extended*** (bool, default=False): If `extended = True`, the function applies noise only to rows that haven't already been altered in the original dataset.

### Functionality:

#### Default Mode: {#def}

If `extended=False`, the function directly calculates the number of rows to modify based on the specified percentage of `train_df`.

- If `type = string`: if `fake_values = False`, randomly selects a new value for each row from the existing values in the column and ensures that the new value is not the same as the original value in the row. If `fake_values = True`, generates a random 5-character string for each selected row.

- If `type = int`: replaces each value with a randomly selected existing value from the column. Ensures that the new value is not the same as the original value in the row.

*Example* 

    # SampleDataFrame
    data = { 'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
             'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
             'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    train_df = pd.DataFrame(data)
    
    noise_df = noiseCategorical(train_df, 'column_2', 0.30, type = "string", fake_values=False, original_df=None, extended=False)
    print(noise_df) 

         column_1 column_2  column_3
    0       apple   purple         1 
    1      banana   purple         2
    2      cherry    brown         3
    3        date    brown         4
    4  elderberry   purple         5
    5         fig   purple         6
    6       grape    green         7
    7    honeydew    green         8
    8        kiwi    brown         9
    9       lemon   yellow        10
    
#### Extended Mode: {#ext}

If `extended = True`, the function will introduce noise while considering existing modifications in `train_df`, ensuring that it does not introduce noise to rows that have already been altered.
Then, it introduces noise into the categorical column in the same way as the default mode depending on the data type and the method.

*Example* 

    # Sample original DataFrame
    original_data = {'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
                     'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
                     'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    original_df = pd.DataFrame(original_data)
    
    # Sample training DataFrame with existing noise
    train_data = {'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
                  'column_2': ['purple', 'purple', 'brown', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
                  'column_3': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    train_df = pd.DataFrame(train_data)
    
    noise_df = noiseCategorical(train_df, 'column_2', 0.50, type = "string",fake_values=False, original_df=original_df, extended=True)
    print(noise_df) 
    
         column_1 column_2  column_3
    0       apple   purple       1
    1      banana   purple       2
    2      cherry    brown       3
    3        date   yellow       4
    4  elderberry    brown       5
    5         fig   purple       6
    6       grape    green       7
    7    honeydew    green       8
    8        kiwi    brown       9
    9       lemon   yellow      10

