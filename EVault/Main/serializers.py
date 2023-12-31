from rest_framework import serializers
from .models import MoreInfo, Supreme_court
from django.contrib.auth.models import User

from rest_framework import serializers
from .models import MoreInfo

class MoreInfo_Serial(serializers.ModelSerializer):
    class Meta:
        model = MoreInfo
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Update the fields to include the 'media/' prefix in the URLs
        ret['photo'] = f"/{ret['photo']}"
        ret['aadhar_photo'] = f"/{ret['aadhar_photo']}"
        ret['license_photo'] = f"/{ret['license_photo']}"
        return ret
    

class Supreme_court_Serial(serializers.ModelSerializer):
    class Meta:
       model = Supreme_court
       field ='__all__'


class User_Serial(serializers.ModelSerializer):
  class Meta:
    model=User
    fields = '__all__'

# class CombinedDetailSerial(serializers.Serializer):
#     more_info = MoreInfo_Serial()
#     user = User_Serial()