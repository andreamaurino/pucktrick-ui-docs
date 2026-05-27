---
sidebar_position: 1
---

# Drift Simulation Overview

Pucktrick supports simulation of three structurally distinct forms of dataset drift, modelled as temporal corruption policies applied to dataset segments. Drift is useful for evaluating machine learning models under non-stationary data conditions.

## `run_drift_pipeline`

All drift modules expose a `run_drift_pipeline` function with the same interface:

```python
from pucktrick.<drift_module> import run_drift_pipeline

drift_df, change_points, ranked_features = run_drift_pipeline(
    df=df,
    target_col="target",
    strategy=strategy,
    n_chunks=4,
    random_state=42
)
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `df` | `pd.DataFrame` | The input dataset to corrupt. |
| `target_col` | `str` | Name of the target column. |
| `strategy` | `dict` | Strategy dictionary defining drift configuration per chunk. |
| `n_chunks` | `int` | Number of temporal segments to split the dataset into. |
| `random_state` | `int` | Random seed for reproducibility. |

### Returns

| Value | Description |
|---|---|
| `drift_df` | The corrupted DataFrame with drift applied across segments. |
| `change_points` | List of row indices where drift transitions occur. |
| `ranked_features` | Features ranked by drift magnitude. |

## Strategy Format

The drift strategy wraps a `"strategy"` key that maps chunk indices to drift configurations. Chunks set to `None` are baseline segments with no drift applied:

```python
strategy = {
    "strategy": {
        "percentage": 0.35,
        "chunks": {
            "0": None,        # baseline segment, no drift
            "1": None,
            "2": { ... },     # drift configuration for segment 2
            "3": { ... },
        }
    }
}
```

## Drift Types Summary

| Drift type | Distribution affected | Module | `drift_type` value |
|---|---|---|---|
| Data drift (covariate noise) | $P(X)$ changes | `covariate_noise_drift` | `"covariate_noise"` |
| Data drift (offset) | $P(X)$ changes | `covariate_offset_drift` | `"covariate_offset"` |
| Concept drift (target offset) | $P(Y\|X)$ changes | `offset_drift` | `"concept"` |
| Concept drift (feature rotation) | $P(Y\|X)$ changes | `concept_drift` | `"concept_rotation"` |
| Label drift (prior shift) | $P(Y)$ changes | `prior_multinomial_drift` | `"prior_multinomial"` |
| Target scaling | $P(Y)$ changes | `target_scaling_drift` | `"target_scaling"` |
| Generic (all types) | configurable | `drift_generic` | any |

All modules also accept a `strategy_path` (path to a JSON file) instead of a `strategy` dict.
