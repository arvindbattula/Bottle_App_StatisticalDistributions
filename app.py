import os
from bottle import Bottle, run, request, response, static_file, hook
import json
from auth import authenticate_user, generate_token, verify_token
from distributions import get_distribution_data

app = Bottle()

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.route('/api/login', method=['OPTIONS', 'POST'])
def login():
    if request.method == 'OPTIONS':
        return {}
    
    try:
        data = request.json
        if not data:
            print("Empty or malformed JSON data")
            response.status = 400
            return json.dumps({'error': 'Invalid request format'})

        username = data.get('username')
        password = data.get('password')
        print(f"Username: {username}, Password: {password}")

        if authenticate_user(username, password):
            token = generate_token(username)
            print(f"Authentication successful, token generated: {token}")
            return json.dumps({'token': token})
        else:
            print("Authentication failed")
            response.status = 401
            return json.dumps({'error': 'Invalid credentials'})
    except Exception as e:
        print(f"Error processing login request: {str(e)}")
        response.status = 400
        return json.dumps({'error': 'Invalid request format'})

@app.route('/', method='GET')
def index():
    print("Index route called")
    print(f"Current working directory: {os.getcwd()}")
    print(f"Contents of static directory: {os.listdir('./static')}")
    return static_file('index.html', root='./static')

@app.route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root='./static')

@app.route('/api/distribution/<distribution>', method=['OPTIONS', 'POST'])
def get_distribution(distribution):
    if request.method == 'OPTIONS':
        return {}
    token = request.headers.get('Authorization', '').split('Bearer ')[-1]
    if not verify_token(token):
        response.status = 401
        return json.dumps({'error': 'Invalid token'})
    
    params = request.json
    data = get_distribution_data(distribution, params)
    return json.dumps(data)

if __name__ == '__main__':
    print(f"Starting server. Working directory: {os.getcwd()}")
    print(f"Contents of current directory: {os.listdir('.')}")
    run(app, host='0.0.0.0', port=8080, debug=True)