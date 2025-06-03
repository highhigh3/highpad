from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class NotebookForm(FlaskForm):
    title = StringField("Title", validators = [DataRequired(), Length(min=5, max=100, message="Title must be between 5 and 100 characters")])
