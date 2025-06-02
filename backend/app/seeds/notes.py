from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo notes, you can add other notes here if you want
def seed_notes():
    note1 = Note(notebook_id=1, user_id=1, title="Capstone", content="Make sure to complete my repo, db diagram, and kanban cards!")
    note2 = Note(notebook_id=1, user_id=2, title="Itinerary", content="Mod6, Complete the tasks assigned to me.")
    note3 = Note(notebook_id=2, user_id=3, title="How Can I Be Better?", content="1. Take initiative. 2. Communicate with my groupmates. 3. Be open to critism.")
    note4 = Note(notebook_id=2, user_id=1, title="Sprint Expectations", content="Complete the requirements. Functionality over looks.")
    note5 = Note(notebook_id=3, user_id=2, title="The Last of Us 2", content="When I have time, the playthrough will be completed.")
    note6 = Note(notebook_id=3, user_id=3, title="Fortnite", content="WE LIKE FORNITE!!!")

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
