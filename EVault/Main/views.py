# Import necessary modules
import email
import random
from datetime import datetime, timedelta
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from .models import MoreInfo,Validation_Data
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import MoreInfo_Serial, User_Serial

# Global variables
otp = ""
username = ""
otp_timestamp = None

# Function to generate OTP
def generate_otp():
    global otp, otp_timestamp
    otp_code = "".join([str(random.randint(0, 9)) for _ in range(6)])
    otp_timestamp = datetime.now()
    return otp_code

# Function to validate OTP
def validate_otp(user_input, otpl):
    global otp_timestamp
    time_limit = timedelta(minutes=1, seconds=30)
    
    if datetime.now() > otp_timestamp + time_limit:
        return False

    return user_input == otpl

# View to redirect to the homepage
def index(request):
    return redirect("http://localhost:3000/")

# View for user login
def login_user(request):
    if request.method == "POST":
        un = request.POST.get("username")
        pw = request.POST.get("password")
        group = request.POST.get("group")

        if un and pw:
            user = authenticate(request, username=un, password=pw)

            if user is not None:
                login(request, user)
                global username
                username = un

                # Redirect based on the selected group
                if group == "Judge":
                    return redirect("http://localhost:3000/Judge_Dashboard")
                else:
                    return redirect("http://localhost:3000/dashboard")  # Adjust the URL as needed

            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Please provide both username and password.")

    return render(request, "login.html")

# View to log out the user
def logout_user(request):
    logout(request)
    return redirect("index")

# View for user registration
def registration_user(request):
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        email = request.POST.get("email")
        username = request.POST.get("username")
        password = request.POST.get("password")
        password1 = request.POST.get("password1")
        group_name = request.POST.get("group")

        if password != password1:
            messages.error(request, "Passwords do not match.")
            return redirect("registration")

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("registration")

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return redirect("registration")

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        group = Group.objects.get(name=group_name)
        user.groups.add(group)

        user.save()
        if user:
            if group_name in ["Lawyer", "Judge"]:
                return redirect("additionalInfo")
            else:
                return redirect("additionalinfo")
    else:
        return render(request, "registration.html")

# @login_required(login_url="login")
def additionalinfo(request):
    if request.method == "POST":
        # Retrieve form data
        username = request.POST.get("username")
        photo = request.FILES.get("photo")
        aadhar = request.POST.get("aadhar")
        aadhar_photo = request.FILES.get("aadhar_photo")
        phone = request.POST.get("phone")
        dob = request.POST.get("dob")
        city = request.POST.get("city")
        state = request.POST.get("state")
        address = request.POST.get("address")

        # Check if Validation_Data with the provided aadhar exists
        try:
            vd = Validation_Data.objects.get(aadhar=aadhar)
        except Validation_Data.DoesNotExist:
            # Redirect to "registration" if Validation_Data does not exist
            return redirect("registration")

        # If validation is successful, save data to MoreInfo model
        mi = MoreInfo(
            user=username,
            photo=photo,
            aadhar=aadhar,
            aadhar_photo=aadhar_photo,
            dob=dob,
            phone=phone,
            city=city,
            state=state,
            address=address,
        )
        mi.save()
        user = User.objects.get(username=username)

        # Generate and send OTP via email
        global otp
        otp = generate_otp()
        print(otp)
        subject = "OTP CODE"
        message = f"Your OTP is: {otp}"
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]  # Update with the recipient email
        try:
            send_mail(
                subject,
                message,
                email_from,
                recipient_list,
                fail_silently=False,
            )
            print("Email sent successfully.")

            if send_mail:
                return redirect("otp")
        except Exception as e:
            print(f"An error occurred: {e}")
            return redirect("registration")

    return render(request, "next_form.html")


# @login_required(login_url="login")
def additionalInfo(request):
    if request.method == "POST":
        username = request.POST.get("username")
        photo = request.FILES.get("photo")
        aadhar = request.POST.get("aadhar")
        aadhar_photo = request.FILES.get("aadhar_photo")
        dob = request.POST.get("dob")
        city = request.POST.get("city")
        state = request.POST.get("state")
        license_id = request.POST.get("license_id")
        license_photo = request.FILES.get("license_photo")
        phone = request.POST.get("phone")
        enrollment_date = request.POST.get("enrollment_date")
        address = request.POST.get("address")

        if username:
            print(f"Username: {username}")
            # ... (print other form data)

            # Use try-except to handle Validation_Data.DoesNotExist exception
            try:
                # Check if Validation_Data with the provided license_id exists
                Validation_Data.objects.get(license_id=license_id)
            except Validation_Data.DoesNotExist:
                # Handle the case when Validation_Data does not exist
                return redirect("registration")

            # Save data to MoreInfo model
            mi = MoreInfo.objects.create(
                user=username,
                photo=photo,
                aadhar=aadhar,
                aadhar_photo=aadhar_photo,
                dob=dob,
                phone=phone,
                city=city,
                state=state,
                license_id=license_id,
                license_photo=license_photo,
                enrollment_date=enrollment_date,
                address=address,
            )

            # Generate and send OTP via email
            global otp
            user = User.objects.get(username=username)
            otp = generate_otp()
            print(otp)
            subject = "OTP CODE"
            message = f"Your OTP is: {otp}"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [
                user.email
            ]  # Update with the recipient email
            try:
                send_mail(
                    subject,
                    message,
                    email_from,
                    recipient_list,
                    fail_silently=False,
                )
                print("Email sent successfully.")
                return redirect("otp")
            except Exception as e:
                print(f"An error occurred: {e}")
                return redirect("registration")

    return render(request, "Next_Form_L.html")

# View for OTP code verification
def otp_code(request):
    if request.method == "POST":
        uiotp = request.POST.get("otp")
        global otp
        print(f"user:{uiotp}")
        print(f"in:{otp}")
        user_input = uiotp
        if validate_otp(user_input, otp):
            return redirect("index")
        else:
            return redirect("registration")

    return render(request, "otp.html")

# API view to get and post user and more info data
class CombinedAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            global username
            user_instance = User.objects.get(username=username)
            more_info_instance = MoreInfo.objects.get(user=username)
        except (User.DoesNotExist, MoreInfo.DoesNotExist):
            return Response(
                {"error": "Details not found"}, status=status.HTTP_404_NOT_FOUND
            )

        more_info_serializer = MoreInfo_Serial(more_info_instance)
        user_serializer = User_Serial(user_instance)

        return Response(
            {"more_info": more_info_serializer.data, "user": user_serializer.data}
        )

    def post(self, request, *args, **kwargs):
        return Response({"message": "POST request handled"}, status=status.HTTP_200_OK)
