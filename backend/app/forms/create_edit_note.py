from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length, Optional

class NoteForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(message="Title is required."), Length(min=1, max=100, message="Title must be between 1 and 100 characters.")])
    content = TextAreaField("Content", validators=[Optional(),Length(max=1000, message="Content cannot exceed 1000 characters.")])
