---
sidebar_position: 1
---

# Label Noise Injection Utilities

This module provides functions to simulate mislabeled data, which is useful for evaluating the robustness of classification algorithms under imperfect labeling conditions.

It focuses on **binary** and **categorical** (integer-based) classification tasks. The noise is introduced by deliberately altering the target column in a controlled manner, either starting from a clean dataset or extending existing noise.

There are two categories of methods:
- **`New` methods**: inject label errors into a clean dataset to reach a given percentage.
- **`Extended` methods**: increase the amount of existing label noise until a target percentage is achieved, using a clean reference version.

These tools help researchers and practitioners simulate real-world conditions, such as annotation errors or adversarial mislabeling.

---

### `wrongLabelsBinaryExtended(original_df, train_df, column, percentage)`

Adds label noise to a binary classification target column, extending any existing noise until the desired error rate is reached.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The clean DataFrame used as ground truth reference.

- `train_df` (`pd.DataFrame`):  
  The dataset that may already contain some label errors.

- `column` (`str`):  
  The name of the binary target column (values should be 0 or 1).

- `percentage` (`float`):  
  Final desired proportion (0–1) of incorrect labels.

---

### `wrongLabelsBinaryNew(train_df, target, percentage)`

Injects new binary label noise into a clean dataset by flipping 0 ↔ 1 in a controlled proportion of rows.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The clean dataset to modify.

- `target` (`str`):  
  The name of the binary target column.

- `percentage` (`float`):  
  The proportion of values to flip (0–1).

---

### `wrongLabelsCategoricalNew(train_df, target, percentage)`

Introduces label noise into a categorical integer target column by replacing a portion of values with other existing category labels.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The clean dataset.

- `target` (`str`):  
  The name of the integer-based target column.

- `percentage` (`float`):  
  Proportion (0–1) of values to replace with incorrect but valid labels.

---

### `wrongLabelsCategoryExtended(train_df, target, percentage)`

Extends existing label noise in a categorical integer target column, replacing additional values with different existing labels until the target error rate is met.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Dataset that may already include some incorrect labels.

- `target` (`str`):  
  The name of the integer-based target column.

- `percentage` (`float`):  
  Desired final proportion (0–1) of misclassified labels.
