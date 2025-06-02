from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Note
# import the note form class 
# from app.forms import 

note_routes = Blueprint('notes', __name__)

# Get All Notes Route
@note_routes.route('/')
def get_all_notes():
    pass


# Create a Note Route
@note_routes.route('/create', methods=['POST'])
@login_required
def create_note():
    pass


# Update a Note Route
@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    pass


# Delete a Note Route
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    pass