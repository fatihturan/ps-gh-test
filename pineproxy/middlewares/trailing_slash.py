from django.http import HttpResponsePermanentRedirect
from django.urls import resolve, Resolver404

class EnforceTrailingSlashMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.get_full_path()
        has_trailing_slash = path.endswith('/')

        if not has_trailing_slash:
            # Check if the path WITHOUT the slash resolves
            try:
                resolve(path)  # Check if the URL works without the trailing slash
                return self.get_response(request)  # If it does, proceed without redirect
            except Resolver404:
                # If it doesn't resolve, try adding the trailing slash and see if that resolves
                path_with_slash = path + '/'
                try:
                    resolve(path_with_slash)
                    # If it resolves with the slash, redirect to the version with the slash
                    return HttpResponsePermanentRedirect(path_with_slash)
                except Resolver404:
                    pass  # If it doesn't resolve with the slash either, let the request proceed normally

        # If the URL already has a trailing slash or it doesn't need one
        return self.get_response(request)