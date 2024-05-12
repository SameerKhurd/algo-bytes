
from firebase_functions import https_fn
import google.cloud.firestore

from firebase_admin import firestore

from collection_services.question_service import QuestionService
from collection_services.user_question_service import UserQuestionService
from collection_services.user_submission_service import UserSubmissionService
from collection_services.submission_service import SubmissionService
from config import Configuration as Config
from .execution.execution import Execution

from models.user_question_status import UserQuestionStatus
from models.question_status import QuestionStatus

from utils.http_methods import httpOptionsMethod
from models.programming_language import ProgrammingLanguage


@ https_fn.on_request(region=Config.REGION)
def userQuestionSubmissions(req: https_fn.Request) -> https_fn.Response:

    if req.method == "POST":
        return _getUserQuestionSubmission(req=req)
    elif req.method == "OPTIONS":
        return httpOptionsMethod(["POST"])

    return https_fn.Response("Bad request", status=400)


@https_fn.on_request(region=Config.REGION)
def submission(req: https_fn.Request) -> https_fn.Response:

    if req.method == "GET":
        return _getSubmission(req=req)
    elif req.method == "POST":
        return _executeCode(req=req)
    elif req.method == "OPTIONS":
        return httpOptionsMethod(["POST"])

    return https_fn.Response("Bad request", status=400)


def _executeCode(req: https_fn.Request) -> https_fn.Response:
    uid = req.json.get("uid")
    qid = req.json.get("qid")
    isSubmit = req.json.get("submit", False)
    userCode = req.json.get("code", "")
    language = req.json.get("language", ProgrammingLanguage.PYTHON3)

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()
    questionService = QuestionService(db=dbFirestoreClient)

    question, questionRef = questionService.getQuestion(qid=qid)
    if not question:
        return https_fn.Response("No question found", status=500)

    executionResult = Execution().execute(
        userId=uid, questionId=qid, submittedCode=userCode, testcases=question["testcases"])

    if isSubmit:
        print(isSubmit, executionResult["finalStatus"])

        questionService.incrementSubmissionCount(
            questionRef=questionRef, isAccepted=executionResult["finalStatus"])

        UserQuestionService(db=dbFirestoreClient).addUserQuestion(
            uid=uid, qid=qid, executionStatus=UserQuestionStatus.SOLVED if executionResult["finalStatus"] else UserQuestionStatus.ATTEMPTED)

        submission = SubmissionService(db=dbFirestoreClient).addSubmission(
            uid=uid, qid=qid, submittedCode=userCode, language=language)

        UserSubmissionService(db=dbFirestoreClient).addUserSubmission(
            uid=uid,
            qid=qid,
            sid=submission["sid"],
            executionStatus=QuestionStatus.PASSED
            if executionResult["finalStatus"]
            else QuestionStatus.FAILED,
            language=language,
            runtime=executionResult.get("runtime", -1),
        )

    headers = {"Access-Control-Allow-Origin": "*"}
    executionResult["isSubmit"] = isSubmit
    return executionResult, 200, headers


def _getSubmission(req: https_fn.Request) -> https_fn.Response:
    sid = req.args.get("sid")
    if sid is None:
        return https_fn.Response("No sid parameter provided", status=400)

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()

    submission, _ = SubmissionService(
        db=dbFirestoreClient).getSubmission(sid=sid)
    if not submission:
        return https_fn.Response("No submission found", status=400)

    headers = {"Access-Control-Allow-Origin": "*"}
    return submission, 200, headers


def _getUserQuestionSubmission(req: https_fn.Request) -> https_fn.Response:
    uid = req.json.get("uid")
    qid = req.json.get("qid")

    dbFirestoreClient: google.cloud.firestore.Client = firestore.client()

    submissions, _ = UserSubmissionService(
        db=dbFirestoreClient).getUserSubmissions(uid=uid)
    if not submissions:
        return https_fn.Response("No submissions found", status=400)

    headers = {"Access-Control-Allow-Origin": "*"}
    return submissions.get(qid, []), 200, headers
