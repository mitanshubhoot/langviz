import sys
import os
import shutil

script_path = sys.argv[1]
output_prefix = sys.argv[2]

exec_globals = {"__name__": "__main__"}

with open(script_path) as f:
    code = compile(f.read(), script_path, 'exec')
    exec(code, exec_globals)

if os.path.exists("output.html"):
    shutil.move("output.html", output_prefix + ".html")
elif os.path.exists("output.png"):
    shutil.move("output.png", output_prefix + ".png")
else:
    raise FileNotFoundError("No known output format (html/png) was generated.")
