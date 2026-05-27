---
sidebar_position: 1
---

# Duplicated

`duplicated.py` injects duplicated records into a dataset. These utilities simulate real-world issues such as data imbalance, bias from oversampling, and noise from repeated observations.

## Function Signature

```python
from pucktrick.duplicated import duplicated

error_code, modified_df = duplicated(df, strategy)
# or, for mode="extended" / mode="composed":
error_code, modified_df = duplicated(df, strategy, original_df=clean_df)
```

## Strategy Parameters

Set `"function"` at the top level of the strategy to apply a text transformation to the duplicated rows:

| Value | Description |
|---|---|
| `"shuffle_words"` | Shuffles the words in string fields |
| `"abbreviate_text"` | Abbreviates text values |
| `"replace_punctuation"` | Replaces punctuation characters |
| `"remove_replace"` | Removes or replaces characters |
| `"upper_lower"` | Randomly changes case |

If `"function"` is omitted, rows are duplicated without modification.

## Example

```python
from pucktrick.duplicated import duplicated

strategy = {
    "affected_features": ["name", "description"],
    "selection_criteria": "all",
    "percentage": 0.10,
    "mode": "new",
    "function": "shuffle_words",
    "perturbate_data": {"sampling": "random"}
}

err, df_corrupted = duplicated(df, strategy)
```

## Modes

| Mode | Behaviour |
|---|---|
| `new` | Duplicates rows from the clean dataset up to the specified `percentage`. |
| `extended` | Adds more duplicated rows to a dataset that may already contain repeats, reaching the cumulative target. Requires `original_df`. |
| `composed` | Duplicates only rows already modified by a previous operator. Requires `original_df`. |
