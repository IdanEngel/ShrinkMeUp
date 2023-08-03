
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI()

from db import (
    fetch_all,
    addLink,
    fetch_originalLink,
    fetch_shortenLink
)
from model import LinkModel
origins = ["http://localhost:3000", "http://localhost:3001"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Getting All links from the db
@app.get("/allLinks")
async def read_rood():
    response = await fetch_all()
    return response

# Posting the urls to db
@app.post("/sendLink")
async def sendLinks(links: LinkModel):
    # Checks if the short link existed
    shortenLinkExisted = await fetch_shortenLink(links.dobbyLink)
    # Checks if the full link existed
    originalLinkExisted = await fetch_originalLink(links.originalLink)
    if(shortenLinkExisted):
        # if short link existed we send 400 response to the client
        raise HTTPException(400, "Link Already Existed") 
    elif(originalLinkExisted):
        # If long url exist we return the existed short link from db
        originalLink = originalLinkExisted["originalLink"]
        shortenLink = originalLinkExisted["dobbyLink"]
        return {"message": "Link existed", "originalLink":originalLink, "shortenLink": shortenLink}

    try:
        # If it is a new links we send to db file to save in db
        document = dict(links)
        response = await addLink(document)
        if response: 
            return response
        else :
            raise HTTPException(400, "Bad Request")
    except Exception as e:
        print(f"Error in sendLinks: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Redirecting the user api
@app.get("/{short_url}")
async def redirect_to_long_url(short_url: str):
    shortenLink = "http://localhost:8000/" + short_url
    # Fetching the long URL associated with the short URL in the MongoDB collection
    response = await fetch_shortenLink(shortenLink)
    if response:
        # redirecting path url
        redirect_url = response["originalLink"]
        # redirecting permanently to the full url website
        return RedirectResponse(url=redirect_url, status_code=301)
    # If short url does not exist we raise an http detailed exception  
    raise HTTPException(status_code=404, detail="Sorry, This ShrinkMeUp Link Doesn't Exist")

