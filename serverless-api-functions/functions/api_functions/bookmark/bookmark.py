
from firebase_functions import https_fn
import google.cloud.firestore

from firebase_admin import firestore

from collection_services.user_question_service import UserQuestionService
from config import Configuration as Config
from utils.http_methods import httpOptionsMethod


@ https_fn.on_request(region=Config.REGION)
def bookmark(req: https_fn.Request) -> https_fn.Response:

    if req.method == "PUT":
        return _updateBookmark(req=req)
    elif req.method == "OPTIONS":
        return httpOptionsMethod(["PUT"])
    
    return https_fn.Response("Bad request", status=400)


def _updateBookmark(req: https_fn.Request) -> https_fn.Response:
    uid = req.json.get("uid")
    qid = req.json.get("qid")
    bookmark = req.json.get("bookmark")

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    UserQuestionService(db=dbFirestoreClient).addUserQuestion(
        uid=uid, qid=qid, bookmark=bookmark)

    headers = {"Access-Control-Allow-Origin": "*"}
    res = {"msg": "bookmark updated successfuly"}
    return res, 200, headers
