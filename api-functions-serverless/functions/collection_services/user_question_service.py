import google.cloud.firestore

from collection_services.config import Collection


class UserQuestionService:

    def __init__(self, db: google.cloud.firestore):
        self.db = db

    def getUserQuestions(self, uid: str):
        userQuestionsRef = self.db.collection(
            Collection.USER_QUESTIONS).document(uid)
        try:
            userQuestions = userQuestionsRef.get().to_dict()
        except:
            userQuestions = {}
        return userQuestions, userQuestionsRef

    def addUserQuestion(self, uid: str, qid: str, executionStatus: int = 0, bookmark: bool | None = None):
        userQuestions, userQuestionsRef = self.getUserQuestions(
            uid=uid)
        if not userQuestions:
            self.db.collection(Collection.USER_QUESTIONS).add(
                {qid: {"status":  executionStatus, "bookmark": bookmark if not bookmark is None else False}}, uid)
        else:
            currUserQuestion = userQuestions.get(qid, {})
            userQuestionsRef.update(
                {
                    qid: {
                        "status": max(currUserQuestion.get("status", 0), executionStatus),
                        "bookmark":  bookmark if not bookmark is None else currUserQuestion.get("bookmark", False)
                    }
                }
            )
