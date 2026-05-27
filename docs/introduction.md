---
sidebar_position: 1
---

# Introduction

Introducing **Pucktrick**, the definitive library for **introducing a controlled amount of specific errors into datasets**. The library's name is inspired by Puck, the mischievous elf from Shakespeare's *A Midsummer Night's Dream*, famous for causing trouble and playing tricks — much like the controlled chaos Pucktrick injects into your data.

In various research activities, it is necessary to contaminate a dataset in order to study its effects. However, this task is highly complex and prone to producing datasets with characteristics that diverge from the intended ones, potentially hindering the accurate execution of experiments. Pucktrick was developed to alleviate this burden, defining specific methods for different types of data and errors, allowing users to contaminate a dataset by introducing a known percentage of a specific type of error.

## Features

Pucktrick is organized in modules, one for each error type. Each module includes a main function (or a class injector) that receives as parameters the dataset to modify, the `strategy` dictionary, and the original dataset if `mode="extended"` or `mode="composed"`. Functions return two parameters: an error code (0 for success, 1 for failure/no modifications) and the generated dataset.

Pucktrick includes two families of modules:

### Error Injection Modules
Introduce controlled errors into individual columns of a dataset:
- **Missing** — replaces values with `NaN`
- **Outliers** — injects statistical outliers using 3-sigma rules
- **Duplicated** — duplicates rows with optional text transformations
- **Noisy** — adds random noise or systematic shift to numeric, string, or datetime data
- **Labels** — flips classification labels (binary or multi-class, with NCAR/NAR/NNAR noise models)

### Drift Simulation Modules
Simulate temporal dataset drift across segments of a dataset:
- **Covariate Noise Drift** — progressive Gaussian noise on features ($P(X)$ shift)
- **Covariate Offset Drift** — systematic directional offset on features
- **Concept Drift (Target Offset)** — shifts the target variable ($P(Y \mid X)$ change)
- **Concept Drift (Feature Rotation)** — permutes feature values, breaking feature-label relationships
- **Label Drift (Prior Multinomial)** — resamples class distribution ($P(Y)$ shift)
- **Target Scaling** — applies a multiplicative factor to the numeric target
- **Generic Drift** — unified module supporting all drift types

This manual walks through every aspect of setting up and using Pucktrick, including the strategy configuration and all module-specific options.

Start with instructions for [installing or upgrading Pucktrick](getting-started/installation.md).
