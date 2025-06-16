---
sidebar_position: 1
---

# Outlier Injection Utilities

This module provides a set of functions to inject artificial outliers into datasets.  
These utilities are designed for testing the resilience of machine learning models against extreme values and abnormal input data.

Each outlier injection method is based on predefined statistical logic, typically using a **3-sigma rule** or **value replacement**, and supports different data types:

- **Continuous numerical features** using Gaussian-based boundaries
- **Discrete numerical features** based on integer ranges
- **Categorical features** (both integers and strings) using improbable or fabricated values

Just like the noise module, each outlier function comes in two variants:

- **`New` methods**: Insert outliers in a clean dataset, affecting a specified percentage of rows.
- **`Extended` methods**: Add additional outliers to a column that may already contain some, based on a reference clean dataset.

These tools are useful in benchmarking imputation algorithms, anomaly detection systems, and robustness-aware models.

### `outlierContinuosNew3Sigma(train_df, column, percentage)`

Injects outliers into a continuous column by replacing values with randomly generated numbers outside the 3-sigma range (i.e., above μ+3σ or below μ−3σ).

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The original DataFrame to modify.

- `column` (`str`):  
  Name of the continuous feature column to inject outliers into.

- `percentage` (`float`):  
  The fraction (0–1) of rows to replace with outliers.

---

### `outlierContinuosExtended3Sigma(original_df, train_df, column, percentage)`

Adds additional outliers to a continuous column, using 3-sigma logic, until the total outlier percentage reaches the desired threshold.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The clean version of the DataFrame (used as reference).

- `train_df` (`pd.DataFrame`):  
  The DataFrame that already contains partial outliers.

- `column` (`str`):  
  Name of the continuous feature column to extend with outliers.

- `percentage` (`float`):  
  Desired total proportion of outliers (0–1).

---

### `outlierDiscreteNew3Sigma(train_df, column, percentage)`

Replaces values in a discrete numerical column with outliers generated outside the 3-sigma integer range.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The dataset to modify.

- `column` (`str`):  
  The name of the discrete integer column.

- `percentage` (`float`):  
  The proportion of rows to be replaced with discrete outliers (0–1).

---

### `outlierDiscreteExtended3Sigma(original_df, train_df, column, percentage)`

Extends the proportion of outliers in a discrete column, based on the 3-sigma rule, until the desired noise level is reached.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  Clean version of the dataset.

- `train_df` (`pd.DataFrame`):  
  Dataset already containing partial outliers.

- `column` (`str`):  
  Name of the discrete feature to modify.

- `percentage` (`float`):  
  Final target percentage of outliers (0–1).

---

### `outlierCategoricalIntegerNew(train_df, column, percentage)`

Injects outliers into a categorical integer column by replacing values with randomly generated numbers outside the existing min/max range.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The input DataFrame to modify.

- `column` (`str`):  
  The categorical integer column to corrupt.

- `percentage` (`float`):  
  Fraction (0–1) of values to replace with out-of-range integers.

---

### `outliercategoricalIntegerExtended(original_df, train_df, column, percentage)`

Extends outliers in a categorical integer column, introducing new values outside the expected range until the specified proportion is reached.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  Clean version of the data for comparison.

- `train_df` (`pd.DataFrame`):  
  Data with potential existing outliers.

- `column` (`str`):  
  Name of the integer categorical column to inject outliers into.

- `percentage` (`float`):  
  Target outlier proportion (0–1).

---

### `outlierCategoricalStringNew(train_df, column, percentage)`

Replaces a percentage of string values in the specified column with a fixed marker string (`"puck was here"`) to simulate outliers.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Dataset containing the categorical string feature.

- `column` (`str`):  
  Column where string outliers will be injected.

- `percentage` (`float`):  
  Fraction (0–1) of entries to replace with a fake value.

---

### `outliercategoricalStringExtended(original_df, train_df, column, percentage)`

Adds more string outliers to a column by inserting fixed marker values (`"puck was here"`), reaching the desired noise threshold.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  Clean reference dataset.

- `train_df` (`pd.DataFrame`):  
  Dataset that may already include string outliers.

- `column` (`str`):  
  The categorical string column to modify.

- `percentage` (`float`):  
  Desired total percentage of string outliers (0–1).
