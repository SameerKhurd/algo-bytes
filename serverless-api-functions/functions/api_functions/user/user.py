
from collection_services.user_service import UserService

from firebase_functions import https_fn
import google.cloud.firestore

from firebase_admin import firestore

from config import Configuration as Config


@ https_fn.on_request(region=Config.REGION)
def user(req: https_fn.Request) -> https_fn.Response:

    # if req.method == "OPTIONS":
    #     # Allows GET requests from any origin with the Content-Type
    #     # header and caches preflight response for an 3600s
    #     headers = {
    #         "Access-Control-Allow-Origin": "*",
    #         "Access-Control-Allow-Methods": "POST",
    #         "Access-Control-Allow-Headers": "Content-Type",
    #     }

    #     return ("", 204, headers)

    if req.method == "POST":
        return _addUser(req=req)
    elif req.method == "PUT":
        return _updateUser(req=req)

    return https_fn.Response("Bad request", status=400)


def _addUser(req: https_fn.Request) -> https_fn.Response:
    username = req.json.get("username", "anonymous")
    email = req.json.get("email", "anonymous")

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    user, _ = UserService(db=dbFirestoreClient).addUser(
        username=username, email=email)

    headers = {"Access-Control-Allow-Origin": "*"}
    return user, 200, headers


def _updateUser(req: https_fn.Request) -> https_fn.Response:
    uid = req.json.get("uid")
    username = req.json.get("username")
    email = req.json.get("email")

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    user_service = UserService(db=dbFirestoreClient)

    user, userRef = user_service.getUser(uid=uid)
    if not user:
        return https_fn.Response("No user found", status=400)

    user_service.updateUser(user=user, userRef=userRef,
                            username=username, email=email)

    headers = {"Access-Control-Allow-Origin": "*"}
    res = {"msg": "user details updated successfuly"}
    return res, 200, headers
