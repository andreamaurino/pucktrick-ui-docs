---
sidebar_position: 1
---

#  Label Modification Injection

The **wrongLabels** function introduces errors into the labels of a dataset based on specified conditions. It can modify *binary* or *categorical* labels.

`wrongLabels(train_df, original_df=None, target=None, percentage=None, type='binary', extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies errors directly to the dataset. 
2. [Extended](#ext) : Introduces errors by comparing  the original dataset with a modified version of it, ensuring no overlapping errors are applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset on which label modifications will be applied. 
- ***original_df*** (DataFrame, default=None): The untouched original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***target*** (str, default=None): The name of the label column.
- ***percentage*** (float, default=None): The percentage of errors to introduce into the labels. The value must be between 0 and 1.
- ***type*** (str, default='binary'): Specifies the type of the label; either *'binary'* or *'categorical'*.
- ***extended*** (bool, default=False): Indicates whether to use extended mode. If `extended=True`, the function will consider existing modifications in the training dataset to avoid introducing errors to labels that have already been altered.

### Functionality:

#### Default Mode: {#def}

If `extended = False`, the function directly calculates the number of labels to modify based on the specified percentage of `train_df`. It applies the errors introduction function to the specified target column and returns the modified dataset.

- If `type='binary'`, the function modifies labels in the specified *binary target* column of the dataset. 

- If `type='categorical'`, the function modifies labels in the specified *categorical target* column of the dataset. 

*Example*:

      # Sample DataFrame
      data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
              'value': [0, 0, 1, 0, 0, 1]}
      train_df = pd.DataFrame(data)
  
      lab_df = wrongLabels(train_df, original_df=None, target="value", percentage=0.40, type='binary', extended=False)
      print(lab_df)
  
        category  value
      0        A      1
      1        A      1
      2        B      1
      3        B      0
      4        B      0
      5        C      1

#### Extended Mode:{#ext}

If `extended = True`, the function will introduce errors while considering existing modifications in `train_df`, ensuring that it does not introduce errors to labels that have already been altered.
The function calculates the total number of labels to modify according to the specified percentage. It checks how many labels are already modified in both `original_df` and `train_df`, and subtracts the number of existing modifications to determine how many new labels can be altered. It then applies the errors introduction function accordingly.

- If `type='binary'`, the function modifies labels in the specified *binary target* column of the dataset. 

- If `type='categorical'`, the function modifies labels in the specified *categorical target* column of the dataset. 

*Example*:

      # Sample original DataFrame
      original_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
                       'value': [0, 0, 1, 0, 0, 1]}
      original_df = pd.DataFrame(original_data)
  
      # Sample training DataFrame with existing errors
      train_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
                    'value': [1, 1, 1, 0, 0, 1]}
      train_df = pd.DataFrame(train_data)
  
      lab_df = wrongLabels(train_df, original_df, target="value", percentage=0.60, type='binary', extended=True)
      print(lab_df)
  
        category  value
      0        A      1
      1        A      1
      2        B      0 
      3        B      0
      4        B      0
      5        C      1
      

