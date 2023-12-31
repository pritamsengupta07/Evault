# from twilio.rest import Client

# # Your Twilio account SID and auth token
# account_sid = "ACfcb4ff679b2ffe82d4d74b2c922701e0"
# auth_token = "57f5a28a4ea07e953a55893e96c348e1"

# # Create a Twilio client
# client = Client(account_sid, auth_token)

# # Your Twilio phone number (bought or verified in the Twilio console)
# twilio_phone_number = "+12025177522"

# # Recipient's phone number (must include the country code, e.g., +1 for the United States)
# recipient_phone_number = "+916209388601"

# # Message to be sent
# message_body = "Hello, this is a test message!"

# # Send the SMS
# message = client.messages.create(
#     body=message_body, from_=twilio_phone_number, to=recipient_phone_number
# )

# # Print the SID (a unique identifier for the message) to confirm the message has been sent
# print(f"Message SID: {message.sid}")
