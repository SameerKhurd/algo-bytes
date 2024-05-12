import google.cloud.firestore
import json

from collection_services.config import Collection


class QuestionService:

    def __init__(self, db: google.cloud.firestore):
        self.db = db

    def getQuestion(self, qid: str):
        questionRef = self.db.collection(Collection.QUESTIONS).document(qid)
        question = questionRef.get().to_dict()
        if question:
            question["testcases"] = json.loads(question["testcases"])
        return question, questionRef

    def addQuestion(self, question):
        self.db.collection(Collection.QUESTIONS).add(
            question, question["question"]["qid"])

    def incrementSubmissionCount(self, questionRef, isAccepted: bool):
        questionRef.update({"submitted": google.cloud.firestore.Increment(1)})
        if isAccepted:
            questionRef.update(
                {"accepted": google.cloud.firestore.Increment(1)})

    def getAllQuestions(self):
        questionsStream = self.db.collection(Collection.QUESTIONS).stream()
        return list(map(lambda questionRef: questionRef.to_dict(), questionsStream))
