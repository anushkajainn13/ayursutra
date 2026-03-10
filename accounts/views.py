
from django.http import JsonResponse
from .models import User
import json
import django.views.decorators.csrf as csrf
import django.contrib.auth.hashers as hashers

@csrf.csrf_exempt
def signup(request):
    if request.method == 'POST':
        data =json.loads(request.body)
        user= User.objects.create(
            full_name=data["fullName"],
            email=data["email"],        
            password=hashers.make_password(data["password"]),
            role=data["role"],
            location=data["location"]        )
        return JsonResponse({"message": "User created successfully"}, status=201)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@csrf.csrf_exempt
def login(request):
    if request.method =='POST':
        data=json.loads(request.body)
        try:
            user=User.objects.get(email=data["email"])
            if hashers.check_password(data["password"],user.password):
                return JsonResponse({
                    "message":"Login successful",
                    "user":{
                        "full_name":user.full_name,
                        "email":user.email,
                        "role":user.role,
                        "location":user.location
                    }
                })
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=401)

        except User.DoesNotExist:
            return JsonResponse({"error": "Invalid credentials"}, status=401)

    return JsonResponse({"error": "Invalid request"}, status=400)
                
