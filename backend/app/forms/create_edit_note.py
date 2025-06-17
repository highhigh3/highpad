from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required."), Length(min=5, max=100, message="Title must be between 5 and 100 characters.")])
    content = TextAreaField("Content", validators=[DataRequired(message="Content is required."), Length(min=2, max=1000, message="Content must be between 2 and 1000 characters.")])
