from google import genai
from dotenv import load_dotenv
import os
import requests

load_dotenv()


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

def request_key_points(script):
    prompt = prompt = f"""
You are given a presentation script.

Task:
Identify the main key points of the script.

Definition of "key point":
- A key point is a main idea or takeaway the speaker is trying to communicate.
- Key points should be high-level and concise.
- Do NOT include examples, filler details, or repeated ideas.

Rules:
- Extract roughly 1 key point for every 30 words
- if there is less than 30 words then extract 1 main point 
- if there is one paragraph (5-10 sentences) extract 3 main points
- if it is a short essay (3-5 paragraphs) extract around 1-3 points per paragraph
- if it has more than 5 paragraphs, extract 1 or 2 points per paragraph
- Keep the wording clear and short (one sentence or phrase per point).
- Return ONLY a valid JSON array of strings.
- Do NOT include explanations, comments, or extra text.

Output format (must match exactly):
["key point 1", "key point 2", "key point 3"]

Script:
{script}
"""


    data = {
        "model": "google/gemini-3-flash-preview",  # or any model OpenRouter supports
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()

    # Extract the generated text from OpenRouter response
    text = result["choices"][0]["message"]["content"]
    print(text)
    return text

def compare_points_to_transcript(key_points, transcript):
    prompt = f"""
You are given:
1) A list of key points
2) A transcript of a spoken presentation

Task:
Identify which key points were covered in the transcript.

Definition of "covered":
- A key point is considered covered if the transcript mentions it directly OR
  conveys the same idea in a loose, paraphrased, or high-level way.
- The wording does NOT need to match exactly.
- Minor references, summaries, or indirect mentions still count.

Rules:
- Keep the original wording of each key point exactly as written.
- Maintain the original order of the key points.
- Only include key points that were covered.
- Return ONLY a valid JSON array.
- Do NOT include explanations, comments, or extra text.

Key points:
{key_points}

Transcript:
{transcript}
"""


    data = {
        "model": "google/gemini-3-flash-preview",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()

    text = result["choices"][0]["message"]["content"]
    print(text)
    return text

def test():

    data = {
        "model": "google/gemini-2.5-flash",
        "messages": [
            {"role": "user", "content": "say hi!"}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=headers, json=data)
    if response.status_code != 200:
        print("Status code:", response.status_code)
        print("Response body:", response.text)
    response.raise_for_status()
    result = response.json()

    text = result["choices"][0]["message"]["content"]
    print(text)
    return text

test()




# # The client gets the API key from the environment variable `GEMINI_API_KEY`.

# def request_key_points(script):
#     client = genai.Client()

#     prompt="""Take the following script and identify the key points of the script. 
#     Return a list of key points formatted as an array in this exact format with no additional text: 
#     ["key point 1", "key point 2", "key point 3"]
#     Here is the script: """ + script

#     response = client.models.generate_content(
#         model="gemini-2.5-flash-lite", contents=prompt
#     )
#     summary = response.text
#     print(summary)
#     return summary


# def compare_points_to_transcript(key_points, transcript):
#     client = genai.Client()

#     prompt="""Read the following transcription. Then, filter the following list of key points, 
#     keeping only the items that were covered in the transcription. 
#     Return the list in the exact same format with no additional words. Here's the list of points: """ + key_points + """\nHere
#     is the full transcript: """ + transcript

#     response = client.models.generate_content(
#         model="gemini-2.5-flash-lite", contents=prompt
#     )
#     summary = response.text
#     print(summary)
#     return summary
