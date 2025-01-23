import logging
import json
import time
import copy

# Use the json logger defined in settings
logger = logging.getLogger('json')

class RequestResponseLoggerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request) #Process request and get response

        #TODO- function to slim down and/or remove secrets from response data
        # data = getattr(self.response, 'data', None)
        # if len(str(data)) > 5000:
        #     return 'overMaxSize'
        # if isinstance(data, dict):
        #     return remove_secrets(data)
        # return data

        # <class 'django.http.response.HttpResponseRedirect'>
        # <class 'django.template.response.TemplateResponse'>
        data = None

        #Handle users that aren't logged in
        if request.user.is_authenticated:
            username = request.user.username
            user_id = request.user.id
        else:
            username, user_id = None, None

        #Gets the path as it shows up in our urls.py file
        full_path = request.get_full_path()
        url_template = None
        resolver_match = request.resolver_match
        if resolver_match:
            url_template = resolver_match.route
            if full_path == '/': url_template = full_path #this would come through as empty string otherwise

        logger.info(json.dumps({
            'request': {
                'full_path': full_path,
                'url': url_template, 
                'method': request.method,
                'query_params': request.GET.dict(),
                #'request_body': self.get_request_body(request),
                'ip_address': self.get_ip(request),
                #TODO- body? for posts?
                # 'id' #TODO- requestId?
            },
            'response': {
                'status_code': response.status_code,
                # 'data': data, #TODO- think this needs to be formatted based on type..
                'type': str(type(response)),
            },
            'execution_time': time.time() - start_time, #TODO- *1000?
            'user_id': user_id,
            'username': username,
        }))

        return response

    def get_request_body(self, request):
        body = copy.deepcopy(request.body)
        try:
            return json.loads(body) if body else None
        except json.JSONDecodeError:
            # Try to decode the bytes to a UTF-8 string if not json
            try: return body.decode('utf-8')
            except UnicodeDecodeError: return '<binary data>' # Fallback for non-text data
    
    # def get_response_content(self, response):
    #     try:
    #         return json.loads(response.content)
    #     except (json.JSONDecodeError, AttributeError):
    #         return response.content  # Return raw content if not JSON

    def get_ip(self, request):
        try:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get("REMOTE_ADDR")
        except:
            ip = ""
        return ip