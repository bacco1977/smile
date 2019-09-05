from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo


class UploadForm(FlaskForm):
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    date_of_birth = StringField('DateOfBirth',
                        validators=[DataRequired(), Email()])
    registration_date = StringField('RegistrationDate',
                        validators=[DataRequired(), Email()])
    gender = StringField('Gender',
                        validators=[DataRequired(), Email()])
    pps = StringField('PPS',
                        validators=[DataRequired(), Email()])
    gaurdian = StringField('Gaurdian',
                        validators=[DataRequired(), Email()])
    submit = SubmitField('Sign Up')