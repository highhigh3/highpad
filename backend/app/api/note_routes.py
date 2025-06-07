from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Note
# import the note form class 
# from app.forms import 

note_routes = Blueprint('notes', __name__)

# Get All Notes Route
@note_routes.route('/notebooks/<int:notebook_id>/')
@login_required
def get_all_notes(notebook_id):
    notes = Note.query.filter_by(user_id=current_user.id, notebook_id=notebook_id).all()
    return [note.to_dict() for note in notes], 200


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