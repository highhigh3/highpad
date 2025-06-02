from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Notebook, User
# from app.forms import 

notebook_routes = Blueprint('notebooks', __name__)

# Get All Notebooks Route
@notebook_routes.route('/')
def get_all_notebooks():
    pass


# Create a Notebook Route
@notebook_routes.route('/create', methods=['POST'])
@login_required
def create_notebook():
    pass


# Update a Notebook Route
@notebook_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):
    pass


# Delete a Notebook Route
@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    pass