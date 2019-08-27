import traceback

def exception_detail():
    try:
        print('exception -> ', traceback.format_exc())
    except Exception as e:
        print(e.args)
