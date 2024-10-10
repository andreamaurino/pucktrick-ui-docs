---
sidebar_position: 1
---

# Noise - No Categorical Variables

The **noiseNoCategorical** function introduces noise into a *numerical (discrete or continuos)* or *binary* column of a dataset by replacing values with new ones. 

`noiseNoCategorical(train_df, column, percentage, type = "bin", original_df=None, extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies noise directly to the dataset. 
2. [Extended](#ext) : Introduces noise by comparing  the original dataset with a modified version of it, ensuring no overlapping noise is applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset where noise will be introduced.
- ***column*** (str): The name of the column in which noise will be introduced.
- ***percentage*** (float): The percentage of the column’s values to be modified. The value must be between 0 and 1.
- ***type*** (str, default="bin"): Specifies the type of the data. Possible values are *"bin"*, *"discrete"* or *"continuos"*.
- ***original_df*** (DataFrame, optional): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***extended*** (bool, default=False): If `extended = True`, the function applies noise only to rows that haven't already been altered in the original dataset.

### Functionality:

#### Default Mode: {#def}

If `extended=False`, the function directly calculates the number of rows to modify based on the specified percentage of `train_df`.

- If `type = "bin"`: Flips binary values (0 becomes 1, and 1 becomes 0) in the selected percentage of rows.

- If `type = "discrete"` or `type = "continuos"`: Calculates the minimum and maximum values of the specified column. For each selected row, replaces the original value with a new random float or integer within the specified range, ensuring that the new value is different from the original.

*Example* 

    # SampleDataFrame
    data = { 'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
             'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
             'column_3': [10.5, 20.0, 15.7, 18.3, 25.4, 30.1, 12.0, 22.5, 27.3, 29.0]}
    train_df = pd.DataFrame(data)
    
    noise_df = noiseNoCategorical(train_df, 'column_3', 0.30, type = "continuos", original_df=None, extended=False)
    print(noise_df) 

         column_1 column_2   column_3
    0       apple      red  14.035069
    1      banana   yellow  11.121442
    2      cherry      red  27.274710
    3        date    brown  18.300000
    4  elderberry   purple  25.400000
    5         fig   purple  30.100000
    6       grape    green  12.000000
    7    honeydew    green  22.500000
    8        kiwi    brown  27.300000
    9       lemon   yellow  29.000000

    
#### Extended Mode: {#ext}

If `extended = True`, the function will introduce noise while considering existing modifications in `train_df`, ensuring that it does not introduce noise to rows that have already been altered.
Then, it introduces noise into the column in the same way as the default mode depending on the data type.

*Example* 

    # Sample original DataFrame
    original_data = {'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
                     'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
                     'column_3': [10.5, 20.0, 15.7, 18.3, 25.4, 30.1, 12.0, 22.5, 27.3, 29.0]}
    original_df = pd.DataFrame(original_data)
    
    # Sample training DataFrame with 'column_3' already altered
    train_data = {'column_1': ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon'],
                  'column_2': ['red', 'yellow', 'red', 'brown', 'purple', 'purple', 'green', 'green', 'brown', 'yellow'],
                  'column_3': [14.035069, 11.121442, 27.274710, 18.3, 25.4, 30.1, 12.0, 22.5, 27.3, 29.0]}
    train_df = pd.DataFrame(train_data)
    
    noise_df = noiseNoCategorical(train_df, 'column_3', 0.50, type = "continuos", original_df=original_df, extended=True)
    print(noise_df) 
    
         column_1 column_2   column_3
    0       apple      red  14.035069
    1      banana   yellow  11.121442
    2      cherry      red  27.274710
    3        date    brown  29.724353
    4  elderberry   purple  12.483930
    5         fig   purple  30.100000
    6       grape    green  12.000000
    7    honeydew    green  22.500000
    8        kiwi    brown  27.300000
    9       lemon   yellow  29.000000


