:TOP
set "base_path=E:\scripts\koa_service"

%base_path%\node_modules\.bin\babel-node %base_path%\index.js > %base_path%\log\output.log

pause
goto TOP
