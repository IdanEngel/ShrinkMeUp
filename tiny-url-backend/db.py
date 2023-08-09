from model import LinkModel
from dotenv import load_dotenv
import os




# mongo driver
import motor.motor_asyncio
load_dotenv()
mongo_uri = os.environ.get("MONGO_URI")

# I've entered the path as is (and not through .env file), for your convenience 
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_uri)
db = client.LinksList
collection = db.Links

# Fetching all links from the database
async def fetch_all():
    links = []
    cursor = collection.find({})
    async for document in cursor:
        links.append(LinkModel(**document))
    return links

# Adding the links to the database
async def addLink(originalDoc):
    document = dict(originalDoc)
    # Adding to db
    result = await collection.insert_one(document)
    inserted_id = str(result.inserted_id)
    originalLink = str(originalDoc["originalLink"])
    shortenLink = str(originalDoc["dobbyLink"])
    return {"message": "Link added successfully", "inserted_id": inserted_id,  "originalLink":originalLink, "shortenLink": shortenLink}

# Fetching the original (Long url) link
async def fetch_originalLink(originalLink):
    document = await collection.find_one({"originalLink": originalLink})
    return document

# Fetching the dobby (shorten url) link
async def fetch_shortenLink(shortenLink):
    document = await collection.find_one({"dobbyLink": shortenLink})
    return document