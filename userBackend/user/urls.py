from django.urls import path
from .views import *

urlpatterns = [
    path('save/', save_user_data),
    path('userlist/', get_user_list),
    path('dayslist/', get_days_list),
    path('save/timesheet/', save_user_timesheet),
    path('overall/timediff/', get_overall_time_diff),
]