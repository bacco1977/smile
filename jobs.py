import datetime
 
from database import DB
 
 
class Patient(object):
 
    def __init__(self, name, email, dob, register_date, gender, patientId, guardian, latest_score):
        self.name = name
        self.email = email
        self.dob = dob
        self.register_date = register_date
        self.gender = gender
        self.patientId = patientId
        self.guardian = guardian
        self.latest_score = latest_score
        self.created_at = datetime.datetime.utcnow()
 
    def insert(self):
        if not DB.find_one("patient", {"name": self.name}):
            DB.insert(collection='patient', data=self.json())
 
    def json(self):
        return {
            'name': self.name,
            'email': self.email,
            'dob': self.dob,
            'register_date': self.register_date,
            'gender': self.gender,
            'patientId': self.patientId,
            'guardian': self.guardian,
            'latest_score': self.latest_score,
            'created_at': self.created_at
        }