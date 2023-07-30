FROM ubuntu:latest
# Install necessary packages and dependencies for building NGINX
RUN apt update && \
    apt install -y build-essential wget git
# Download and build NGINX with the required modules
RUN wget https://github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz && \
    tar zxf pcre2-10.42.tar.gz && \
    wget http://zlib.net/zlib-1.2.13.tar.gz && tar zxf zlib-1.2.13.tar.gz && \
    wget https://nginx.org/download/nginx-1.24.0.tar.gz && tar zxf nginx-1.24.0.tar.gz && \
    git clone git://git.openssl.org/openssl.git && cd nginx-1.24.0 && \
    ./configure --with-http_realip_module --with-pcre=../pcre2-10.42 --with-zlib=../zlib-1.2.13 --with-http_ssl_module --with-openssl=../openssl \
    --sbin-path=/usr/local/sbin/nginx --conf-path=/usr/local/nginx/nginx.conf --pid-path=/usr/local/nginx/nginx.pid && \
    make && make install
# Clean up the temporary files and uninstall build dependencies
RUN rm -rf /pcre2-10.42* /zlib-1.2.13* /nginx-1.24.0* /openssl && \
    apt purge -y build-essential wget git && \
    apt autoremove -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*
# Start NGINX when the container starts
CMD ["/usr/local/sbin/nginx", "-g", "daemon off;"]