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
                <label for="loc">loc:</label>
                <input type="number" id="loc" value="0" step="0.1">
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
            params.loc = parseFloat(document.getElementById('loc').value);
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
        Plotly.newPlot('plot', [{
            x: data.x,
            y: data.y,
            type: 'scatter',
            mode: 'lines',
            line: {color: 'blue'}
        }], {
            title: `${distribution.charAt(0).toUpperCase() + distribution.slice(1)} Distribution`,
            xaxis: {title: 'X'},
            yaxis: {title: 'Probability Density'}
        });
    })
    .catch(error => console.error('Error updating plot:', error));
}