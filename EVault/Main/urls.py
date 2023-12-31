from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.login_user, name="login"),
    path("logout/", views.logout_user, name="logout"),
    path("registration/", views.registration_user, name="registration"),
    path("additionalinfo/", views.additionalinfo, name="additionalinfo"),
    path("additional_Info/", views.additionalInfo, name="additionalInfo"),
    path("otp", views.otp_code, name="otp"),
    path('combined-detail', views.CombinedAPIView.as_view(), name='combined-detail-api'),
    # path('user-detail/<str:username>/', views.user_detail_view, name='user-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
