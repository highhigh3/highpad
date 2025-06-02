from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,
                    db.ForeignKey(add_prefix_for_prod("users.id")),
                    nullable=False)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)    

    # one-to-many relationships
    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title
        }
    
