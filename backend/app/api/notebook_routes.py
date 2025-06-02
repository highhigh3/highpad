from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Notebook, User
# from app.forms import 

notebook_routes = Blueprint('notebooks', __name__)

# Get All Notebooks Route
@notebook_routes.route('/')
@login_required
def get_all_notebooks():
    notebooks = Notebook.query.filter_by(user_id=current_user.id).all()
    return [notebook.to_dict() for notebook in notebooks]


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