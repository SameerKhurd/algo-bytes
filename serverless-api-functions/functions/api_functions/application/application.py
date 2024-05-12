
from firebase_functions import https_fn
import google.cloud.firestore

from firebase_admin import firestore

from collection_services.user_service import UserService
from collection_services.question_service import QuestionService
from collection_services.user_question_service import UserQuestionService
from config import Configuration as Config
from utils.http_methods import httpOptionsMethod


@ https_fn.on_request(region=Config.REGION)
def application(req: https_fn.Request) -> https_fn.Response:

    if req.method == "POST":
        return _getApplicationUserData(req=req)
    elif req.method == "OPTIONS":
        return httpOptionsMethod(["POST"])

    return https_fn.Response("Bad request", status=400)


def _getApplicationUserData(req: https_fn.Request) -> https_fn.Response:
    uid = req.json.get("uid", "")

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    userService = UserService(db=dbFirestoreClient)

    if not uid:
        user = userService.addUser(
            username="Anonymous User", email="anonymous")
    else:
        user, _ = userService.getUser(uid=uid)
        if not user:
            user = userService.addUser(
                username="Anonymous User", email="anonymous")

    finalQuestions = []
    for question in QuestionService(db=dbFirestoreClient).getAllQuestions():
        finalQuestions.append(
            {
                "qid": question["question"]["qid"],
                "title": question["question"]["title"],
                "diff": question["question"]["diff"],
                "tags": question["question"]["tags"],
                "submitted": question["submitted"],
                "accepted": question["accepted"],
            }
        )
    userQuestions, _ = UserQuestionService(
        db=dbFirestoreClient).getUserQuestions(uid=uid)

    result = {
        "questions": finalQuestions,
        "userQuestions": userQuestions if userQuestions else {},
        "uid": user["uid"],
        "username": user["username"],
        "email": user["email"],
    }

    headers = {"Access-Control-Allow-Origin": "*"}
    return result, 200, headers
