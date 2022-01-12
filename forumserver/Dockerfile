# syntax=docker/dockerfile:1
#base image
FROM python:3.8 AS compile-image

RUN mkdir -p /opt/code
WORKDIR /opt/code

# Create a virtual environment for all the Python dependencies
RUN python3 -m venv /opt/venv
# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --upgrade pip
# Install and compile uwsgi
RUN pip3 install uwsgi==2.0.18
#COPY requirements to container then install
COPY ./requirements.txt /opt/
RUN pip install -r /opt/requirements.txt

#Multi-stage build https://docs.docker.com/develop/develop-images/multistage-build/
#可對dockerfile進行優化，只保留需要的內容，不需要多做其他dockerfile
FROM python:3.8 AS runtime-image

# Copy uWSGI configuration
RUN mkdir -p /opt/uwsgi
ADD uwsgi.ini /opt/uwsgi/
ADD start_server.sh /opt/uwsgi/

# !! windows 環境下sh會有格式問題，需要調整檔案格式:
# 取得檔案執行權限
RUN chmod +x /opt/uwsgi/start_server.sh
# 刪除換行符號
RUN sed -i 's/\r//' /opt/uwsgi/start_server.sh

# Create a user to run the service
RUN addgroup --system uwsgi
RUN adduser --system --no-create-home --disabled-password uwsgi
USER uwsgi

# Copy the venv with compile dependencies from the compile-image
COPY --chown=uwsgi:uwsgi --from=compile-image /opt/venv /opt/venv
# Be sure to activate the venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy the code
COPY --chown=uwsgi:uwsgi ./forum /opt/code/
WORKDIR /opt/code
RUN python manage.py makemigrations
RUN python manage.py migrate
EXPOSE 8000
#final command(run in the container cmd)
CMD [ "/bin/sh" ,"/opt/uwsgi/start_server.sh"]
