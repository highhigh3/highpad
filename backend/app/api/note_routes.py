from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Note model class name is below
from app.models import db
# import the note form class 
# from app.forms import 

product_routes = Blueprint('notes', __name__)

# Get All Notes Route
@product_routes.route('/')
def get_all_notes():
    pass


# Create a Note Route
@product_routes.route('/create', methods=['POST'])
@login_required
def create_note():
    pass


# Update a Note Route
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    pass


# Delete a Note Route
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    pass