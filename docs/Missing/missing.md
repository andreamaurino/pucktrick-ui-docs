---
sidebar_position: 1
---

# Missing

`missing.py` replaces values in specified columns with `NaN`. It is designed to support controlled experimentation with missing data in machine learning workflows.

## Function Signature

```python
from pucktrick.missing import missing

error_code, modified_df = missing(df, strategy)
# or, for mode="extended" / mode="composed":
error_code, modified_df = missing(df, strategy, original_df=clean_df)
```

## Strategy Parameters

No module-specific parameters are required inside `perturbate_data`. Use the [base strategy parameters](../getting-started/Error.md) to configure which rows and columns to corrupt.

## Example

```python
from pucktrick.missing import missing

strategy = {
    "affected_features": ["age", "income"],
    "selection_criteria": "all",
    "percentage": 0.15,
    "mode": "new",
    "perturbate_data": {"sampling": "random"}
}

err, df_corrupted = missing(df, strategy)
```

## Modes

| Mode | Behaviour |
|---|---|
| `new` | Introduces `NaN` into clean columns up to the specified `percentage`. |
| `extended` | Incrementally adds `NaN` values to columns that may already contain missing data, reaching the cumulative `percentage` target. Requires `original_df`. |
| `composed` | Introduces `NaN` only into rows already modified by a previous operator. Requires `original_df`. |
