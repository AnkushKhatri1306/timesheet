from .models import *
from .serializers import *
from userBackend.utility import *
from calendar import monthrange
from datetime import datetime, date
from django.db.models import Sum



def save_user_detail(request):
    success_status = 'error'
    msg = 'Error in saving user detail'
    try:
        post_data = request.data
        if post_data:
            if 'id' in post_data:
                user_obj = UserProfile.objects.get(id=post_data.get('id'))
            else:
                user_obj = UserProfile()
            user_obj.first_name = post_data.get('first_name')
            user_obj.last_name = post_data.get('last_name')
            user_obj.email = post_data.get('email')
            user_obj.phone = post_data.get('phone')
            user_obj.save()
            success_status = 'success'
            msg = 'success in saving user detail'
    except Exception as e:
        exception_detail()
    return {'status': success_status, 'msg': msg}


def get_user_list_data(request):
    success_status = 'error'
    msg = 'Error in getting user list'
    data = {}
    try:
        obj = UserProfile.objects.filter()
        serializer = UserProfileListSerializer(obj, many=True)
        data = serializer.data
        success_status = 'success'
        msg = 'Success in getting user list.'
    except Exception as e:
        exception_detail()
    return {'status': success_status, 'msg': msg, 'data': data}


def get_days_list_data(request):
    success_status = 'error'
    msg = 'Error in getting days list'
    data = {}
    try:
        req_date = request.GET.get('month')
        current_time = datetime.now()
        year = current_time.year
        month = current_time.month
        if req_date and req_date != 'null':
            year = int(req_date[:4])
            month = int(req_date[5:7])
        days = monthrange(year, month)[1]
        obj = TimeSheet.objects.filter(date__month=month, date__year=year).order_by('date')
        if not obj:
            create_list = []
            for i in range(days):
                time_obj = TimeSheet()
                time_obj.date = date(year, month, i+1)
                create_list.append(time_obj)
            if create_list:
                TimeSheet.objects.bulk_create(create_list)
            obj = TimeSheet.objects.filter(date__month=month, date__year=year).order_by('date')
        serializer = TimeSheetListSerializer(obj, many=True)
        data = serializer.data
        success_status = 'success'
        msg = 'Success in getting days list.'
    except Exception as e:
        exception_detail()
    return {'status': success_status, 'msg': msg, 'data': data}


def save_user_timesheet_data(request):
    success_status = 'error'
    msg = 'Error in saving user detail'
    try:
        post_data = request.data
        if post_data:
            if 'id' in post_data:
                obj = TimeSheet.objects.get(id=post_data.get('id'))
                obj.entry_time = post_data.get('entry_time')
                obj.exit_time = post_data.get('exit_time')
                obj.diff = None
                if post_data.get('entry_time') and post_data.get('exit_time'):
                    diff = datetime.strptime(post_data.get('entry_time')[:5], '%H:%M') - \
                               datetime.strptime(post_data.get('exit_time')[:5], '%H:%M')
                    total_minutes = (86400 - diff.seconds)/60
                    obj.diff = total_minutes - 555
                obj.save()
                success_status = 'success'
                msg = 'success in saving user detail'
    except Exception as e:
        exception_detail()
    return {'status': success_status, 'msg': msg}


def get_overall_time_diff_data(request):
    success_status = 'error'
    msg = 'Error in getting time difference.'
    data = {}
    try:
        req_date = request.GET.get('month')
        curr_date = date.today()
        year = curr_date.year
        month = curr_date.month
        if req_date and req_date != 'null':
            year = int(req_date[:4])
            month = int(req_date[5:7])
        data = TimeSheet.objects.filter(date__month=month, date__year=year).aggregate(total_diff=Sum('diff'))
        if not data.get('total_diff'):
            data['total_diff'] = 0
        success_status = 'success'
        msg = 'Success in getting time difference.'
    except Exception as e:
        exception_detail()
    return {'status': success_status, 'msg': msg, 'data': data}
