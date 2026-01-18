from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

# The client gets the API key from the environment variable `GEMINI_API_KEY`.

def request_key_points(script):
    client = genai.Client()

    prompt="""Take the following script and identify the key points of the script. 
    Return a list of key points formatted as a javascript array in this exact format with no additional text: 
    ["key point 1", "key point 2", "key point 3"]
    Here is the script: """ + script

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    summary = response.text
    print(summary)
    return summary


def compare_points_to_transcript(key_points, transcript):
    client = genai.Client()

    prompt="""Read the following transcription. Now, filter the following list of key points, keeping only the items that were covered in the transcription. Return the list in the exact same format with no additional words."""

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=prompt
    )
    summary = response.text
    print(summary)
    return summary

request_key_points("""Hello everyone!

Today, I want to talk briefly about the wonderful world of dogs. Dogs come in all shapes and sizes, each with their own unique traits and personalities. For example, you have the small and lively Chihuahua, full of energy and always ready to protect their owner. Then there’s the loyal and gentle Golden Retriever, known for being great family pets and super friendly.
On the other hand, the German Shepherd is famous for its intelligence and is often trained for police or rescue work. And don’t forget the tiny but mighty Dachshund, with their long bodies and playful nature.
No matter the breed, dogs bring joy, companionship, and love to our lives. So whether you prefer a big fluffy buddy or a small energetic pal, there’s a perfect dog out there for everyone!
Thank you!""")

