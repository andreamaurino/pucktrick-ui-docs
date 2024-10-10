---
sidebar_position: 1
---

# Outlier Injection - Categorical Variables

The **outlierCat** function introduces outliers into a categorical column. It works for both *string-based* and *integer-based* categories, and outliers are created by replacing selected values with a fixed string or extreme integer values.\
Outliers are extreme values that deviate significantly from the majority of the data and can be useful for testing the robustness of models in the presence of erroneous data points.

`outlierCat(train_df,column,percentage,type="string",original_df=None,extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies outliers directly to the dataset. 
2. [Extended](#ext) : Introduces outliers by comparing  the original dataset with a modified version of it, ensuring no overlapping outliers are applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset where outliers will be introduced.
- ***column*** (str): The name of the categorical column where outliers will be introduced.
- ***percentage*** (float): The percentage of values in the column to be turned into outliers. The value must be between 0 and 1.
- ***type*** (str, default="string"): Specifies the type of the categorical data. Possible values are: *"string"* or *"int"*.
- ***original_df*** (DataFrame, optional): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***extended*** (bool, default=False): If `extended = True`, the function applies outliers only to rows that haven't already been altered in the original dataset.

### Functionality:

#### Default Mode: {#def}

If `extended=False`, the function directly calculates the number of rows to modify based on the specified percentage of `train_df`.

- If `type = 'string'`: Modifies the selected data points in the specified column to a predefined string ("puck was here").

- If `type = 'int'`: Computes the maximum and minimum values of the specified column to determine the bounds for new outlier values, ensuring they are outside the existing range of values.

*Example*

    # Sample DataFrame
    data = {'category': ['A', 'B', 'C', 'D', 'E']}
    train_df = pd.DataFrame(data)
    
    outlier_df = outlierCat(train_df,'category',0.40,type="string",original_df=None,extended=False)
    print(outlier_df)
  
            category
    0  puck was here
    1  puck was here
    2              C
    3              D
    4              E

#### Extended Mode: {#ext}

If `extended = True`, the function will introduce outliers while considering existing modifications in `train_df`, ensuring that it does not introduce outliers to rows that have already been altered.
Then, it introduces outliers into the categorical column in the same way as the default mode depending on the data type.

*Example*

    # Sample original DataFrame
    original_data = {'category': ['A', 'B', 'C', 'D', 'E']}
    original_df = pd.DataFrame(original_data)
    
    # Sample training DataFrame with outliers
    train_data = {'category': ['puck was here', 'puck was here', 'C', 'D', 'E']}
    train_df = pd.DataFrame(train_data)
    
    outlier_df = outlierCat(train_df,'category',0.60,type="string",original_df=original_df,extended=True)
    print(outlier_df)
    
            category
    0  puck was here
    1  puck was here
    2  puck was here
    3              D
    4              E





