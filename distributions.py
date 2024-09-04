import numpy as np
import itertools
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
    elif distribution == 'negativebinomial':
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
        y = stats.exponpow.pdf(x, b=params['b'],loc=params['loc'],scale=params['scale'])
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
    elif distribution == 'gompertz':
        x = np.linspace(0, 5, 1000)
        y = stats.gompertz.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'nakagami':
        x = np.linspace(0, 5, 1000)
        y = stats.nakagami.pdf(x, nu=params['nu'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'mielke':
        x = np.linspace(0, 5, 1000)
        y = stats.mielke.pdf(x, k=params['k'], s=params['s'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'lomax':
        x = np.linspace(0, 5, 1000)
        y = stats.lomax.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'fatiguelife':
        x = np.linspace(0, 5, 1000)
        y = stats.fatiguelife.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'genextreme':
        x = np.linspace(0, 5, 1000)
        y = stats.genextreme.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'gengamma':
        x = np.linspace(0, 5, 1000)
        y = stats.gengamma.pdf(x, a=params['a'], c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'genhalflogistic':
        x = np.linspace(0, 5, 1000)
        y = stats.genhalflogistic.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'genpowernorm':
        x = np.linspace(0, 5, 1000)
        y = stats.genpowernorm.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'halfcauchy':
        x = np.linspace(0, 5, 1000)
        y = stats.halfcauchy.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'halfgennorm':
        x = np.linspace(0, 5, 1000)
        y = stats.halfgennorm.pdf(x, beta=params['beta'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'halflogistic':
        x = np.linspace(0, 5, 1000)
        y = stats.halflogistic.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'halfnorm':
        x = np.linspace(0, 5, 1000)
        y = stats.halfnorm.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'hypsecant':
        x = np.linspace(0, 5, 1000)
        y = stats.hypsecant.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'invgauss':
        x = np.linspace(0, 5, 1000)
        y = stats.invgauss.pdf(x, mu=params['mu'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'invweibull':
        x = np.linspace(0, 5, 1000)
        y = stats.invweibull.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'johnsonsb':
        x = np.linspace(0, 5, 1000)
        y = stats.johnsonsb.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'johnsonsu':
        x = np.linspace(0, 5, 1000)
        y = stats.johnsonsu.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'kappa4':
        x = np.linspace(0, 5, 1000)
        y = stats.kappa4.pdf(x, h=params['h'], k=params['k'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'kappa3':
        x = np.linspace(0, 5, 1000)
        y = stats.kappa3.pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'ksone':
        x = np.linspace(0, 5, 1000)
        y = stats.ksone.pdf(x, n=params['n'])
    elif distribution == 'kstwobign':
        x = np.linspace(0, 5, 1000)
        y = stats.kstwobign.pdf(x)
    elif distribution == 'levy':
        x = np.linspace(0, 5, 1000)
        y = stats.levy.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'levy_l':
        x = np.linspace(-5, 0, 1000)
        y = stats.levy_l.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'loggamma':
        x = np.linspace(0, 5, 1000)
        y = stats.loggamma.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'loglaplace':
        x = np.linspace(0, 5, 1000)
        y = stats.loglaplace.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'maxwell':
        x = np.linspace(0, 5, 1000)
        y = stats.maxwell.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'ncf':
        x = np.linspace(0, 5, 1000)
        y = stats.ncf.pdf(x, dfn=params['dfn'], dfd=params['dfd'], nc=params['nc'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'nct':
        x = np.linspace(-5, 5, 1000)
        y = stats.nct.pdf(x, df=params['df'], nc=params['nc'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'ncx2':
        x = np.linspace(0, 10, 1000)
        y = stats.ncx2.pdf(x, df=params['df'], nc=params['nc'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'norminvgauss':
        x = np.linspace(-5, 5, 1000)
        y = stats.norminvgauss.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'pearson3':
        x = np.linspace(-5, 5, 1000)
        y = stats.pearson3.pdf(x, skew=params['skew'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'powerlaw':
        x = np.linspace(0, 5, 1000)
        y = stats.powerlaw.pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'powerlognorm':
        x = np.linspace(0, 5, 1000)
        y = stats.powerlognorm.pdf(x, c=params['c'], s=params['s'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'powernorm':
        x = np.linspace(-5, 5, 1000)
        y = stats.powernorm.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'rdist':
        x = np.linspace(-5, 5, 1000)
        y = stats.rdist.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'recipinvgauss':
        x = np.linspace(0, 5, 1000)
        y = stats.recipinvgauss.pdf(x, mu=params['mu'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'rice':
        x = np.linspace(0, 5, 1000)
        y = stats.rice.pdf(x, b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'reciprocal':
        x = np.linspace(0, 5, 1000)
        y = stats.reciprocal.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'semicircular':
        x = np.linspace(-1, 1, 1000)
        y = stats.semicircular.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'skewnorm':
        x = np.linspace(-5, 5, 1000)
        y = stats.skewnorm.pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'trapezoid':
        x = np.linspace(0, 1, 1000)
        y = stats.trapezoid.pdf(x, c=params['c'], d=params['d'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'triang':
        x = np.linspace(0, 1, 1000)
        y = stats.triang.pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'truncexpon':
        x = np.linspace(0, 5, 1000)
        y = stats.truncexpon.pdf(x, b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'truncnorm':
        x = np.linspace(-5, 5, 1000)
        y = stats.truncnorm.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'tukeylambda':
        x = np.linspace(-5, 5, 1000)
        y = stats.tukeylambda.pdf(x, lam=params['lam'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'arcsine':
        x = np.linspace(0, 1, 1000)
        y = stats.arcsine.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'betaprime':
        x = np.linspace(0, 5, 1000)
        y = stats.betaprime.pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'burr12':
        x = np.linspace(0, 5, 1000)
        y = stats.burr12.pdf(x, c=params['c'], d=params['d'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'dagum':
        # Estimating the PDF for Dagum distribution
        def dagum_pdf(x, p, a, b):
            return (a * p / x) * ((x / b) ** (a * p)) / (1 + (x / b) ** a) ** (p + 1)
        
        x = np.linspace(0, 5, 1000)
        y = dagum_pdf(x, p=params['p'], a=params['a'], b=params['scale'])
    elif distribution == 'fisherz':
        def fisherz_pdf(x, loc=0, scale=1):
            z = (x - loc) / scale
            return np.exp(z - np.log(2) - 0.5 * np.exp(2 * z)) / scale
        
        x = np.linspace(-5, 5, 1000)
        y = fisherz_pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'frechet_r':
        def frechet_pdf(x, c, loc, scale):
            z = (x - loc) / scale
            return (c / scale) * (z ** (-c - 1)) * np.exp(-z ** (-c)) * (z > 0)
        
        x = np.linspace(0, 5, 1000)
        y = frechet_pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'kumaraswamy':
        def kumaraswamy_pdf(x, a, b, loc, scale):
            x_scaled = (x - loc) / scale
            return (a * b / scale) * (x_scaled ** (a - 1)) * ((1 - x_scaled ** a) ** (b - 1)) * ((x_scaled >= 0) & (x_scaled <= 1))
        
        x = np.linspace(0, 1, 1000)
        y = kumaraswamy_pdf(x, a=params['a'], b=params['b'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'logcauchy':
        def logcauchy_pdf(x, loc, scale):
            return 1 / (np.pi * scale * (1 + (np.log((x - loc) / scale))**2))
        
        x = np.linspace(0, 5, 1000)
        y = logcauchy_pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'loglogistic':
        def loglogistic_pdf(x, c, loc, scale):
            z = (x - loc) / scale
            return (c / scale) * (z ** (c - 1)) / ((1 + z ** c) ** 2) * (z > 0)
        
        x = np.linspace(0, 5, 1000)
        y = loglogistic_pdf(x, c=params['c'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'powerfunction':
        def powerfunction_pdf(x, a, loc, scale):
            x_scaled = (x - loc) / scale
            return (a / scale) * (x_scaled ** (a - 1)) * ((x_scaled >= 0) & (x_scaled <= 1))
        
        loc=params['loc']
        scale=params['scale']
        x = np.linspace(loc, loc + scale, 1000)
        y = powerfunction_pdf(x, a=params['a'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'uniform':
        x = np.linspace(params['loc'], params['loc'] + params['scale'], 1000)
        y = stats.uniform.pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'vonmises':
        x = np.linspace(-np.pi, np.pi, 1000)
        y = stats.vonmises.pdf(x, kappa=params['kappa'], loc=params['loc'], scale=params['scale'])
    elif distribution == 'wigner':
        def wigner_semicircle_pdf(x, loc, scale):
            R = scale
            z = (x - loc) / R
            return (2 / (np.pi * R**2)) * np.sqrt(R**2 - (x - loc)**2) * ((z >= -1) & (z <= 1))
        
        x = np.linspace(params['loc'] - params['scale'], params['loc'] + params['scale'], 1000)
        y = wigner_semicircle_pdf(x, loc=params['loc'], scale=params['scale'])
    elif distribution == 'skellam':
        x = np.arange(-10, 11)
        y = stats.skellam.pmf(x, mu1=params['mu1'], mu2=params['mu2'], loc=params['loc'])
    elif distribution == 'yulesimon':
        x = np.arange(1, 11)
        y = stats.yulesimon.pmf(x, alpha=params['alpha'], loc=params['loc'])
    elif distribution == 'zeta':
        def zeta_pdf(x, a):
            return x**(-a) / np.sum(np.arange(1, 10000)**(-a))
        
        x = np.arange(1, 11)
        y = zeta_pdf(x, a=params['a'])
    elif distribution == 'multinomial':
        n = params['n']
        p = params['p']
        k = len(p)
        x = np.array(list(itertools.product(range(n+1), repeat=k)))
        x = x[np.sum(x, axis=1) == n]  # Filter combinations that sum to n
        y = stats.multinomial.pmf(x, n=n, p=p)
    elif distribution == 'multivariate_normal':
        x, y = np.mgrid[-3:3:.1, -3:3:.1]
        pos = np.dstack((x, y))
        try:
            rv = stats.multivariate_normal(mean=params['mean'], cov=params['cov'])
            z = rv.pdf(pos)
        except np.linalg.LinAlgError:
            # Handle singular covariance matrix
            print("Warning: Singular covariance matrix. Using a small regularization.")
            cov = np.array(params['cov'])
            cov += np.eye(cov.shape[0]) * 1e-6  # Add small values to diagonal
            rv = stats.multivariate_normal(mean=params['mean'], cov=cov)
            z = rv.pdf(pos)
        return {'x': x.tolist(), 'y': y.tolist(), 'z': z.tolist()}
    elif distribution == 'multivariate_t':
        x, y = np.mgrid[-3:3:.1, -3:3:.1]
        pos = np.dstack((x, y))
        try:
            rv = stats.multivariate_t(loc=params['loc'], shape=params['shape'], df=params['df'])
            z = rv.pdf(pos)
        except np.linalg.LinAlgError:
            print("Warning: Singular shape matrix. Using a small regularization.")
            shape = np.array(params['shape'])
            shape += np.eye(shape.shape[0]) * 1e-6  # Add small values to diagonal
            rv = stats.multivariate_t(loc=params['loc'], shape=shape, df=params['df'])
            z = rv.pdf(pos)
        return {'x': x.tolist(), 'y': y.tolist(), 'z': z.tolist()}
    elif distribution == 'dirichlet':
        x = np.linspace(0, 1, 100)
        y = np.linspace(0, 1, 100)
        X, Y = np.meshgrid(x, y)
        XY = np.dstack([X, Y, 1-X-Y]).reshape(-1, 3)
        XY = np.maximum(XY, 0)  # Ensure all values are non-negative
        XY = XY / XY.sum(axis=1, keepdims=True)  # Normalize to ensure sum is 1
        Z = stats.dirichlet.pdf(XY.T, alpha=params['alpha']).reshape(100, 100)
        return {'x': x.tolist(), 'y': y.tolist(), 'z': Z.tolist()}
    elif distribution == 'wishart':
        x = np.linspace(0, 10, 100)
        y = np.linspace(0, 10, 100)
        X, Y = np.meshgrid(x, y)
        XY = np.dstack([X, Y]).reshape(-1, 2, 2)  # Reshape to 2x2 matrices
        dim = 2  # Dimension of the Wishart distribution
        df = max(dim + 1, params['df'])  # Ensure df > dim - 1
        scale = np.array(params['scale']).reshape(2, 2)  # Reshape scale to 2x2 matrix
        try:
            Z = stats.wishart.pdf(XY, df=df, scale=scale).reshape(100, 100)
        except ValueError as e:
            print(f"Error: {e}")
            Z = np.zeros((100, 100))  # Return zeros if error occurs
        return {'x': x.tolist(), 'y': y.tolist(), 'z': Z.tolist()}
    elif distribution == 'invwishart':
        x = np.linspace(0, 10, 100)
        y = np.linspace(0, 10, 100)
        X, Y = np.meshgrid(x, y)
        XY = np.dstack([X, Y]).reshape(-1, 2, 2)  # Reshape to 2x2 matrices
        dim = 2  # Dimension of the Inverse Wishart distribution
        df = max(dim + 1, params['df'])  # Ensure df > dim + 1
        scale = np.array(params['scale']).reshape(2, 2)  # Reshape scale to 2x2 matrix
        try:
            Z = stats.invwishart.pdf(XY, df=df, scale=scale).reshape(100, 100)
        except ValueError as e:
            print(f"Error: {e}")
            Z = np.zeros((100, 100))  # Return zeros if error occurs
        return {'x': x.tolist(), 'y': y.tolist(), 'z': Z.tolist()}
    elif distribution == 'betabinom':
        x = np.arange(params['n'] + 1)
        y = stats.betabinom.pmf(x, n=params['n'], a=params['a'], b=params['b'], loc=params['loc'])
    elif distribution == 'nhypergeom':
        x = np.arange(min(params['n'], params['M']) + 1)
        y = stats.nhypergeom.pmf(x, M=params['M'], n=params['n'], r=params['r'])
    elif distribution == 'polya':
        def polya_pdf(x, alpha):
            alpha_sum = np.sum(alpha)
            x_sum = np.sum(x)
            numerator = stats.gamma(alpha_sum) / stats.gamma(alpha_sum + x_sum)
            denominator = np.prod([stats.gamma(a + xi) / (stats.gamma(a) * stats.gamma(xi + 1)) for a, xi in zip(alpha, x)])
            return numerator * denominator
        
        alpha = np.array(params['alpha'])
        n_samples = 1000
        x = np.random.multinomial(1, alpha / alpha.sum(), size=n_samples)
        y = np.apply_along_axis(lambda xi: polya_pdf(xi, alpha), 1, x)
    elif distribution == 'zipf':
        x = np.arange(1, 21)
        y = stats.zipf.pmf(x, a=params['a'])
    else:
        raise ValueError(f"Unknown distribution: {distribution}")
    
    return {'x': x.tolist(), 'y': y.tolist()}
