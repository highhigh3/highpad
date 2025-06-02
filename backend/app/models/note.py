from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    notebook_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("notebooks.id")),
        nullable=False
    )
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        nullable=False)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, 
                           onupdate=datetime.utcnow)

    # one-to-many relationships
    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")

    def to_dict(self):
        return {
            "id": self.id,
            "notebook_id": self.notebook_id,
            "user_id": self.user_id,
            "title": self.title,
            "content": self.content
        }
