from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Notebook, User
from app.forms import NotebookForm

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
 
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        notebook = Notebook(
            title=form.data["title"],
            user_id=current_user.id
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict(), 201

    return form.errors, 400


# Update a Notebook Route
@notebook_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):

    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        notebook = Notebook.query.get(id)

        notebook.title = form.data['title']

        db.session.commit()
        return notebook.to_dict(), 200

    return form.errors, 400


# Delete a Notebook Route
@notebook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    pass