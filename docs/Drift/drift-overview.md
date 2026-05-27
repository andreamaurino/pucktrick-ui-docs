---
sidebar_position: 1
---

# Drift Simulation Overview

Pucktrick supports simulation of three structurally distinct forms of dataset drift, modelled as temporal corruption policies applied to dataset segments. Drift is useful for evaluating machine learning models under non-stationary data conditions.

## Function Signature

```python
from pucktrick.drift import drift

error, df_modified = drift(df, strategy)
```

Unlike other modules, the `error` return value is a **dictionary**:

```python
{
    "errore": "yes",                     # "yes" if any modification occurred, "no" otherwise
    "change_points": [100, 200, 300],    # row indices delimiting chunk boundaries
    "chunks": {
        "0": {"start": 0,   "end": 100, "drift_applied": False},
        "1": {"start": 100, "end": 200, "drift_applied": False},
        "2": {"start": 200, "end": 300, "drift_applied": True},
        "3": {"start": 300, "end": 400, "drift_applied": True},
    }
}
```

## Strategy Format

The drift strategy follows the same structure as all other Pucktrick modules. Chunk configurations are placed inside `perturbate_data`:

```python
strategy = {
    "affected_features": ["f1", "f2"],
    "selection_criteria": "all",
    "percentage": 0.35,          # fraction of rows affected per chunk
    "mode": "new",
    "perturbate_data": {
        "sampling": "random",
        "target_col": "target",  # omit for auto-detection
        "chunks": {
            "0": None,           # baseline segment, no drift
            "1": None,
            "2": { ... },        # drift configuration for segment 2
            "3": { ... },
        }
    }
}
```

> **Note:** `sampling` and `distribution` parameters inside `perturbate_data` are not used by the drift module — row selection within each chunk is always random and controlled exclusively by `percentage`.

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
