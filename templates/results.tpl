<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Distribution Results</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        #plot {
            width: 100%;
            height: 400px;
        }
        .parameters {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Distribution Results</h1>
        <div id="plot"></div>
        <div class="parameters">
            <h2>Selected Parameters:</h2>
            <p>Distribution: {{ distribution }}</p>
            {% if distribution == 'normal' %}
                <p>Mean: {{ mean }}</p>
                <p>Standard Deviation: {{ std }}</p>
            {% elif distribution == 'uniform' %}
                <p>Minimum (a): {{ a }}</p>
                <p>Maximum (b): {{ b }}</p>
            {% elif distribution == 'exponential' %}
                <p>Rate (λ): {{ lambda }}</p>
            {% elif distribution == 'gamma' %}
                <p>Shape (k): {{ k }}</p>
                <p>Scale (θ): {{ theta }}</p>
            {% endif %}
        </div>
    </div>

    <script>
        // Plot data using Plotly.js
        const data = {{ plot_data|safe }};
        const layout = {
            title: '{{ distribution|capitalize }} Distribution',
            xaxis: { title: 'X' },
            yaxis: { title: 'Probability Density' }
        };
        Plotly.newPlot('plot', data, layout);
    </script>
</body>
</html>
