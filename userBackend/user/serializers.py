from rest_framework import serializers
from .models import *
from datetime import datetime

class UserProfileListSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'last_name', 'email', 'phone')


class TimeSheetListSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = TimeSheet
        fields = ('id', 'entry_time', 'exit_time', 'date', 'diff', 'type')

    def get_type(self, obj):
        try:
            name = 'Default'
            if obj.date:
                if obj.date.weekday() > 4:
                    name = 'Weekend'
            return name
        except Exception as e:
            print(e.args)
            return 'Default'