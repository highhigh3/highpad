from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo notebooks, you can add other notebooks here if you want
def seed_notebooks():
    notebook1 = Notebook(user_id=1, title="AppAcademy Journey")
    notebook2 = Notebook(user_id=2, title="Project Reflections")
    notebook3 = Notebook(user_id=3, title="Video Games Journal")
    notebook4 = Notebook(user_id=1, title="Fitness Journey")
    notebook5 = Notebook(user_id=2, title="Filipino Recipes")
    notebook6 = Notebook(user_id=3, title="Secret Diary")

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)
    db.session.add(notebook5)
    db.session.add(notebook6)
    db.session.commit()


def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
