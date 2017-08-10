from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer

class UserView(APIView):

    def get(self, request, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)