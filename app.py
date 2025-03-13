import os
import json
import logging
from bottle import Bottle, run, request, response, static_file, hook, HTTPError

from auth import authenticate_user, generate_token, verify_token
from distributions import get_distribution_data

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Bottle()

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, Authorization'

# Error handling
@app.error(404)
def error_404(error):
    return json.dumps({'error': 'Not found'})

@app.error(500)
def error_500(error):
    return json.dumps({'error': 'Internal server error'})

@app.route('/api/login', method=['OPTIONS', 'POST'])
def login():
    if request.method == 'OPTIONS':
        return {}
    
    try:
        data = request.json
        if not data:
            logger.warning("Empty or malformed JSON data")
            response.status = 400
            return json.dumps({'error': 'Invalid request format'})

        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            logger.warning("Missing username or password")
            response.status = 400
            return json.dumps({'error': 'Username and password are required'})
            
        logger.info(f"Login attempt for user: {username}")

        if authenticate_user(username, password):
            token = generate_token(username)
            logger.info(f"Authentication successful for user: {username}")
            return json.dumps({'token': token})
        else:
            logger.warning(f"Authentication failed for user: {username}")
            response.status = 401
            return json.dumps({'error': 'Invalid credentials'})
    except Exception as e:
        logger.error(f"Error processing login request: {str(e)}", exc_info=True)
        response.status = 500
        return json.dumps({'error': 'Server error occurred'})

@app.route('/', method='GET')
def index():
    logger.info("Serving index page")
    return static_file('index.html', root='./static')

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    logger.debug(f"Serving static file: {filepath}")
    return static_file(filepath, root='./static')

@app.route('/api/distribution/<distribution>', method=['OPTIONS', 'POST'])
def get_distribution(distribution):
    if request.method == 'OPTIONS':
        return {}
    
    try:
        # Authentication middleware
        token = request.headers.get('Authorization', '').split('Bearer ')[-1]
        if not verify_token(token):
            logger.warning(f"Invalid token provided for distribution: {distribution}")
            response.status = 401
            return json.dumps({'error': 'Invalid token'})
        
        params = request.json
        if not params:
            logger.warning(f"No parameters provided for distribution: {distribution}")
            response.status = 400
            return json.dumps({'error': 'Parameters are required'})
            
        logger.info(f"Fetching data for distribution: {distribution}")
        data = get_distribution_data(distribution, params)
        return json.dumps(data)
    except ValueError as e:
        logger.warning(f"Invalid parameters for distribution {distribution}: {str(e)}")
        response.status = 400
        return json.dumps({'error': str(e)})
    except Exception as e:
        logger.error(f"Error processing distribution request: {str(e)}", exc_info=True)
        response.status = 500
        return json.dumps({'error': 'Server error occurred'})

if __name__ == '__main__':
    logger.info(f"Starting server on 0.0.0.0:8080")
    run(app, host='0.0.0.0', port=8080, debug=True)