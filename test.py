import pytest
import json
import jwt
import hashlib
from bottle import Bottle, response, request
import os
from datetime import datetime, timedelta

# Import your application modules
from auth import authenticate_user, generate_token, verify_token, require_auth, require_role
from distributions import get_distribution_data
import app

# Mock data for testing
TEST_USERS = {
    'testuser': {
        'password_hash': hashlib.sha256('testpass'.encode()).hexdigest(),
        'role': 'user'
    },
    'testadmin': {
        'password_hash': hashlib.sha256('adminpass'.encode()).hexdigest(),
        'role': 'admin'
    }
}

@pytest.fixture
def test_app():
    """Create a test instance of the Bottle app."""
    return app.app

@pytest.fixture
def auth_token():
    """Generate a valid auth token for testing."""
    payload = {
        'username': 'testuser',
        'role': 'user',
        'exp': datetime.utcnow() + timedelta(hours=1),
        'iat': datetime.utcnow()
    }
    secret_key = os.environ.get('JWT_SECRET_KEY', 'your_secret_key_here')
    return jwt.encode(payload, secret_key, algorithm='HS256')

@pytest.fixture
def admin_token():
    """Generate a valid admin token for testing."""
    payload = {
        'username': 'testadmin',
        'role': 'admin',
        'exp': datetime.utcnow() + timedelta(hours=1),
        'iat': datetime.utcnow()
    }
    secret_key = os.environ.get('JWT_SECRET_KEY', 'your_secret_key_here')
    return jwt.encode(payload, secret_key, algorithm='HS256')

# Authentication Tests
class TestAuthentication:
    def test_authenticate_user_valid(self, monkeypatch):
        """Test user authentication with valid credentials."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        assert authenticate_user('testuser', 'testpass') is True
        
    def test_authenticate_user_invalid(self, monkeypatch):
        """Test user authentication with invalid credentials."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        assert authenticate_user('testuser', 'wrongpass') is False
        assert authenticate_user('nonexistent', 'anypass') is False
        
    def test_generate_token(self, monkeypatch):
        """Test token generation."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        token = generate_token('testuser')
        assert token is not None
        
        # Verify the token
        secret_key = os.environ.get('JWT_SECRET_KEY', 'your_secret_key_here')
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        assert payload['username'] == 'testuser'
        assert payload['role'] == 'user'
        
    def test_verify_token_valid(self, auth_token):
        """Test token verification with a valid token."""
        username = verify_token(auth_token)
        assert username == 'testuser'
        
    def test_verify_token_invalid(self):
        """Test token verification with invalid tokens."""
        assert verify_token('invalid_token') is None
        assert verify_token('') is None
        
        # Test with expired token
        payload = {
            'username': 'testuser',
            'role': 'user',
            'exp': datetime.utcnow() - timedelta(hours=1),
            'iat': datetime.utcnow() - timedelta(hours=2)
        }
        secret_key = os.environ.get('JWT_SECRET_KEY', 'your_secret_key_here')
        expired_token = jwt.encode(payload, secret_key, algorithm='HS256')
        assert verify_token(expired_token) is None

# API Endpoint Tests
class TestAPIEndpoints:
    def test_login_valid(self, test_app, monkeypatch):
        """Test login endpoint with valid credentials."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        
        body = {'username': 'testuser', 'password': 'testpass'}
        headers = {'Content-Type': 'application/json'}
        response = test_app.post('/api/login', json=body, headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.body)
        assert 'token' in data
        
    def test_login_invalid(self, test_app, monkeypatch):
        """Test login endpoint with invalid credentials."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        
        body = {'username': 'testuser', 'password': 'wrongpass'}
        headers = {'Content-Type': 'application/json'}
        response = test_app.post('/api/login', json=body, headers=headers)
        
        assert response.status_code == 401
        data = json.loads(response.body)
        assert 'error' in data
        
    def test_distribution_endpoint_authenticated(self, test_app, auth_token):
        """Test distribution endpoint with valid authentication."""
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {auth_token}'
        }
        body = {'mean': 0, 'std': 1}
        response = test_app.post('/api/distribution/normal', json=body, headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.body)
        assert 'x' in data
        assert 'y' in data
        
    def test_distribution_endpoint_unauthenticated(self, test_app):
        """Test distribution endpoint without authentication."""
        headers = {'Content-Type': 'application/json'}
        body = {'mean': 0, 'std': 1}
        response = test_app.post('/api/distribution/normal', json=body, headers=headers)
        
        assert response.status_code == 401
        data = json.loads(response.body)
        assert 'error' in data

# Distribution Calculation Tests
class TestDistributions:
    def test_normal_distribution(self):
        """Test normal distribution calculation."""
        params = {'mean': 0, 'std': 1}
        result = get_distribution_data('normal', params)
        
        assert 'x' in result
        assert 'y' in result
        assert len(result['x']) == len(result['y'])
        assert len(result['x']) > 0
        
    def test_exponential_distribution(self):
        """Test exponential distribution calculation."""
        params = {'lambda': 1.5}
        result = get_distribution_data('exponential', params)
        
        assert 'x' in result
        assert 'y' in result
        assert len(result['x']) == len(result['y'])
        assert len(result['x']) > 0
        
    def test_invalid_distribution(self):
        """Test handling of invalid distribution type."""
        params = {'param': 1}
        with pytest.raises(ValueError):
            get_distribution_data('invalid_distribution', params)
            
    def test_invalid_parameters(self):
        """Test handling of invalid parameters."""
        # Missing required parameter
        params = {}
        with pytest.raises(KeyError):
            get_distribution_data('normal', params)

# Role-Based Authorization Tests
class TestRoleBasedAuth:
    def test_require_role_admin(self, test_app, admin_token):
        """Test role-based authorization with admin role."""
        # Create a test route with admin role requirement
        @test_app.route('/test/admin', method='GET')
        @require_role('admin')
        def admin_route():
            return {'success': True}
            
        headers = {'Authorization': f'Bearer {admin_token}'}
        response = test_app.get('/test/admin', headers=headers)
        
        assert response.status_code == 200
        data = json.loads(response.body)
        assert data['success'] is True
        
    def test_require_role_insufficient(self, test_app, auth_token):
        """Test role-based authorization with insufficient role."""
        # Create a test route with admin role requirement
        @test_app.route('/test/admin_only', method='GET')
        @require_role('admin')
        def admin_route():
            return {'success': True}
            
        headers = {'Authorization': f'Bearer {auth_token}'}  # User token, not admin
        response = test_app.get('/test/admin_only', headers=headers)
        
        assert response.status_code == 403
        data = json.loads(response.body)
        assert 'error' in data

# Integration Tests
class TestIntegration:
    def test_login_and_access_distribution(self, test_app, monkeypatch):
        """Test full flow: login and access distribution data."""
        monkeypatch.setattr('auth.USERS', TEST_USERS)
        
        # Step 1: Login
        login_body = {'username': 'testuser', 'password': 'testpass'}
        login_headers = {'Content-Type': 'application/json'}
        login_response = test_app.post('/api/login', json=login_body, headers=login_headers)
        
        assert login_response.status_code == 200
        login_data = json.loads(login_response.body)
        token = login_data['token']
        
        # Step 2: Access distribution data
        dist_headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
        dist_body = {'mean': 0, 'std': 1}
        dist_response = test_app.post('/api/distribution/normal', json=dist_body, headers=dist_headers)
        
        assert dist_response.status_code == 200
        dist_data = json.loads(dist_response.body)
        assert 'x' in dist_data
        assert 'y' in dist_data