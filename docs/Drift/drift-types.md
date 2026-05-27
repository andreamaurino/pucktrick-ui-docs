---
sidebar_position: 2
---

# Drift Types

## Covariate Noise Drift

**Module**: `covariate_noise_drift.py` — `drift_type: "covariate_noise"`

Adds progressive Gaussian noise to selected features, simulating data drift where $P(X)$ shifts over time.

```python
"2": {
    "drift_type": "covariate_noise",
    "features": ["temp", "humidity"],
    "noise_mode": "relative",
    "noise_std": 0.08,
    "shape": "segment"
}
```

| Parameter | Values | Description |
|---|---|---|
| `features` | list of strings | Features to apply noise to. |
| `noise_mode` | `"relative"`, `"absolute"` | Whether noise is proportional to feature std or an absolute magnitude. |
| `noise_std` | float | Magnitude of Gaussian noise. |
| `shape` | `"segment"`, `"step"` | `"segment"`: noise applies to this chunk only. `"step"`: noise persists in subsequent chunks. |

---

## Covariate Offset Drift

**Module**: `covariate_offset_drift.py` — `drift_type: "covariate_offset"`

Applies a systematic directional offset to selected features, simulating sensor calibration drift.

```python
"2": {
    "drift_type": "covariate_offset",
    "features": ["temp", "humidity"],
    "offset_mode": "relative",
    "offset_scale": 0.20,
    "direction": "up",
    "shape": "step"
}
```

| Parameter | Values | Description |
|---|---|---|
| `features` | list of strings | Features to offset. |
| `offset_mode` | `"relative"`, `"absolute"` | Whether the offset is proportional to feature values or absolute. |
| `offset_scale` | float | Magnitude of the offset. |
| `direction` | `"up"`, `"down"`, `"random"` | Direction of the offset. |
| `shape` | `"segment"`, `"step"` | Persistence of the drift across chunks. |

---

## Concept Drift — Target Offset

**Module**: `offset_drift.py` — `drift_type: "concept"`

Shifts the target variable using a percentage offset, simulating concept drift where $P(Y \mid X)$ changes.

```python
"2": {
    "drift_type": "concept",
    "features": ["<TARGET>"],
    "offset_perc": 0.50,
    "offset_mode": "add",
    "base": "mean",
    "shape": "step",
    "direction": "up"
}
```

| Parameter | Values | Description |
|---|---|---|
| `offset_perc` | float | Fractional offset applied to the base value. |
| `offset_mode` | `"add"`, `"mul"` | Additive or multiplicative offset. |
| `base` | `"mean"`, `"median"`, `"std"`, `"quantile"` | Reference statistic for the offset. |
| `shape` | `"step"`, `"ramp"`, `"spike"`, `"sin"` | Temporal pattern of the drift. |
| `direction` | `"up"`, `"down"` | Direction of the target shift. |

---

## Concept Drift — Feature Rotation

**Module**: `concept_drift.py` — `drift_type: "concept_rotation"`

Permutes or cycles feature values across instances, breaking the feature-label relationship without altering marginal distributions.

```python
"2": {
    "drift_type": "concept_rotation",
    "severity": 0.65,
    "rotation_mode": "cycle",
    "shape": "step"
}
```

| Parameter | Values | Description |
|---|---|---|
| `severity` | float (0.0–1.0) | Fraction of features involved in the rotation. |
| `rotation_mode` | `"cycle"`, `"permute"` | How feature values are rearranged. |
| `shape` | `"segment"`, `"step"` | Persistence of the drift. |

---

## Label Drift — Prior Multinomial

**Module**: `prior_multinomial_drift.py` — `drift_type: "prior_multinomial"`

Resamples the class distribution according to a user-specified probability vector, simulating prior probability shift $P(Y)$.

```python
"2": {
    "drift_type": "prior_multinomial",
    "features": ["<TARGET>"],
    "bins": 3,
    "class_probs_list": [0.05, 0.15, 0.80],
    "temperature": 0.6
}
```

| Parameter | Values | Description |
|---|---|---|
| `bins` | int | Number of bins for numeric columns. |
| `class_probs_list` | list of floats | Probability vector for each bin/class. Must sum to 1. |
| `temperature` | float | Values `< 1.0` sharpen the distribution; values `> 1.0` flatten it. |

---

## Target Scaling

**Module**: `target_scaling_drift.py` — `drift_type: "target_scaling"`

Applies a multiplicative scaling factor to the numeric target variable.

```python
"2": {
    "drift_type": "target_scaling",
    "scale_perc": 0.10,
    "shape": "segment"
}
```

| Parameter | Values | Description |
|---|---|---|
| `scale_perc` | float | Fractional increase (e.g., `0.10` multiplies target by 1.10). |
| `scale_factor` | float | Direct multiplicative factor (alternative to `scale_perc`). |
| `shape` | `"segment"`, `"step"` | Persistence of the drift. |

---

## Generic Drift

**Module**: `drift_generic.py`

A unified module supporting all drift types listed above, plus additional specialized types: `conditional`, `offset_time`, `seasonal_shift`, `prior_bool`, `concept_ord_shift`, and others. Use this module when you need to mix multiple drift types in a single pipeline or access drift types not available in the dedicated modules.

```python
from pucktrick.drift_generic import run_drift_pipeline

drift_df, change_points, ranked_features = run_drift_pipeline(
    df=df,
    target_col="target",
    strategy=strategy,
    n_chunks=4
)
```

## Full Pipeline Example

```python
from pucktrick.covariate_noise_drift import run_drift_pipeline

strategy = {
    "strategy": {
        "percentage": 0.35,
        "chunks": {
            "0": None,
            "1": None,
            "2": {
                "drift_type": "covariate_noise",
                "features": ["temp", "humidity"],
                "noise_mode": "relative",
                "noise_std": 0.08,
                "shape": "step"
            },
            "3": {
                "drift_type": "covariate_noise",
                "features": ["temp", "humidity"],
                "noise_mode": "relative",
                "noise_std": 0.15,
                "shape": "step"
            }
        }
    }
}

drift_df, change_points, ranked_features = run_drift_pipeline(
    df=df,
    target_col="label",
    strategy=strategy,
    n_chunks=4,
    random_state=42
)
```
