# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

# Serverless API functions

from api_functions.user.user import user
from api_functions.submission.submission import submission, userQuestionSubmissions
from api_functions.question.question import question
from api_functions.bookmark.bookmark import bookmark
from api_functions.application.application import application

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app


app = initialize_app()
