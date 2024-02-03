class CustomHeaderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Ваш код, который выполняется перед обработкой запроса

        response = self.get_response(request)

        # Ваш код, который выполняется после обработки запроса
        response['Expires'] = "Sat, 03 Aug 2013 00:00:00 GMT"
        response['Last-Modified'] = " . gmdate( 'D, d M Y H:i:s') . ' GMT"
        response['Cache-Control'] = "no-store, no-cache, must-revalidate"
        response['Cache-Control'] = "post-check=0, pre-check=0', false"
        response['Pragma'] = "no-cache"

        return response
