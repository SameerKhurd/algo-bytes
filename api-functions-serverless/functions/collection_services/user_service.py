import google.cloud.firestore
import uuid

from collection_services.config import Collection
from datetime import datetime, timezone


class UserService:

    def __init__(self, db: google.cloud.firestore):
        self.db = db

    def getUser(self, uid: str):
        userRef = self.db.collection(Collection.USERS).document(uid)
        user = userRef.get().to_dict()
        return user, userRef

    def addUser(self, username: str, email: str):
        user = {
            "uid": str(uuid.uuid4()),
            "username": username,
            "email": email,
            "pass": "",
            "createdAt": datetime.now(tz=timezone.utc),
        }
        self.db.collection(Collection.USERS).add(user, user["uid"])
        return user

    def updateUser(self, user, userRef, username: str, email: str):
        userRef.update(
            {
                "uid": user["uid"],
                "username": username,
                "email": email,
                "pass": "",
                "createdAt": user["createdAt"]
            }
        )
