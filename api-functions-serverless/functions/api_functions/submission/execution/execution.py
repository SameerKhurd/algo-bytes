import json
import os
import shutil

from .config import EvaluationConfiguration as EvalConfig


class Execution:
    def __init__(self):
        pass

    def _storeUserSubmissionLocally(self, localStoreDir: str, submittedCode: str, testcases):
        os.makedirs(localStoreDir, exist_ok=True)

        runCodeTemplateFilePath = EvalConfig.RUN_TEMPLATE_FILE_PATH
        runCodeTemplate = ""
        with open(runCodeTemplateFilePath, "r") as fr:
            runCodeTemplate = fr.read()

        codeStoreFilePath = os.path.join(
            localStoreDir, EvalConfig.CODE_FILE_NAME)
        with open(codeStoreFilePath, "w") as fw:
            fw.write(runCodeTemplate.replace('{{user_code}}', submittedCode))

        inputTestCasesFilepath = os.path.join(
            localStoreDir, EvalConfig.INPUT_TC_FILE_NAME)
        with open(inputTestCasesFilepath, "w") as fw:
            json.dump(testcases, fw)

    def _runSubmission(self, localStoreDir):
        codeFilePath = os.path.join(localStoreDir, EvalConfig.CODE_FILE_NAME)
        inputTestCasesFilepath = os.path.join(
            localStoreDir, EvalConfig.INPUT_TC_FILE_NAME)
        outputFilepath = os.path.join(
            localStoreDir, EvalConfig.OUTPUT_FILE_NAME)
        runtimeErrorFilepath = os.path.join(
            localStoreDir, EvalConfig.RUNTIME_STDERR)

        os.system(f'python {codeFilePath} {inputTestCasesFilepath} {
            outputFilepath} 2> {runtimeErrorFilepath}')

        if os.path.isfile(outputFilepath):
            with open(outputFilepath, "r") as fr:
                result = json.load(fr)
        else:
            with open(runtimeErrorFilepath, "r") as fr:
                result = {
                    "finalStatus": False,
                    "passedCases": 0,
                    "totalCases": 0,
                    "results": [],
                    "error": True,
                    "runtime": -1,
                    "errorText": fr.read()
                }

        return result

    def _cleanup(self, localStoreDir: str):
        shutil.rmtree(localStoreDir)

    def execute(self, userId: str, questionId: str, submittedCode: str, testcases):
        localStoreDir = os.path.join(
            EvalConfig.LOCAL_SUBMISSION_DIR, userId, questionId)

        self._storeUserSubmissionLocally(
            localStoreDir=localStoreDir, submittedCode=submittedCode, testcases=testcases)

        executionResult = self._runSubmission(localStoreDir=localStoreDir)

        self._cleanup(localStoreDir=localStoreDir)
        return executionResult
