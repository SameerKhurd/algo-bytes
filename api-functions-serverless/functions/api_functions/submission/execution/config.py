import os


class EvaluationConfiguration:
    LOCAL_SUBMISSION_DIR = 'local_storage'
    CODE_FILE_NAME = "code.py"
    OUTPUT_FILE_NAME = "output.json"
    INPUT_TC_FILE_NAME = "test_cases.json"
    RUN_TEMPLATE_FILE_PATH = os.path.join("templates", "run_code_template.txt")
    RUNTIME_STDERR = "runtime_err.txt"
