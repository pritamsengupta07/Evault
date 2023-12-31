from django.contrib.auth.models import User
from django.db import models


class MoreInfo(models.Model):
    user = models.CharField(max_length=50, primary_key=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    photo = models.ImageField(upload_to="user_photos/")
    aadhar = models.CharField(max_length=12)
    aadhar_photo = models.ImageField(upload_to="aadhar_photos/")
    dob = models.DateField()  # Add the DOB field
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    license_id = models.CharField(max_length=20, null=True, blank=True)
    enrollment_date = models.DateField(null=True, blank=True)
    license_photo = models.ImageField(
        upload_to="license_photos/", null=True, blank=True
    )

    def __str__(self):
            return (f"{self.user}")


class Validation_Data(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    aadhar = models.CharField(max_length=12)
    dob = models.DateField()
    license_id = models.CharField(max_length=20, null=True, blank=True)
    enrollment_date = models.DateField(null=True, blank=True)


class Supreme_court(models.Model):
    judge_id = models.CharField(max_length=50)
    lawyer_id = models.CharField(max_length =50)
    clerk_id = models.CharField(max_length=50)
    client_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
