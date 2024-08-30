# Continuous Distribution Visualizer

This project is a web application that allows users to visualize and interact with various continuous probability distributions. It's built using Python's Bottle framework and provides an intuitive interface for exploring the properties of normal, uniform, exponential, and gamma distributions.

## Features

- Interactive selection of different continuous distributions (Normal, Exponential, Gamma, ...)
- Real-time parameter adjustment using input boxes
- Dynamic visualization of probability density functions

## Project Structure

The project is organized as follows:
- `app.py`: The main application file that sets up the Bottle server and handles routing.
- `static/`: A directory containing static files such as CSS, JavaScript, and images.
  - `styles.css`: The main stylesheet for the app.
  - `scripts.js`: JavaScript file for handling client-side interactions, such as updating the parameters and displaying the results dynamically.
  - `index.html`: The main file where users can select different continuous distributions and adjust the parameters using input boxes.
- `distributions.py`: A module containing functions to generate various continuous distributions based on user input.
- `Dockerfile`: The Dockerfile to build the Docker image for the Bottle app.
- `requirements.txt`: A file listing the Python dependencies required to run the app.

## Instructions

1. Build the Docker image by executing the following command in the terminal:
   ```sh
   docker build -t bottle-app .
   ```
2. Run the Docker container by executing the following command:
   ```sh
   docker run -p 8080:8080 bottle-app
   ```
3. Open a web browser and navigate to `http://localhost:8080` to access the app.
4. Select a continuous distribution from the dropdown menu.
5. Adjust the parameters using the sliders provided.
6. Click the "Generate" button to see the results of the selected distribution with the given parameters.

## Dependencies

The main dependencies for this project are:

- Python 3.9
- Bottle
- NumPy
- SciPy
- Plotly
- PyJWT

All dependencies are listed in the `requirements.txt` file and will be installed automatically when building the Docker image.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is open-source and available under the MIT License.
