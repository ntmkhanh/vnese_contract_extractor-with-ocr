import uvicorn

if __name__ == "__main__":
    uvicorn.run("app:app", host='localhost', port=5050, reload=True) # workers=1