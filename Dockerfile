# Base Image: Start with the official Amazon Linux 2023 image
ARG ARCH=
FROM ${ARCH}amazonlinux:2023

# Install System Dependencies and Python 3.10
RUN dnf update -y && \
    dnf install -y gcc vim postgresql-devel gcc-c++ \
                   gcc-plugin-devel libffi-devel bind-utils \
                   tar gzip wget make zlib-devel bzip2-devel \
                   openssl-devel ncurses-devel sqlite-devel \
                   readline-devel tk-devel xz-devel

# Install Python 3.10 from source
RUN wget https://www.python.org/ftp/python/3.10.12/Python-3.10.12.tgz && \
    tar xzf Python-3.10.12.tgz && \
    cd Python-3.10.12 && \
    ./configure --enable-optimizations --with-ensurepip=install && \
    make -j $(nproc) && \
    make altinstall && \
    cd .. && \
    rm -rf Python-3.10.12 Python-3.10.12.tgz

# Set Python 3.10 as the default python version
RUN ln -sf /usr/local/bin/python3.10 /usr/bin/python3 && \
    ln -sf /usr/local/bin/pip3.10 /usr/bin/pip3

# Upgrade pip
RUN python3 -m pip install --upgrade pip

# Set the working directory inside the container
RUN mkdir /app
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Create the Pine directory and set it as the working directory
RUN mkdir /app/Pine
WORKDIR /app/Pine
COPY Pine .
RUN pip3 install six setuptools && \
    python3 setup.py develop

# Set the working directory back to /app for the rest of the project
WORKDIR /app

# Copy the rest of the application code
COPY . /app/

# Expose the port Django will use
EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Copy the entrypoint script and make it executable
COPY docker-entrypoint.sh /usr/bin/

# Set the entrypoint to the custom entrypoint script
ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]