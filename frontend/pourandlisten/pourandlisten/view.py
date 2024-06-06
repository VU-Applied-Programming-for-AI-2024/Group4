# from django.http import HttpResponse
from django.shortcuts import render

#Create view of home page
def homepage(request):
    # return HttpResponse("Hello World! I'm alive!")
    return render(request, 'index.html')

#create view of about page
def login(request):
    # return HttpResponse("This is the about page")
    return render(request, 'loginpage.html')

#create view of about page
def register(request):
    # return HttpResponse("This is the about page")
    return render(request, 'registerpage.html')

def game(request):
    # return HttpResponse("This is the about page")
    return render(request, 'gamepage.html')

def empty(request):
    # return HttpResponse("This is the about page")
    return render(request, 'emtpyPage.html')