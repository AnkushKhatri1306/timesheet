from rest_framework import status
from rest_framework.response import Response
from userBackend.utility import *
from rest_framework.decorators import api_view
from .controllers import *

@api_view(['POST'])
def save_user_data(request):
    try:
        data = save_user_detail(request)
        return  Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        exception_detail()
        return  Response(data={'status': 'error'}, status=status.HTTP_300_MULTIPLE_CHOICES)


@api_view(['GET'])
def get_user_list(request):
    try:
        data = get_user_list_data(request)
        return  Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        exception_detail()
        return  Response(data={'status': 'error'}, status=status.HTTP_300_MULTIPLE_CHOICES)


@api_view(['GET'])
def get_days_list(request):
    try:
        data = get_days_list_data(request)
        return  Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        exception_detail()
        return  Response(data={'status': 'error'}, status=status.HTTP_300_MULTIPLE_CHOICES)


@api_view(['POST'])
def save_user_timesheet(request):
    try:
        data = save_user_timesheet_data(request)
        return  Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        exception_detail()
        return  Response(data={'status': 'error'}, status=status.HTTP_300_MULTIPLE_CHOICES)


@api_view(['GET'])
def get_overall_time_diff(request):
    try:
        data = get_overall_time_diff_data(request)
        return  Response(data=data, status=status.HTTP_200_OK)
    except Exception as e:
        exception_detail()
        return  Response(data={'status': 'error'}, status=status.HTTP_300_MULTIPLE_CHOICES)

