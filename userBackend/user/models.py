from django.db import models

# Create your models here.

class UserProfile(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = 'tbl_user_profile'


class TimeSheet(models.Model):
    date = models.DateField()
    entry_time = models.TimeField(blank=True, null=True)
    exit_time = models.TimeField(blank=True, null=True)
    diff = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        db_table = "tbl_time_sheet"