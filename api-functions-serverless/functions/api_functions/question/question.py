
import json
from firebase_functions import https_fn
import google.cloud.firestore

from firebase_admin import firestore

from collection_services.question_service import QuestionService
from config import Configuration as Config
from utils.http_methods import httpOptionsMethod


@ https_fn.on_request(region=Config.REGION)
def question(req: https_fn.Request) -> https_fn.Response:

    if req.method == "GET":
        return _getQuestion(req=req)
    elif req.method == "POST":
        return _addQuestions(req=req)
    elif req.method == "OPTIONS":
        return httpOptionsMethod(["POST"])

    return https_fn.Response("Bad request", status=400)


def _getQuestion(req: https_fn.Request) -> https_fn.Response:
    qid = req.args.get("qid")
    if qid is None:
        return https_fn.Response("No qid parameter provided", status=400)

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()

    question, _ = QuestionService(db=dbFirestoreClient).getQuestion(qid=qid)
    if not question:
        return https_fn.Response("No question found", status=400)

    headers = {"Access-Control-Allow-Origin": "*"}
    return question, 200, headers


def _addQuestions(req: https_fn.Request) -> https_fn.Response:
    questions = req.json.get("questions")
    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    questionService = QuestionService(db=dbFirestoreClient)

    for question in questions:
        question["testcases"] = json.dumps(question["testcases"])
        questionService.addQuestion(question=question)

    headers = {"Access-Control-Allow-Origin": "*"}
    res = {"msg": "questions added successfuly"}
    return res, 200, headers
