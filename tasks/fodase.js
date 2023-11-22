let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwNjg1NjA4LCJpYXQiOjE3MDA2NDk2MDgsImp0aSI6Ijg4ZTFiZDRkODQ0MjRiOTQ4M2NlYWRmNDA2OWZmMmViIiwidXNlcl9pZCI6MTIsIm5hbWUiOiJMdWNhcyIsImxhc3RuYW1lIjoiQ2Fzc2lhbm8iLCJ1c2VybmFtZSI6Imx1Y2FzY2Nlc2FyIiwiZW1haWwiOiJmZHNAZ21haWwuY29tIn0.o-sKLss2d1Bfimp3wkRQkXwWiryLJRnoKWcCy_RmkKI"
let task = {
    "title":"aa",
    "task_content":"aaaa",
    "state":"pendente",
    "worklist":false,
    "date":"2023-11-22 23:30:00"
}
fetch("https://pi-kxis.onrender.com/api/task/", {method:"POST", headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}, body:JSON.stringify(task)})
