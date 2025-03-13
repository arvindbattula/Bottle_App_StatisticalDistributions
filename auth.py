import hashlib
import jwt
import datetime
import os
import logging
from functools import wraps
from bottle import request, response, HTTPError

# Set up logging
logger = logging.getLogger(__name__)

# Use environment variable or a secure method to store the secret key
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your_secret_key_here')

# In a real application, this would be a database model
# This is just for demonstration purposes
USERS = {
    'admin': {
        'password_hash': hashlib.sha256('password123'.encode()).hexdigest(),
        'role': 'admin'
    },
    'user': {
        'password_hash': hashlib.sha256('userpass'.encode()).hexdigest(),
        'role': 'user'
    }
}

def authenticate_user(username, password):
    """Authenticate a user by username and password.
    
    Args:
        username (str): The username to authenticate
        password (str): The plaintext password to verify
        
    Returns:
        bool: True if authentication successful, False otherwise
    """
    if username not in USERS:
        return False
        
    password_hash = hashlib.sha256(password.encode()).hexdigest()
    if USERS[username]['password_hash'] == password_hash:
        logger.info(f"User {username} authenticated successfully")
        return True
    
    logger.warning(f"Failed authentication attempt for user {username}")
    return False

def generate_token(username):
    """Generate a JWT token for the authenticated user.
    
    Args:
        username (str): The username to include in the token
        
    Returns:
        str: The JWT token
    """
    payload = {
        'username': username,
        'role': USERS.get(username, {}).get('role', 'user'),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token

def verify_token(token):
    """Verify a JWT token and return the username if valid.
    
    Args:
        token (str): The JWT token to verify
        
    Returns:
        str or None: The username if token is valid, None otherwise
    """
    if not token:
        return None
        
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        logger.debug(f"Token verified for user {payload['username']}")
        return payload['username']
    except jwt.ExpiredSignatureError:
        logger.warning("Expired token received")
        return None
    except jwt.InvalidTokenError:
        logger.warning("Invalid token received")
        return None

def require_auth(f):
    """Decorator to require authentication for a route.
    
    Args:
        f (function): The route function to decorate
        
    Returns:
        function: The decorated function
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization', '').split('Bearer ')[-1]
        username = verify_token(token)
        
        if not username:
            response.status = 401
            return {'error': 'Authentication required'}
            
        # Add the username to the request for use in the route
        request.username = username
        return f(*args, **kwargs)
    return decorated

def require_role(role):
    """Decorator to require a specific role for a route.
    
    Args:
        role (str): The required role
        
    Returns:
        function: The decorator function
    """
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization', '').split('Bearer ')[-1]
            
            try:
                payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                if payload.get('role') != role:
                    response.status = 403
                    return {'error': 'Insufficient permissions'}
                    
                request.username = payload['username']
                return f(*args, **kwargs)
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
                response.status = 401
                return {'error': 'Authentication required'}
                
        return decorated
    return decorator