---
sidebar_position: 1
---

# Missing Continous

This module provides utilities to inject missing values into a dataset for a specified continuous feature. It is designed to support controlled experimentation with missing data in machine learning workflows

## method missingNew(train_df,column,percentage):

Introduces missing values into a specified column of the dataset, starting from a column with no missing values.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The input DataFrame containing the data.

- `column` (`str`):  
  The name of the column in which to insert missing values.

- `percentage` (`float`):  
  The desired percentage of missing values to introduce (between 0 and 1).

#### **Returns**
- `pd.DataFrame`:  
  A copy of the original DataFrame with exactly the specified percentage of `NaN` values inserted into the selected column.

#### **Notes**
- This function assumes that the selected column does **not** contain missing values initially.  
- If missing values are already present in the column, use `missingExtended'

## `missingExtended(original_df, train_df, column, percentage)`

Extends the proportion of missing values in a specified column of the dataset to reach a given percentage, starting from a DataFrame that may already contain missing values.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original, complete DataFrame without missing values (used to identify all valid data points).

- `train_df` (`pd.DataFrame`):  
  The current version of the dataset, which may already include missing values in the specified column.

- `column` (`str`):  
  The name of the column in which to increase the number of missing values.

- `percentage` (`float`):  
  The target percentage of missing values (between 0 and 1) to be reached in the column.

#### **Returns**
- `pd.DataFrame`:  
  A copy of `train_df` with additional `NaN` values added to the specified column so that the total proportion of missing values equals the requested percentage.

#### **Notes**
- This function is useful when you want to **incrementally introduce missing data** in a column that is already partially missing.
- The function ensures that the final percentage of missing values is **exactly** as specified, based on the total number of rows in `original_df`.
