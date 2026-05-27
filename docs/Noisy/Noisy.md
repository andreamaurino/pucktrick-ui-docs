---
sidebar_position: 1
---

# Noisy

`noisy.py` adds synthetic noise to datasets. It supports numeric, string, and datetime data and is useful for testing model robustness under data corruption.

## Function Signature

```python
from pucktrick.noisy import noisy

error_code, modified_df = noisy(df, strategy)
# or, for mode="extended" / mode="composed":
error_code, modified_df = noisy(df, strategy, original_df=clean_df)
```

## Strategy Parameters

Configure noise behaviour inside `perturbate_data`:

| Parameter | Values | Description |
|---|---|---|
| `distribution` | `"random"` | Applies uniform random noise within the column's original range. |
| `distribution` | `"shift"` | Applies a systematic directional shift. Requires a `param` dictionary. |

### Shift Parameters (`"distribution": "shift"`)

When using systematic shifting, provide a `param` dictionary inside `perturbate_data`:

```json
"perturbate_data": {
  "distribution": "shift",
  "param": {
    "shift_value": 10,
    "shift_unit": "absolute",
    "shift_sign": "positive"
  }
}
```

| Parameter | Values | Description |
|---|---|---|
| `shift_value` | numeric | Value to add (or days for datetime columns). |
| `shift_unit` | `"absolute"`, `"std"` | Whether `shift_value` is an absolute amount or a number of standard deviations. |
| `shift_sign` | `"positive"`, `"negative"`, `"random"` | Direction of the shift. |

## Example — Random Noise

```python
from pucktrick.noisy import noisy

strategy = {
    "affected_features": ["age", "salary"],
    "selection_criteria": "all",
    "percentage": 0.20,
    "mode": "new",
    "perturbate_data": {
        "distribution": "random",
        "sampling": "random"
    }
}

err, df_corrupted = noisy(df, strategy)
```

## Example — Systematic Shift

```python
strategy = {
    "affected_features": ["sensor_reading"],
    "selection_criteria": "all",
    "percentage": 0.30,
    "mode": "new",
    "perturbate_data": {
        "distribution": "shift",
        "sampling": "random",
        "param": {
            "shift_value": 2.0,
            "shift_unit": "std",
            "shift_sign": "positive"
        }
    }
}

err, df_shifted = noisy(df, strategy)
```

## Supported Column Types

| Column type | Noise behaviour |
|---|---|
| Continuous numeric | Random values within column range, or directional shift |
| Discrete numeric | Random integers within column range, or directional shift |
| Binary (0/1) | Bit flips |
| Categorical string | Replaced with other existing values or random fake strings |
| Categorical integer | Replaced with other existing values |
| Datetime | Date shifted by `shift_value` days |

## Modes

| Mode | Behaviour |
|---|---|
| `new` | Injects noise into a clean column up to the specified `percentage`. |
| `extended` | Adds noise to a partially noisy column to reach the cumulative target. Requires `original_df`. |
| `composed` | Applies noise only to rows already modified by a previous operator. Requires `original_df`. |
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

