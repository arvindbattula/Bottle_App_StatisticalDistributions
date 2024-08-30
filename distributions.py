import numpy as np
from scipy import stats

def get_distribution_data(distribution, params):
    
    if distribution == 'normal':
        x = np.linspace(-10, 10, 1000)
        y = stats.norm.pdf(x, loc=params['mean'], scale=params['std'])
    elif distribution == 'exponential':
        x = np.linspace(0, 5/params['lambda'], 1000)
        y = stats.expon.pdf(x, scale=1/params['lambda'])
    elif distribution == 'gamma':
        x = np.linspace(0, stats.gamma.ppf(0.99, a=params['k'], scale=params['theta']), 1000)
        y = stats.gamma.pdf(x, a=params['k'], scale=params['theta'])
    elif distribution == 'beta':
        x = np.linspace(0, 1, 1000)
        y = stats.beta.pdf(x, a=params['alpha'], b=params['beta'])
    elif distribution == 'lognormal':
        x = np.linspace(0, 10, 1000)
        y = stats.lognorm.pdf(x, s=params['mu'], scale=params['sigma'])
    elif distribution == 'chi2':
        x = np.linspace(0, 10, 1000)
        y = stats.chi2.pdf(x, df=params['k'])
    elif distribution == 't':
        x = np.linspace(-10, 10, 1000)
        y = stats.t.pdf(x, df=params['df'])
    elif distribution == 'f':
        x = np.linspace(0, 5, 1000)
        y = stats.f.pdf(x, dfn=params['d1'], dfd=params['d2'])
    elif distribution == 'binomial':
        x = np.arange(0, params['n']+1)
        y = stats.binom.pmf(x, n=params['n'], p=params['p'])
    elif distribution == 'poisson':
        x = np.arange(0, 20)
        y = stats.poisson.pmf(x, mu=params['lambda'])
    elif distribution == 'geometric':
        x = np.arange(1, 11)
        y = stats.geom.pmf(x, p=params['p'])
    elif distribution == 'hypergeometric':
        x = np.arange(0, min(params['n'], params['N'])+1)
        y = stats.hypergeom.pmf(x, M=params['K'], n=params['n'], N=params['N'])
    elif distribution == 'negative_binomial':
        x = np.arange(0, 20)
        y = stats.nbinom.pmf(x, n=params['n'], p=params['p'])
    elif distribution == 'wald':
        x = np.linspace(0, 5, 1000)
        y = stats.wald.pdf(x, loc=params['mu'], scale=params['lambda'])
    elif distribution == 'rayleigh':
        x = np.linspace(0, 5, 1000)
        y = stats.rayleigh.pdf(x, scale=params['sigma'])
    elif distribution == 'pareto':
        x = np.linspace(0, 5, 1000)
        y = stats.pareto.pdf(x, b=params['alpha'], scale=params['xm'])
    elif distribution == 'logistic':
        x = np.linspace(-10, 10, 1000)
        y = stats.logistic.pdf(x, loc=params['mu'], scale=params['s'])
    elif distribution == 'laplace':
        x = np.linspace(-10, 10, 1000)
        y = stats.laplace.pdf(x, loc=params['mu'], scale=params['b'])
    elif distribution == 'gumbel':
        x = np.linspace(-10, 10, 1000)
        y = stats.gumbel_r.pdf(x, loc=params['mu'], scale=params['beta'])
    elif distribution == 'weibull':
        x = np.linspace(0, 5, 1000)
        y = stats.weibull_min.pdf(x, c=params['lambda'], scale=params['k'])
    elif distribution == 'cauchy':
        x = np.linspace(-10, 10, 1000)
        y = stats.cauchy.pdf(x, loc=params['x0'], scale=params['gamma'])
    elif distribution == 'exponentialpower':
        x = np.linspace(0, 5, 1000)
        y = stats.exponpow.pdf(x, b=params['b'], scale=params['scale'])
    elif distribution == 'bernoulli':
        x = np.arange(0, 2)
        y = stats.bernoulli.pmf(x, p=params['p'])
    elif distribution == 'boltzmann':
        x = np.linspace(0, 5, 1000)
        y = stats.boltzmann.pmf(x, lambda_=params['lambda_'])
    elif distribution == 'bradford':
        x = np.linspace(0, 5, 1000)
        y = stats.bradford.pdf(x, c=params['c'])
    elif distribution == 'burr':
        x = np.linspace(0, 5, 1000)
        y = stats.burr.pdf(x, c=params['c'], d=params['d'], scale=params['scale'])
    elif distribution == 'chi':
        x = np.linspace(0, 5, 1000)
        y = stats.chi.pdf(x, df=params['df'])
    elif distribution == 'chi2noncentral':
        x = np.linspace(0, 5, 1000)
        y = stats.chi2nonc.pdf(x, df=params['df'], nc=params['nc'])
    elif distribution == 'dgamma':
        x = np.linspace(0, 5, 1000)
        y = stats.dgamma.pdf(x, a=params['a'], scale=params['scale'])
    elif distribution == 'dweibull':
        x = np.linspace(0, 5, 1000)
        y = stats.dweibull.pdf(x, c=params['c'], scale=params['scale'])
    elif distribution == 'erlang':
        x = np.linspace(0, 5, 1000)
        y = stats.erlang.pdf(x, a=params['a'], scale=params['scale'])
    elif distribution == 'exponnorm':
        x = np.linspace(0, 5, 1000)
        y = stats.exponnorm.pdf(x, K=params['K'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'exponweib':
        x = np.linspace(0, 5, 1000)
        y = stats.exponweib.pdf(x, c=params['c'], a=params['a'], scale=params['scale'])
    elif distribution == 'fisk':
        x = np.linspace(0, 5, 1000)
        y = stats.fisk.pdf(x, c=params['c'], scale=params['scale'])
    elif distribution == 'foldcauchy':
        x = np.linspace(0, 5, 1000)
        y = stats.foldcauchy.pdf(x, c=params['c'], scale=params['scale'])
    elif distribution == 'foldnorm':
        x = np.linspace(0, 5, 1000)
        y = stats.foldnorm.pdf(x, c=params['c'], scale=params['scale'])
    elif distribution == 'genlogistic':
        x = np.linspace(0, 5, 1000)
        y = stats.genlogistic.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'gennorm':
        x = np.linspace(0, 5, 1000)
        y = stats.gennorm.pdf(x, beta=params['beta'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'genpareto':
        x = np.linspace(0, 5, 1000)
        y = stats.genpareto.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'genexpon':
        x = np.linspace(0, 5, 1000)
        y = stats.genexpon.pdf(x, b=params['b'], c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'erlang':
        x = np.linspace(0, 5, 1000)
        y = stats.erlang.pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'gilbrat':
        x = np.linspace(0, 5, 1000)
        y = stats.gilbrat.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'invgamma':
        x = np.linspace(0, 5, 1000)
        y = stats.invgamma.pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    else:
        raise ValueError(f"Unknown distribution: {distribution}")
    
    return {'x': x.tolist(), 'y': y.tolist()}
