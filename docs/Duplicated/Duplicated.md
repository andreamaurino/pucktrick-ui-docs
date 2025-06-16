---
sidebar_position: 1
---

# Data Duplication Utilities

This module provides functions to inject **duplicated records** into a dataset. These utilities are useful to simulate real-world issues such as:

- **Data imbalance**
- **Bias due to oversampling**
- **Noise introduced by repeated observations**

There are two main strategies:
- **Global duplication**: Randomly duplicates rows from the whole dataset.
- **Class-based duplication**: Duplicates rows from a specific class in the target variable.

Each duplication method is available in two forms:
- **`New` methods**: Inject new duplicates starting from a clean dataset.
- **`Extended` methods**: Add additional duplicates to a dataset that may already contain repeated rows, based on a clean reference.

---

### `duplicateAllNew(train_df, percentage)`

Randomly duplicates a percentage of rows from the entire dataset, excluding already existing duplicates.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The input dataset.

- `percentage` (`float`):  
  Target percentage (0–1) of duplicated rows relative to the original dataset.

---

### `duplicateAllExtended(original_df, train_df, percentage)`

Extends the number of duplicated rows in the dataset to reach a specified percentage, using a clean reference dataset to calculate the delta.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original dataset without duplicates.

- `train_df` (`pd.DataFrame`):  
  Dataset that may already contain some duplicated rows.

- `percentage` (`float`):  
  Desired final duplication rate (0–1) based on the original dataset.

---

### `duplicateClassNew(train_df, target, value, percentage)`

Duplicates a percentage of rows belonging to a specific class in the dataset.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The input dataset.

- `target` (`str`):  
  Name of the column representing the class/label.

- `value` (`any`):  
  The specific class value to duplicate.

- `percentage` (`float`):  
  The proportion of that class’s rows to duplicate (0–1).

---

### `duplicateClassExtended(original_df, train_df, target, value, percentage)`

Extends the number of duplicated rows for a specific class until the desired percentage is reached, using the original dataset as a reference.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original clean dataset.

- `train_df` (`pd.DataFrame`):  
  Dataset that may already contain duplicated rows.

- `target` (`str`):  
  Name of the column representing the class/label.

- `value` (`any`):  
  The class value to duplicate.

- `percentage` (`float`):  
  Desired final duplication rate (0–1) for that class, relative to the clean dataset.
