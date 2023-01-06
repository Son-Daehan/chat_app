# chat/consumers.py
import json
import redis
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

redis_instance = redis.StrictRedis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0
)
# from django.http import JsonResponse


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name
        print(self.room_group_name)
        print(self.room_name)

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        await self.send(
            text_data=json.dumps(
                {
                    "type": "connection_established",
                    "user": "Chat Bot",
                    "message": "You are now connected!",
                }
            )
        )

        # return JsonResponse({'success': True})

    async def disconnect(self, close_code):
        # Leave room group
        # Discards the connection on Redis
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        message_received_json = json.loads(text_data)

        user = message_received_json["user"]
        message = message_received_json["message"]
        room = message_received_json["room_name"]

        # Saves the message in Redis as a List
        redis_instance.lpush(room, json.dumps({"user": user, "message": message}))

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "user": user, "message": message},
        )

    # Receive message from room group
    async def chat_message(self, event):
        print(event)
        user = event["user"]
        message = event["message"]

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps(
                {"type": "chat_message", "user": user, "message": message}
            )
        )
