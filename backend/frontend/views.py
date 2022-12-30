from django.http import HttpResponse

# Create your views here.
def index(request):

    homepage = open('static/index.html').read()

    return HttpResponse(homepage)
