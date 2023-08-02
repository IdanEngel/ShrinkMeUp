from pydantic import BaseModel

class LinkModel(BaseModel):
    _id: str
    originalLink: str
    dobbyLink: str
