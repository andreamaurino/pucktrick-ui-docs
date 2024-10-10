---
sidebar_position: 1
---

#  Duplicated Injection 

The **duplicateData** function introduces duplicates into a dataset. It can duplicate all rows or only the rows of a specific class.

`duplicateData(train_df, original_df=None, target=None, value=None, percentage=0, mode = "all", extended=False)`

The function can operate in two modes:

1. [Default](#def) : Applies duplicates directly to the dataset. 
2. [Extended](#ext) : Introduces duplicates by comparing  the original dataset with a modified version of it, ensuring no overlapping duplicates are applied if `extended = True`.

### Parameters:

- ***train_df*** (DataFrame): The dataset on which duplicates will be applied.
- ***original_df*** (DataFrame, default=None) : The original dataset, used only when extended mode is active. If `extended=False`, this parameter is ignored.
- ***target*** (str, default=None): The name of the *target* column for which you want to apply duplication. This parameter is required only if `mode='class'` is selected; otherwise, it can be ignored.
- ***value*** (str, default=None): The specific value in the *target* column for which you want to duplicate rows. This parameter is necessary only if `mode='class'` is selected.
- ***percentage*** (float, default=0): The percentage of rows to duplicate relative to the total length of the dataset or the *target* class. The value must be between 0 and 1.
- ***mode*** (str, default='all'): Specifies whether to duplicate all rows (`mode = all`) or only a specific class (`mode = class`).
- ***extended*** (bool, default=False): Indicates whether to use *extended* mode. If `extended = True`, the function will consider existing duplicates in the training dataset to avoid duplicating rows that have already been duplicated in previous operations.

### Functionality:

#### Default Mode: {#def}

- If `mode='all'`, the function will duplicate a percentage of rows across the entire dataset without considering the original dataset.\
The function directly calculates the number of rows to duplicate based on the specified percentage of `train_df`. It assesses the existing duplicates and determines how many new rows can be added. If there are no rows to duplicate, the function returns the original `train_df`. Otherwise, it randomly selects rows from `train_df` and adds them to itself.
  
  *Example*:
  
      # Sample DataFrame
      data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
              'value': [10, 12, 13, 14, 15, 16]}
      train_df = pd.DataFrame(data)
      
      dupl_df = duplicateData(train_df, original_df=None, target=None, value=None, percentage=0.40, mode = "all", extended=False)
      print(dupl_df)
  
        category  value
      0        A     10
      1        A     12
      2        B     13
      3        B     14
      4        B     15
      5        C     16
      6        A     10
      7        A     10

- If `mode='class'`, the function will duplicate a percentage of rows corresponding to a specific value in the *target* column. The function extracts rows from `train_df` that correspond to the specified value in target. It calculates how many rows can be duplicated and checks for existing duplicates. If there are no rows to duplicate, it returns `train_df`. If rows are available for duplication, it randomly selects rows from the specified class in `train_df` and adds them to itself.

  *Example*:
  
        # Sample DataFrame
        data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
                'value': [10, 12, 13, 14, 15, 16]}
        train_df = pd.DataFrame(data)
        
        dupl_df = duplicateData(train_df, original_df=None, target="category", value= "B", percentage=0.40, mode = "class", extended=False)
        print(dupl_df)
    
          category  value
        0        A     10
        1        A     12
        2        B     13
        3        B     14
        4        B     15
        5        C     16
        6        B     13
        
#### Extended Mode: {#ext}

- If `mode='all'`, the function calculates the total number of rows to duplicate according to the specified percentage. It then checks how many rows are already duplicated in both `original_df` and `train_df`. By subtracting the number of existing duplicates from the total rows to be duplicated, it determines how many new rows can be added. If there are no rows to duplicate, the function simply returns the original `train_df`. If there are rows to duplicate, it randomly selects a certain number of rows from `original_df` and appends them to `train_df`.

  *Example*:
    
      # Sample original DataFrame
      original_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
                       'value': [10, 12, 13, 14, 15, 16]}
      original_df = pd.DataFrame(original_data)
      
      # Sample training DataFrame with existing duplicates
      train_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C', 'A', 'A'],
                    'value': [10, 12, 13, 14, 15, 16, 10, 10]}
      train_df = pd.DataFrame(train_data)
      
      dupl_df = duplicateData(train_df, original_df, target=None, value=None, percentage=0.60, mode = "all", extended=True)
      print(dupl_df)
      
        category  value
      0        A     10
      1        A     12
      2        B     13
      3        B     14
      4        B     15
      5        C     16
      6        A     10
      7        A     10
      8        A     10
    

- If `mode='class'`, the function will duplicate a percentage of rows corresponding to a specific value in the *target* column. The function extracts the rows from `original_df` that match the specified value in *target*, and does the same for `train_df`. It calculates the number of rows to duplicate and those already duplicated. If no rows are available for duplication, it returns `train_df`. If there are rows to duplicate, it randomly selects them from the specified class in `original_df` and appends them to `train_df`.
  
  *Example*:
    
      # Sample original DataFrame
      original_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C'],
                       'value': [10, 12, 13, 14, 15, 16]}
      original_df = pd.DataFrame(original_data)
      
      # Sample training DataFrame with existing duplicates
      train_data = {'category': ['A', 'A', 'B', 'B', 'B', 'C', 'B]                 
                    'value': [10, 12, 13, 14, 15, 16, 13]}
      train_df = pd.DataFrame(train_data)
      
      dupl_df = duplicateData(train_df, original_df, target = "category", value = "B", percentage = 0.70 , mode = "class", extended=True)
      print(dupl_df)
      
        category  value
      0        A     10
      1        A     12
      2        B     13
      3        B     14
      4        B     15
      5        C     16
      6        B     13
      7        B     13
      
