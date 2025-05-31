from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Notebook model class name is below
from app.models import db
# import the notebook form class 
# from app.forms import 

product_routes = Blueprint('notebooks', __name__)

# Get All Notebooks Route
@product_routes.route('/')
def get_all_notebooks():
    pass


# Create a Notebook Route
@product_routes.route('/create', methods=['POST'])
@login_required
def create_notebook():
    pass


# Update a Notebook Route
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):
    pass


# Delete a Notebook Route
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    pass