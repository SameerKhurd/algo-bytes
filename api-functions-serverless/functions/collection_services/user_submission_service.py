import google.cloud.firestore

from collection_services.config import Collection

from typing import Dict
from typing import Tuple

from datetime import datetime, timezone
from firebase_admin import firestore


class UserSubmissionService:

    def __init__(self, db: google.cloud.firestore):
        self.db: google.cloud.firestore = db

    def getUserSubmissions(self, uid: str) -> Tuple[Dict, Dict]:
        userSubmissionsRef = self.db.collection(
            Collection.USER_SUBMISSIONS).document(uid)
        userSubmissions = userSubmissionsRef.get().to_dict()
        return userSubmissions, userSubmissionsRef

    def addUserSubmission(self, uid: str, sid: str, qid: str, executionStatus, language: int, runtime: int):
        newUserSubmission = {
            "sid": sid,
            "status": executionStatus,
            "time": datetime.now(tz=timezone.utc),
            "language": language,
            "runtime": runtime,
        }

        userSubmissions, userSubmissionsRef = self.getUserSubmissions(
            uid=uid,)
        if not userSubmissions:
            self.db.collection(Collection.USER_SUBMISSIONS).add(
                {qid: [newUserSubmission]}, uid)
        else:
            userSubmissionsRef.update(
                {qid: firestore.ArrayUnion([newUserSubmission])}
            )
        return newUserSubmission
