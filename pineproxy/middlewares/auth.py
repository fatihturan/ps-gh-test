from django.shortcuts import redirect

def custom_auth_middleware(get_response):
    def middleware(request,*args, **kwargs):
        if request.user.is_anonymous:
            return redirect('login')
        response = get_response(request)
        return response
    return middleware