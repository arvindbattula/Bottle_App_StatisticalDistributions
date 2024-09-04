function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            console.log('Login successful', data.token);
            localStorage.setItem('token', data.token);
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('distribution-selector').style.display = 'block';
            updateDistribution();
        } else {
            console.error('Login failed', data.error);
            alert('Login failed: ' + data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during login');
    });
}

function updateDistribution() {
    const distribution = document.getElementById('distribution-select').value;
    const parameterControls = document.getElementById('parameter-controls');
    parameterControls.innerHTML = '';

    switch (distribution) {
        case 'normal':
            parameterControls.innerHTML = `
                <label for="mean">Mean:</label>
                <input type="number" id="mean" value="0" step="0.1">
                <label for="std">Standard Deviation:</label>
                <input type="number" id="std" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'exponential':
            parameterControls.innerHTML = `
                <label for="lambda">λ:</label>
                <input type="number" id="lambda" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'exponentialpower':
            parameterControls.innerHTML = `
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'gamma':
            parameterControls.innerHTML = `
                <label for="k">k (shape):</label>
                <input type="number" id="k" value="2" step="0.1" min="0.1">
                <label for="theta">θ (scale):</label>
                <input type="number" id="theta" value="2" step="0.1" min="0.1">
            `;
            break;
        case 'beta':
            parameterControls.innerHTML = `
                <label for="alpha">α:</label>
                <input type="number" id="alpha" value="2" step="0.1" min="0.1">
                <label for="beta">β:</label>
                <input type="number" id="beta" value="2" step="0.1" min="0.1">
            `;
            break;
        case 'chi2':
            parameterControls.innerHTML = `
                <label for="k">k:</label>
                <input type="number" id="k" value="2" step="0.1" min="0.1">
            `;
            break;
        case 'f':
            parameterControls.innerHTML = `
                <label for="d1">d1:</label>
                <input type="number" id="d1" value="2" step="0.1" min="0.1">
                <label for="d2">d2:</label>
                <input type="number" id="d2" value="2" step="0.1" min="0.1">
            `;
            break;
        case 't':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="2" step="0.1" min="0.1">
            `;
            break;
        case 'weibull':
            parameterControls.innerHTML = `
                <label for="lambda">λ:</label>
                <input type="number" id="lambda" value="1" step="0.1" min="0.1">
                <label for="k">k:</label>
                <input type="number" id="k" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'lognormal':
            parameterControls.innerHTML = `
                <label for="mu">μ:</label>
                <input type="number" id="mu" value="0" step="0.1">
                <label for="sigma">σ:</label>
                <input type="number" id="sigma" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'pareto':
            parameterControls.innerHTML = `
                <label for="alpha">α:</label>
                <input type="number" id="alpha" value="1" step="0.1" min="0.1">
                <label for="xm">xm:</label>
                <input type="number" id="xm" value="1" step="0.1">
            `;
            break;
        case 'rayleigh':
            parameterControls.innerHTML = `
                <label for="sigma">σ:</label>
                <input type="number" id="sigma" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'cauchy':
            parameterControls.innerHTML = `
                <label for="x0">x0:</label>
                <input type="number" id="x0" value="0" step="0.1">
                <label for="gamma">γ:</label>
                <input type="number" id="gamma" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'laplace':
            parameterControls.innerHTML = `
                <label for="mu">μ:</label>
                <input type="number" id="mu" value="0" step="0.1">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'logistic':
            parameterControls.innerHTML = `
                <label for="mu">μ:</label>
                <input type="number" id="mu" value="0" step="0.1">
                <label for="s">s:</label>
                <input type="number" id="s" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'wald':
            parameterControls.innerHTML = `
                <label for="mu">μ:</label>
                <input type="number" id="mu" value="0" step="0.1">
                <label for="lambda">λ:</label>
                <input type="number" id="lambda" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'gumbel':
            parameterControls.innerHTML = `
                <label for="mu">μ:</label>
                <input type="number" id="mu" value="0" step="0.1">
                <label for="beta">β:</label>
                <input type="number" id="beta" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'bernoulli':
            parameterControls.innerHTML = `
                <label for="p">p:</label>
                <input type="number" id="p" value="0.5" step="0.1" min="0" max="1">
            `;
            break;
        case 'binomial':
            parameterControls.innerHTML = `
                <label for="n">n:</label>
                <input type="number" id="n" value="10" step="1" min="1">
                <label for="p">p:</label>
                <input type="number" id="p" value="0.5" step="0.1" min="0" max="1">
            `;
            break;
        case 'negativebinomial':
            parameterControls.innerHTML = `
                <label for="n">n:</label>
                <input type="number" id="n" value="10" step="1" min="1">
                <label for="p">p:</label>
                <input type="number" id="p" value="0.5" step="0.1" min="0" max="1">
            `;
            break;
        case 'geometric':
            parameterControls.innerHTML = `
                <label for="p">p:</label>
                <input type="number" id="p" value="0.5" step="0.1" min="0" max="1">
            `;
            break;
        case 'hypergeometric':
            parameterControls.innerHTML = `
                <label for="N">N:</label>
                <input type="number" id="N" value="10" step="1" min="1">
                <label for="K">K:</label>
                <input type="number" id="K" value="5" step="1" min="1">
                <label for="n">n:</label>
                <input type="number" id="n" value="3" step="1" min="1">
            `;
            break;
        case 'poisson':
            parameterControls.innerHTML = `
                <label for="lambda">λ:</label>
                <input type="number" id="lambda" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'bradford':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'burr':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="d">d:</label>
                <input type="number" id="d" value="1" step="0.1" min="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'chi':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="1" step="1" min="1">
            `;
            break;
        case 'chi2noncentral':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="2" step="1" min="1">
                <label for="nc">nc:</label>
                <input type="number" id="nc" value="1" step="0.1" min="0">
            `;
            break;
        case 'dgamma':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'dweibull':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'erlang':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="1" min="1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'gilbrat':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'invgamma':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'gompertz':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'nakagami':
            parameterControls.innerHTML = `
                <label for="nu">nu:</label>
                <input type="number" id="nu" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'mielke':
            parameterControls.innerHTML = `
                <label for="k">k:</label>
                <input type="number" id="k" value="1" step="0.1" min="0.1">
                <label for="s">s:</label>
                <input type="number" id="s" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'lomax':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'fatiguelife':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'genextreme':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="0" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'gengamma':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0.1">
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'genhalflogistic':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'genpowernorm':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'halfcauchy':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'halfgennorm':
            parameterControls.innerHTML = `
                <label for="beta">beta:</label>
                <input type="number" id="beta" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'halflogistic':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'halfnorm':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'hypsecant':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'invgauss':
            parameterControls.innerHTML = `
                <label for="mu">mu:</label>
                <input type="number" id="mu" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'invweibull':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'johnsonsb':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'johnsonsu':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'kappa4':
            parameterControls.innerHTML = `
                <label for="h">h:</label>
                <input type="number" id="h" value="1" step="0.1">
                <label for="k">k:</label>
                <input type="number" id="k" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'kappa3':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'ksone':
            parameterControls.innerHTML = `
                <label for="n">n:</label>
                <input type="number" id="n" value="1" step="1" min="1">
            `;
            break;
        case 'kstwobign':
            parameterControls.innerHTML = `
                <p>This distribution has no parameters to adjust.</p>
            `;
            break;
        case 'levy':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'levy_l':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'loggamma':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'loglaplace':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'maxwell':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'ncf':
            parameterControls.innerHTML = `
                <label for="dfn">dfn:</label>
                <input type="number" id="dfn" value="2" step="1" min="1">
                <label for="dfd">dfd:</label>
                <input type="number" id="dfd" value="3" step="1" min="1">
                <label for="nc">nc:</label>
                <input type="number" id="nc" value="1" step="0.1" min="0">
            `;
            break;
        case 'nct':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="2" step="1" min="1">
                <label for="nc">nc:</label>
                <input type="number" id="nc" value="1" step="0.1">
            `;
            break;
        case 'ncx2':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="2" step="1" min="1">
                <label for="nc">nc:</label>
                <input type="number" id="nc" value="1" step="0.1" min="0">
            `;
            break;
        case 'norminvgauss':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="b">b:</label>
                <input type="number" id="b" value="0" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'pearson3':
            parameterControls.innerHTML = `
                <label for="skew">skew:</label>
                <input type="number" id="skew" value="0" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'powerlaw':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'powerlognorm':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0">
                <label for="s">s:</label>
                <input type="number" id="s" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'powernorm':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'rdist':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'recipinvgauss':
            parameterControls.innerHTML = `
                <label for="mu">mu:</label>
                <input type="number" id="mu" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'rice':
            parameterControls.innerHTML = `
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'reciprocal':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="0" step="0.1">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'semicircular':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'skewnorm':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="0" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'trapezoid':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="0.3" step="0.1" min="0" max="1">
                <label for="d">d:</label>
                <input type="number" id="d" value="0.7" step="0.1" min="0" max="1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'triang':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="0.5" step="0.1" min="0" max="1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'truncexpon':
            parameterControls.innerHTML = `
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'truncnorm':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="-2" step="0.1">
                <label for="b">b:</label>
                <input type="number" id="b" value="2" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'tukeylambda':
            parameterControls.innerHTML = `
                <label for="lam">lam:</label>
                <input type="number" id="lam" value="1" step="0.1">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'arcsine':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'betaprime':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="2" step="0.1" min="0">
                <label for="b">b:</label>
                <input type="number" id="b" value="2" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'burr12':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="2" step="0.1" min="0">
                <label for="d">d:</label>
                <input type="number" id="d" value="2" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'dagum':
            parameterControls.innerHTML = `
                <label for="p">p:</label>
                <input type="number" id="p" value="1" step="0.1" min="0">
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'fisherz':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'frechet_r':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'kumaraswamy':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'logcauchy':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'loglogistic':
            parameterControls.innerHTML = `
                <label for="c">c:</label>
                <input type="number" id="c" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'powerfunction':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'uniform':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'vonmises':
            parameterControls.innerHTML = `
                <label for="kappa">kappa:</label>
                <input type="number" id="kappa" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'wigner':
            parameterControls.innerHTML = `
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
                <label for="scale">scale:</label>
                <input type="number" id="scale" value="1" step="0.1" min="0.1">
            `;
            break;
        case 'skellam':
            parameterControls.innerHTML = `
                <label for="mu1">mu1:</label>
                <input type="number" id="mu1" value="1" step="0.1" min="0">
                <label for="mu2">mu2:</label>
                <input type="number" id="mu2" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
            `;
            break;
        case 'yulesimon':
            parameterControls.innerHTML = `
                <label for="alpha">alpha:</label>
                <input type="number" id="alpha" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="1" step="0.1">
            `;
            break;
        case 'zeta':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="2" step="0.1" min="1.01">
            `;
            break;
        case 'multinomial':
            parameterControls.innerHTML = `
                <label for="n">n:</label>
                <input type="number" id="n" value="10" step="1" min="1">
                <label for="p">p (comma-separated):</label>
                <input type="text" id="p" value="0.3,0.3,0.4">
            `;
            break;
        case 'multivariate_normal':
            parameterControls.innerHTML = `
                <label for="mean">mean (comma-separated):</label>
                <input type="text" id="mean" value="0,0">
                <label for="cov">covariance matrix (comma-separated):</label>
                <input type="text" id="cov" value="1,0,0,1">
            `;
            break;
        case 'multivariate_t':
            parameterControls.innerHTML = `
                <label for="loc">loc (comma-separated):</label>
                <input type="text" id="loc" value="0,0">
                <label for="shape">shape matrix (comma-separated):</label>
                <input type="text" id="shape" value="1,0,0,1">
                <label for="df">df:</label>
                <input type="number" id="df" value="2" step="0.1" min="0">
            `;
            break;
        case 'dirichlet':
            parameterControls.innerHTML = `
                <label for="alpha">alpha (comma-separated):</label>
                <input type="text" id="alpha" value="1,1,1">
            `;
            break;
        case 'wishart':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="3" step="1" min="1">
                <label for="scale">scale matrix (comma-separated):</label>
                <input type="text" id="scale" value="1,0,0,1,0,0,0,0,1">
            `;
            break;
        case 'invwishart':
            parameterControls.innerHTML = `
                <label for="df">df:</label>
                <input type="number" id="df" value="3" step="1" min="1">
                <label for="scale">scale matrix (comma-separated):</label>
                <input type="text" id="scale" value="1,0,0,1,0,0,0,0,1">
            `;
            break;
        case 'betabinom':
            parameterControls.innerHTML = `
                <label for="n">n:</label>
                <input type="number" id="n" value="10" step="1" min="1">
                <label for="a">a:</label>
                <input type="number" id="a" value="1" step="0.1" min="0">
                <label for="b">b:</label>
                <input type="number" id="b" value="1" step="0.1" min="0">
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="1">
            `;
            break;
        case 'nhypergeom':
            parameterControls.innerHTML = `
                <label for="M">M:</label>
                <input type="number" id="M" value="20" step="1" min="1">
                <label for="n">n:</label>
                <input type="number" id="n" value="7" step="1" min="0">
                <label for="r">r:</label>
                <input type="number" id="r" value="12" step="1" min="0">
            `;
            break;
        case 'polya':
            parameterControls.innerHTML = `
                <label for="alpha">alpha (comma-separated):</label>
                <input type="text" id="alpha" value="1,1,1">
            `;
            break;
        case 'zipf':
            parameterControls.innerHTML = `
                <label for="a">a:</label>
                <input type="number" id="a" value="2" step="0.1" min="1">
            `;
            break;
    }

    parameterControls.innerHTML += '<button onclick="updatePlot()" style="margin-bottom: 20px;">Update Plot</button>';
    parameterControls.innerHTML += '<div id="plot-container" style="margin-top: 20px;"></div>';
    updatePlot();
}

function updatePlot() {
    const distribution = document.getElementById('distribution-select').value;
    const params = {};

    switch (distribution) {
        case 'normal':
            params.mean = parseFloat(document.getElementById('mean').value);
            params.std = parseFloat(document.getElementById('std').value);
            break;
        case 'exponential':
            params.lambda = parseFloat(document.getElementById('lambda').value);
            break;
        case 'exponentialpower':
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'gamma':
            params.k = parseFloat(document.getElementById('k').value);
            params.theta = parseFloat(document.getElementById('theta').value);
            break;
        case 'beta':
            params.alpha = parseFloat(document.getElementById('alpha').value);
            params.beta = parseFloat(document.getElementById('beta').value);
            break;
        case 'chi2':
            params.k = parseFloat(document.getElementById('k').value);
            break;
        case 'f':
            params.d1 = parseFloat(document.getElementById('d1').value);
            params.d2 = parseFloat(document.getElementById('d2').value);
            break;
        case 't':
            params.df = parseFloat(document.getElementById('df').value);
            break;
        case 'weibull':
            params.lambda = parseFloat(document.getElementById('lambda').value);
            params.k = parseFloat(document.getElementById('k').value);
            break;
        case 'lognormal':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.sigma = parseFloat(document.getElementById('sigma').value);
            break;
        case 'pareto':
            params.alpha = parseFloat(document.getElementById('alpha').value);
            params.xm = parseFloat(document.getElementById('xm').value);
            break;
        case 'rayleigh':
            params.sigma = parseFloat(document.getElementById('sigma').value);
            break;
        case 'cauchy':
            params.x0 = parseFloat(document.getElementById('x0').value);
            params.gamma = parseFloat(document.getElementById('gamma').value);
            break;
        case 'laplace':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.b = parseFloat(document.getElementById('b').value);
            break;
        case 'logistic':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.s = parseFloat(document.getElementById('s').value);
            break;
        case 'wald':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.lambda = parseFloat(document.getElementById('lambda').value);
            break;
        case 'gumbel':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.beta = parseFloat(document.getElementById('beta').value);
            break;
        case 'bernoulli':
            params.p = parseFloat(document.getElementById('p').value);
            break;
        case 'binomial':
            params.n = parseFloat(document.getElementById('n').value);
            params.p = parseFloat(document.getElementById('p').value);
            break;
        case 'negativebinomial':
            params.n = parseFloat(document.getElementById('n').value);
            params.p = parseFloat(document.getElementById('p').value);
            break;
        case 'geometric':
            params.p = parseFloat(document.getElementById('p').value);
            break;
        case 'hypergeometric':
            params.N = parseFloat(document.getElementById('N').value);
            params.K = parseFloat(document.getElementById('K').value);
            params.n = parseFloat(document.getElementById('n').value);
            break;
        case 'poisson':
            params.lambda = parseFloat(document.getElementById('lambda').value);
            break;
        case 'bradford':
            params.c = parseFloat(document.getElementById('c').value);
            break;
        case 'burr':
            params.c = parseFloat(document.getElementById('c').value);
            params.d = parseFloat(document.getElementById('d').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'chi':
            params.df = parseFloat(document.getElementById('df').value);
            break;
        case 'chi2noncentral':
            params.df = parseFloat(document.getElementById('df').value);
            params.nc = parseFloat(document.getElementById('nc').value);
            break;
        case 'dgamma':
            params.a = parseFloat(document.getElementById('a').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'dweibull':
            params.c = parseFloat(document.getElementById('c').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'erlang':
            params.a = parseFloat(document.getElementById('a').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'gilbrat':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'invgamma':
            params.a = parseFloat(document.getElementById('a').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'gompertz':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'nakagami':
            params.nu = parseFloat(document.getElementById('nu').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'mielke':
            params.k = parseFloat(document.getElementById('k').value);
            params.s = parseFloat(document.getElementById('s').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'lomax':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'fatiguelife':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'genextreme':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'gengamma':
            params.a = parseFloat(document.getElementById('a').value);
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'genhalflogistic':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'genpowernorm':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'halfcauchy':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'halfgennorm':
            params.beta = parseFloat(document.getElementById('beta').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'halflogistic':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'halfnorm':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'hypsecant':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'invgauss':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'invweibull':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'johnsonsb':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'johnsonsu':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'kappa4':
            params.h = parseFloat(document.getElementById('h').value);
            params.k = parseFloat(document.getElementById('k').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'kappa3':
            params.a = parseFloat(document.getElementById('a').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'ksone':
            params.n = parseInt(document.getElementById('n').value);
            break;
        case 'kstwobign':
            // No parameters needed for kstwobign
            break;
        case 'levy':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'levy_l':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'loggamma':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'loglaplace':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'maxwell':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'ncf':
            params.dfn = parseFloat(document.getElementById('dfn').value);
            params.dfd = parseFloat(document.getElementById('dfd').value);
            params.nc = parseFloat(document.getElementById('nc').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'nct':
            params.df = parseFloat(document.getElementById('df').value);
            params.nc = parseFloat(document.getElementById('nc').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'ncx2':
            params.df = parseFloat(document.getElementById('df').value);
            params.nc = parseFloat(document.getElementById('nc').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'norminvgauss':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'pearson3':
            params.skew = parseFloat(document.getElementById('skew').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'powerlaw':
            params.a = parseFloat(document.getElementById('a').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'powerlognorm':
            params.c = parseFloat(document.getElementById('c').value);
            params.s = parseFloat(document.getElementById('s').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'powernorm':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'rdist':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'recipinvgauss':
            params.mu = parseFloat(document.getElementById('mu').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'rice':
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'reciprocal':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'semicircular':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'skewnorm':
            params.a = parseFloat(document.getElementById('a').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'trapezoid':
            params.c = parseFloat(document.getElementById('c').value);
            params.d = parseFloat(document.getElementById('d').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'triang':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'truncexpon':
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'truncnorm':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'tukeylambda':
            params.lam = parseFloat(document.getElementById('lam').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'arcsine':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'betaprime':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'burr12':
            params.c = parseFloat(document.getElementById('c').value);
            params.d = parseFloat(document.getElementById('d').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'dagum':
            params.p = parseFloat(document.getElementById('p').value);
            params.a = parseFloat(document.getElementById('a').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'fisherz':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'frechet_r':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'kumaraswamy':
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'logcauchy':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'loglogistic':
            params.c = parseFloat(document.getElementById('c').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'powerfunction':
            params.a = parseFloat(document.getElementById('a').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'uniform':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'vonmises':
            params.kappa = parseFloat(document.getElementById('kappa').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'wigner':
            params.loc = parseFloat(document.getElementById('loc').value);
            params.scale = parseFloat(document.getElementById('scale').value);
            break;
        case 'skellam':
            params.mu1 = parseFloat(document.getElementById('mu1').value);
            params.mu2 = parseFloat(document.getElementById('mu2').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            break;
        case 'yulesimon':
            params.alpha = parseFloat(document.getElementById('alpha').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            break;
        case 'zeta':
            params.a = parseFloat(document.getElementById('a').value);
            break;
        case 'multinomial':
            params.n = parseInt(document.getElementById('n').value);
            params.p = document.getElementById('p').value.split(',').map(Number);
            break;
        case 'multivariate_normal':
            params.mean = document.getElementById('mean').value.split(',').map(Number);
            params.cov = document.getElementById('cov').value.split(',').map(Number);
            break;
        case 'multivariate_t':
            params.loc = document.getElementById('loc').value.split(',').map(Number);
            params.shape = document.getElementById('shape').value.split(',').map(Number);
            params.df = parseFloat(document.getElementById('df').value);
            break;
        case 'dirichlet':
            params.alpha = document.getElementById('alpha').value.split(',').map(Number);
            break;
        case 'wishart':
            params.df = parseInt(document.getElementById('df').value);
            params.scale = document.getElementById('scale').value.split(',').map(Number);
            break;
        case 'invwishart':
            params.df = parseInt(document.getElementById('df').value);
            params.scale = document.getElementById('scale').value.split(',').map(Number);
            break;
        case 'betabinom':
            params.n = parseInt(document.getElementById('n').value);
            params.a = parseFloat(document.getElementById('a').value);
            params.b = parseFloat(document.getElementById('b').value);
            params.loc = parseFloat(document.getElementById('loc').value);
            break;
        case 'nhypergeom':
            params.M = parseInt(document.getElementById('M').value);
            params.n = parseInt(document.getElementById('n').value);
            params.r = parseInt(document.getElementById('r').value);
            break;
        case 'polya':
            params.alpha = document.getElementById('alpha').value.split(',').map(Number);
            break;
        case 'zipf':
            params.a = parseFloat(document.getElementById('a').value);
            break;
    }

    fetch(`/api/distribution/${distribution}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(params)
    })
    .then(response => response.json())
    .then(data => {
        let plotData, layout;
        if (['multivariate_normal', 'multivariate_t', 'dirichlet', 'wishart', 'invwishart'].includes(distribution)) {
            plotData = [{
                x: data.x,
                y: data.y,
                z: data.z,
                type: 'scatter3d',
                mode: 'markers',
                marker: {
                    size: 2,
                    color: data.z,
                    colorscale: 'Viridis'
                }
            }];
            layout = {
                title: `${distribution.charAt(0).toUpperCase() + distribution.slice(1)} Distribution`,
                scene: {
                    xaxis: {title: 'X'},
                    yaxis: {title: 'Y'},
                    zaxis: {title: 'Probability Density'}
                }
            };
        } else {
            plotData = [{
                x: data.x,
                y: data.y,
                type: 'scatter',
                mode: 'lines',
                line: {color: 'blue'}
            }];
            layout = {
                title: `${distribution.charAt(0).toUpperCase() + distribution.slice(1)} Distribution`,
                xaxis: {title: 'X'},
                yaxis: {title: 'Probability Density'}
            };
        }
        Plotly.newPlot('plot', plotData, layout);
    })
    .catch(error => console.error('Error updating plot:', error));
}