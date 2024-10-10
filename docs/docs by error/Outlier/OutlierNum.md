---
sidebar_position: 1
---

# Outlier Injection - Numerical Variables

The **outlierNum** function introduces outliers into a numerical column. It works for both *discrete* and *continuos* variables.\
Outliers are extreme values that deviate significantly from the majority of the data and can be useful for testing the robustness of models in the presence of erroneous data points.
\
The following method introduce outliers into a specified variable using a **3-sigma approach**. The 3-sigma method is a statistical technique used to identify outliers in a dataset by evaluating how far data points deviate from the mean. Specifically, it considers values that lie beyond three standard deviations from the mean as potential outliers.\

`outlierNum(train_df,column,percentage,type="discrete",original_df=None,extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies outliers directly to the dataset. 
2. [Extended](#ext) : Introduces outliers by comparing  the original dataset with a modified version of it, ensuring no overlapping outliers are applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset where outliers will be introduced.
- ***column*** (str): The name of the numerical column where outliers will be introduced.
- ***percentage*** (float): The percentage of values in the column to be turned into outliers.
- ***type*** (str, default="discrete"): Specifies the type of the numerical data. Possible values are: *"discrete"* or *"continuos"*.
- ***original_df*** (DataFrame, optional): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***extended*** (bool, default=False): If `extended = True`, the function applies outliers only to rows that haven't already been altered in the original dataset.

### Functionality:

#### Default Mode: {#def}

If `extended=False`, the function directly calculates the number of rows to modify based on the specified percentage of `train_df` and then calculates the mean and standard deviation of the specified column.

- If `type = 'discrete'`: Determines the 3-sigma bounds for normal data points: upper and lower bounds are set to mean ± 3 standard deviations. If necessary, the bounds are adjusted to avoid degenerate cases (e.g., where upper and lower bounds are equal). Then generate outliers: Outliers are values that lie either beyond the upper bound (mean + 4 standard deviations) or below the lower bound (mean - 4 standard deviations). These values are injected into the sampled rows.

- If `type = 'continuos'`: Determines the upper and lower bounds (mean ± 3 standard deviations) for normal values. Then generates outliers either above the upper bound or below the lower bound, with values determined by a secondary range (mean ± 4 standard deviations).

*Example*

    # Sample DataFrame with a continuous variable
    data = {'value': [10.5, 12.3, 13.7, 14.2, 15.8, 16.1, 17.4, 18.9, 19.5, 20.3]}
    train_df = pd.DataFrame(data)

    outlier_df = outlierNum(train_df,'value',0.20,type="continuos",original_df=None,extended=False)
    print(outlier_df)
    
           value
    0   4.327987
    1   6.232594
    2  13.700000
    3  14.200000
    4  15.800000
    5  16.100000
    6  17.400000
    7  18.900000
    8  19.500000
    9  20.300000

#### Extended Mode: {#ext}


If `extended = True`, the function will introduce outliers while considering existing modifications in `train_df`, ensuring that it does not introduce outliers to rows that have already been altered.
Then, it introduces outliers into the numerical column in the same way as the default mode depending on the data type.

*Example*

    # Sample original DataFrame
    original_data = {'value': [10.5, 12.3, 13.7, 14.2, 15.8, 16.1, 17.4, 18.9, 19.5, 20.3]}
    original_df = pd.DataFrame(original_data)
    
    # Sample training DataFrame with outliers
    train_data = {'value': [4.327987, 6.232594, 13.700000, 14.200000, 15.800000, 16.100000, 17.400000, 18.900000, 
                            19.500000, 20.300000]}
    train_df = pd.DataFrame(train_data)
    
    outlier_df = outlierNum(train_df,'value',0.40,type="continuos",original_df=original_df,extended=True)
    print(outlier_df)
    
           value
    0   4.327987
    1   6.232594
    2  25.862281
    3  24.260869
    4  15.800000
    5  16.100000
    6  17.400000
    7  18.900000
    8  19.500000
    9  20.300000





