---
sidebar_position: 2
---

# Strategy Configuration

The core of Pucktrick is the `strategy` configuration, passed as a JSON object or a Python dictionary. It defines the error model precisely and is shared across all modules.

## Base Parameters

```json
{
  "affected_features": ["column1", "column2"],
  "selection_criteria": "all",
  "percentage": 0.2,
  "mode": "new",
  "perturbate_data": {
    "sampling": "random",
    "distribution":"random"
  }
}
```

| Parameter | Type | Description |
|---|---|---|
| `affected_features` | list of strings | Columns to corrupt. |
| `selection_criteria` | string | A predicate (e.g., `"age > 30"`) to target specific rows, or `"all"` for the entire dataset. |
| `percentage` | float (0.0–1.0) | Proportion of targeted rows to corrupt. |
| `mode` | string | Accumulation mode: `"new"`, `"extended"`, or `"composed"`. See below. |
| `perturbate_data` | dict | Noise injection configuration. `sampling` controls row selection: `"random"`, `"uniform"`, `"normal"`, or `"exponential"`.  `distribution` define how select rows to contaminate| 

## Accumulation Modes

### `"new"`
Applies errors independently to the clean baseline dataset. Each call is stateless, the original dataset is not required.

### `"extended"`
Incrementally adds errors to a previously corrupted dataset. Uses `original_df` (the clean baseline) to identify already-modified rows and adds corruption only to unmodified rows, up to the cumulative `percentage` target. No row is corrupted twice.

### `"composed"`
Applies errors **exclusively** to rows that have already been modified by a previous operator. Uses `original_df` to identify modified rows via a row-level, NaN-aware comparison across all columns. The `percentage` parameter controls what fraction of the already-modified set to corrupt. This enables cross-type corruption pipelines where heterogeneous errors are layered on the same row subset.

### Accumulation Modes Summary

| Mode | Eligible rows | `percentage` applies to | Requires `original_df` |
|---|---|---|---|
| `new` | All rows | Full eligible set | No |
| `extended` | Rows not yet modified | Full eligible set (cumulative) | Yes |
| `composed` | Rows already modified in any column | Already-modified set | Yes |

## Return Values

All Pucktrick module functions return a tuple:

```python
error_code, modified_df = missing(df, strategy)
```

- `error_code`: `0` for success, `1` for failure or no modifications.
- `modified_df`: the resulting `pd.DataFrame`.

Pass `original_df` as the third argument when using `mode="extended"` or `mode="composed"`:

```python
error_code, modified_df = missing(df, strategy, original_df=clean_df)
```

## Example: Composed Pipeline

This example shows how to chain two operators — missing values followed by outliers — targeting the same row subset.

```python
from pucktrick.missing import missing
from pucktrick.outliers import outlier

# Step 1 — inject missing values on c1 (20% of rows), mode="new"
strategy_s1 = {
    "affected_features": ["c1"],
    "selection_criteria": "all",
    "percentage": 0.20,
    "mode": "new",
    "perturbate_data": {
      "sampling": "random",
      "distribution":"random"}
}
err1, D1 = missing(df, strategy_s1)

# Step 2 — inject outliers on c2, mode="composed"
# Acts exclusively on the rows already modified by Step 1
strategy_s2 = {
    "affected_features": ["c2"],
    "selection_criteria": "all",
    "percentage": 1.0,
    "mode": "composed",
    "perturbate_data": {
      "sampling": "random",
      "distribution":"random"}
}
err2, D2 = outlier(D1, strategy_s2, original_df=df)
# D2: rows with NaN in c1 coincide exactly with rows with outliers in c2
```

