def Check_instances_up(get_response):
    def middleware(request):
        pass
        response = get_response(request)
        return response
    return middleware
