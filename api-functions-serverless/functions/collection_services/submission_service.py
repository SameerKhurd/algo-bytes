import google.cloud.firestore
import uuid

from collection_services.config import Collection


class SubmissionService:

    def __init__(self, db: google.cloud.firestore):
        self.db: google.cloud.firestore = db

    def addSubmission(self, uid: str, qid: str, submittedCode: dict, language: int):
        newSubmission = {
            "sid": str(uuid.uuid4()),
            "qid": qid,
            "uid": uid,
            "code": submittedCode,
            "language": language,
        }

        self.db.collection(Collection.SUBMISSIONS).add(
            newSubmission, newSubmission["sid"])
        return newSubmission

    def getSubmission(self, sid: str):
        submissionRef = self.db.collection(
            Collection.SUBMISSIONS).document(sid)
        submission = submissionRef.get().to_dict()
        return submission, submissionRef
