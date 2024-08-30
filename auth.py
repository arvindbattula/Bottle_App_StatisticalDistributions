import hashlib
import jwt
import datetime

SECRET_KEY = 'your_secret_key_here'  # Replace with a secure secret key

def authenticate_user(username, password):
    # In a real application, you would check against a database
    # This is a simple example using hardcoded values
    users = {
        'admin': 'password123',
        'user': 'userpass'
    }
    
    if username in users and users[username] == password:
        return True
    return False

def generate_token(username):
    payload = {
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['username']
    except jwt.ExpiredSignatureError:
        return None  # Token has expired
    except jwt.InvalidTokenError:
        return None  # Invalid token
