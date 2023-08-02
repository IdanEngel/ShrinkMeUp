# Use the official Python base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /usr/src/server

# Copy the backend application code and requirements into the container
COPY . .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the backend server will run on (assuming it's using port 8000)
EXPOSE 8000

# Specify the command to start the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
