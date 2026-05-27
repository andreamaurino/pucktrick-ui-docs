---
sidebar_position: 1
---

# Outliers

`outliers.py` injects artificial outliers into datasets. It is designed for testing the resilience of machine learning models against extreme values and abnormal input data.

Outlier injection uses a **3-sigma rule** for continuous and discrete numeric data, domain expansion for categorical integers, and a fixed string token (`"puck was here"`) for text columns.

## Function Signature

```python
from pucktrick.outliers import outlier

error_code, modified_df = outlier(df, strategy)
# or, for mode="extended" / mode="composed":
error_code, modified_df = outlier(df, strategy, original_df=clean_df)
```

## Strategy Parameters

No module-specific parameters are required inside `perturbate_data`. The injector automatically detects column type and applies the appropriate outlier logic:

| Column type | Outlier method |
|---|---|
| Continuous numeric | Values outside μ ± 3σ |
| Discrete numeric | Integer values outside the 3-sigma integer range |
| Categorical integer | Integers outside the existing min/max range |
| Categorical string | Replaced with `"puck was here"` |

## Example

```python
from pucktrick.outliers import outlier

strategy = {
    "affected_features": ["temperature", "pressure"],
    "selection_criteria": "all",
    "percentage": 0.10,
    "mode": "new",
    "perturbate_data": {"sampling": "random", "distribution": "random"}
}

err, df_corrupted = outlier(df, strategy)
```

## Modes

| Mode | Behaviour |
|---|---|
| `new` | Injects outliers into a clean dataset up to the specified `percentage`. |
| `extended` | Adds additional outliers to columns that may already contain some, reaching the cumulative `percentage` target. Requires `original_df`. |
| `composed` | Injects outliers only into rows already modified by a previous operator. Requires `original_df`. |
