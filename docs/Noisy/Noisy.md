---
sidebar_position: 1
---

# Noisy
This module provides a set of utility functions for injecting synthetic noise into a dataset.  
These functions are useful for testing the robustness of machine learning models under various types of data corruption, such as:

- **Categorical perturbations (existing or fake values)**
- **Numerical noise (discrete, continuous, or binary flips)**

Each noise type includes two variants:

- **`New` methods**: Inject noise into a clean column from scratch to reach the specified percentage.
- **`Extended` methods**: Add additional noise to an already partially noisy column, up to the desired percentage.

The module supports:
- **Continuous numerical features** (`noiseContinueNew`, `noiseContinueExtended`)
- **Discrete numerical features** (`noiseDiscreteNew`, `noiseDiscreteExtended`)
- **Binary features** (`noiseBinaryNew`, `noiseBinaryExtended`)
- **Categorical (string and integer) features**, with:
  - Substitution by existing values (`noiseCategoricalStringNewExistingValues`, etc.)
  - Substitution by fake/random values (`noiseCategoricalStringNewFakeValues`, etc.)

These functions assume access to both the clean dataset (`original_df`) and the dataset to be modified (`train_df`) when using `Extended` variants.
### `noiseCategoricalStringNewExistingValues(train_df, column, percentage)`

Replaces a specified percentage of string values in the column with different values randomly selected from the set of existing unique values.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The DataFrame containing the original data.

- `column` (`str`):  
  The name of the string column to introduce noise in.

- `percentage` (`float`):  
  The proportion of entries to modify (range: 0 to 1).


---

### `noiseCategoricalStringExtendedExistingValues(original_df, train_df, column, percentage)`

Adds more noise to a string column already containing noisy data, replacing values with other existing ones until the desired percentage is reached.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original (clean) DataFrame before any noise is added.

- `train_df` (`pd.DataFrame`):  
  The DataFrame that may already include noisy values in the column.

- `column` (`str`):  
  The name of the string column to extend noise in.

- `percentage` (`float`):  
  The final target proportion of noisy entries (0–1).


---

### `noiseCategoricalStringNewFakeValues(train_df, column, percentage)`

Replaces a specified percentage of string values in the column with randomly generated fake strings (e.g., random sequences of letters).

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  The DataFrame containing the original data.

- `column` (`str`):  
  The name of the string column to modify.

- `percentage` (`float`):  
  The fraction of rows to replace with fake values (0–1).


---

### `noiseCategoricalStringExtendedFakeValues(original_df, train_df, column, percentage)`

Extends fake noise in a string column by injecting additional randomly generated values to reach the target noise percentage.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The clean baseline DataFrame.

- `train_df` (`pd.DataFrame`):  
  The DataFrame with possible existing fake values.

- `column` (`str`):  
  The string column to extend with fake noise.

- `percentage` (`float`):  
  The final noise target percentage (0–1).


---

### `noiseCategoricalIntNewExistingValues(train_df, column, percentage)`

Replaces a percentage of integer categorical values in the column with other existing values from the same column.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Input DataFrame.

- `column` (`str`):  
  The integer categorical column to inject noise into.

- `percentage` (`float`):  
  Proportion of rows to modify (0–1).


---

### `noiseCategoricalIntExtendedExistingValues(original_df, train_df, column, percentage)`

Extends the proportion of noise in an integer categorical column by replacing additional values with other existing ones from the original distribution.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The clean original DataFrame.

- `train_df` (`pd.DataFrame`):  
  The DataFrame to be extended with noise.

- `column` (`str`):  
  The integer categorical column to target.

- `percentage` (`float`):  
  Final target proportion of noisy entries (0–1).


---

### `noiseDiscreteNew(train_df, column, percentage)`

Replaces a percentage of values in a discrete numerical column with new randomly generated integer values within the column’s original range.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Input DataFrame.

- `column` (`str`):  
  The discrete integer column to modify.

- `percentage` (`float`):  
  Fraction of rows to be replaced (0–1).


---

### `noiseDiscreteExtended(original_df, train_df, column, percentage)`

Extends noise in a discrete numerical column by adding new randomly generated integer values to reach the desired level of distortion.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original clean dataset.

- `train_df` (`pd.DataFrame`):  
  Dataset which may already include noisy entries.

- `column` (`str`):  
  Name of the integer/discrete column to target.

- `percentage` (`float`):  
  Desired final noise percentage (0–1).


---

### `noiseBinaryNew(train_df, column, percentage)`

Flips the value (0 ↔ 1) of a specified percentage of entries in a binary column.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Input DataFrame.

- `column` (`str`):  
  The name of the binary (0/1) column to apply flips.

- `percentage` (`float`):  
  Proportion of rows to flip (0–1).


---

### `noiseBinaryExtended(original_df, train_df, column, percentage)`

Adds additional binary noise (0 ↔ 1 flips) to an already partially noisy binary column to meet a specified overall noise level.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  Clean baseline DataFrame.

- `train_df` (`pd.DataFrame`):  
  Dataset with possible pre-existing flips.

- `column` (`str`):  
  Name of the binary column to modify.

- `percentage` (`float`):  
  Target noise proportion (0–1).


---

### `noiseContinueNew(train_df, column, percentage)`

Injects continuous noise by replacing a percentage of numeric values with new random values uniformly sampled from the column’s original range.

#### **Parameters**
- `train_df` (`pd.DataFrame`):  
  Input DataFrame.

- `column` (`str`):  
  The numeric (continuous) column to alter.

- `percentage` (`float`):  
  Fraction of values to replace with noise (0–1).


---

### `noiseContinueExtended(original_df, train_df, column, percentage)`

Extends continuous noise in a numeric column by injecting additional values until the target noise percentage is reached.

#### **Parameters**
- `original_df` (`pd.DataFrame`):  
  The original clean dataset.

- `train_df` (`pd.DataFrame`):  
  Dataset possibly containing some noise already.

- `column` (`str`):  
  The numeric column to apply noise to.

- `percentage` (`float`):  
  Final desired noise proportion (0–1).

