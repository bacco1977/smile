import datetime
 
from database import DB
 
 
class Patient(object):
 
    def __init__(self, name, dob, register_date, gender, pps, guardian):
        self.name = name
        self.dob = dob
        self.register_date = register_date
        self.gender = gender
        self.pps = pps
        self.guardian = guardian
        self.created_at = datetime.datetime.utcnow()
 
    def insert(self):
        if not DB.find_one("patient", {"name": self.name}):
            DB.insert(collection='patient', data=self.json())
 
    def json(self):
        return {
            'name': self.name,
            'dob': self.dob,
            'register_date': self.register_date,
            'gender': self.gender,
            'pps': self.pps,
            'guardian': self.guardian,
            'created_at': self.created_at
        }