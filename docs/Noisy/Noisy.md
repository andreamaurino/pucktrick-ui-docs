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
