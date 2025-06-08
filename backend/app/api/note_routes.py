from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Note
from app.forms import NoteForm

note_routes = Blueprint('notes', __name__)

# Get All Notes Route
@note_routes.route('/notebooks/<int:notebook_id>/')
@login_required
def get_all_notes(notebook_id):
    notes = Note.query.filter_by(user_id=current_user.id, notebook_id=notebook_id).all()
    return [note.to_dict() for note in notes], 200


# Create a Note Route
@note_routes.route('/notebooks/<int:notebook_id>/create', methods=['POST'])
@login_required
def create_note(notebook_id):
    form = NoteForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        new_note = Note(
            title=form.title.data,
            content=form.content.data,
            notebook_id=notebook_id,
            user_id=current_user.id
        )

        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict(), 201

    return form.errors, 400


@note_routes.route('/notebooks/<int:notebook_id>/notes/<int:id>/update', methods=['PUT'])
@login_required
def update_note(notebook_id, id):
    note = Note.query.get(id)

    form = NoteForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        note.title = form.title.data
        note.content = form.content.data

        db.session.commit()
        return note.to_dict(), 200

    return form.errors, 400


# Delete a Note Route
@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    pass