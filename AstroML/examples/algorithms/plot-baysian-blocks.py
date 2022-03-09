"""
Bayesian Blocks for Histograms
---
.. current module:: astroML

Bayesian Block is a dynamic histogramming method which optimizes one of
several possible fitness functions to determine an optimal binning for
data, where the bins are not necessary uniform width. The astroML
implementation is based on [1]_. For more discussion of this technique,
see the blog post at [2]_.

The code below uses a fitness function suitable for event data with possible
repeats. More fitness functions are available: see :mod:`density_estimation`
"""

import numpy as np
from scipy import stats
from matplotlib import pyplot as plt

from astropy.visualization import hist

# draw a set of variables
np.random.seed(0)
t = np.concatenate([stats.cauchy(-5, 1.8).rvs(500),
stats.cauchy(-4, 0.8).rvs(2000),
stats.cauchy(-1, 0.3).rvs(500),
stats.cauchy(2, 0.8).rvs(1000),
stats.cauchy(4, 1.5).rvs(500),
])

# truncate values to a reasonable range
t = t[(t > -15) & (t < 15)]