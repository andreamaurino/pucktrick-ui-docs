---
sidebar_position: 1
---

# Labels

`labels.py` flips classification labels to simulate mislabeled data. It supports binary and multi-class classification tasks and is useful for evaluating robustness under annotation errors or adversarial mislabeling.

## Function Signature

```python
from pucktrick.labels import labels

error_code, modified_df = labels(df, strategy)
# or, for mode="extended" / mode="composed":
error_code, modified_df = labels(df, strategy, original_df=clean_df)
```

## Strategy Parameters

For multi-class label noise, configure `perturbate_data` with a `noise_model` key:

| `noise_model` | Description |
|---|---|
| `"NCAR"` (Noise Completely At Random) | Uniform random label flip, independent of class or features. |
| `"NAR"` (Noise At Random) | Class-dependent flip. Provide a `flip_distribution` in `param`. |
| `"NNAR"` (Nearest Neighbor At Random) | Flips labels of instances close to decision boundaries. Provide `features_for_similarity` in `param`. |

For binary targets no `noise_model` is needed — labels are flipped 0 ↔ 1.

### NCAR Example

```python
strategy = {
    "affected_features": ["label"],
    "selection_criteria": "all",
    "percentage": 0.15,
    "mode": "new",
    "perturbate_data": {
        "sampling": "random",
        "noise_model": "NCAR"
    }
}
```

### NAR Example

```python
strategy = {
    "affected_features": ["label"],
    "selection_criteria": "all",
    "percentage": 0.15,
    "mode": "new",
    "perturbate_data": {
        "sampling": "random",
        "noise_model": "NAR",
        "param": {
            "flip_distribution": {"0": [0.1, 0.9], "1": [0.8, 0.2], "2": [0.5, 0.3, 0.2]}
        }
    }
}
```

### NNAR Example

```python
strategy = {
    "affected_features": ["label"],
    "selection_criteria": "all",
    "percentage": 0.15,
    "mode": "new",
    "perturbate_data": {
        "sampling": "random",
        "noise_model": "NNAR",
        "param": {
            "features_for_similarity": ["feature1", "feature2", "feature3"]
        }
    }
}
```

## Modes

| Mode | Behaviour |
|---|---|
| `new` | Injects label noise into a clean dataset up to the specified `percentage`. |
| `extended` | Adds more label flips to a dataset that may already contain mislabeled rows, reaching the cumulative target. Requires `original_df`. |
| `composed` | Flips labels only in rows already modified by a previous operator. Requires `original_df`. |
