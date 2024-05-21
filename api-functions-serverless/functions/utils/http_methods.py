
def httpOptionsMethod(methods):
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": ", ".join(methods),
        "Access-Control-Allow-Headers": "Content-Type",
    }
    return ("", 204, headers)
