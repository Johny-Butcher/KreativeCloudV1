# KreativeCloudV1 Dockerized Hosting Platform

A complete self-hosted web hosting platform with FTP management, MySQL databases, PHP support, and one-click WordPress deployment.

---

## 🏗️ Tech stack

KreativeCloudV1 uses a microservices approach to isolate hosting services from the management interface.

- **Frontend (Next.js):** User dashboard and management interface.
- **Backend (NestJS):** REST API for resource management.
- **MongoDB:** Primary runtime database used by the API for application state.
- **MySQL:** Database server for user websites (e.g., WordPress) and FTP virtual-user credentials.
- **FTP Server (BetterFTP):** FTP access backed by MySQL-authenticated virtual users.
- **PHP-FPM:** PHP processing engine for hosted web projects.
- **Nginx:** Reverse proxy and static file serving.
- **phpMyAdmin:** Web-based MySQL management UI.
- **Cloudflare Tunnel:** Secure public access without requiring manual port forwarding.

---

## 🚀 Setup

### 1. Environment Configuration

Create your environment file from the template:

`cp env.example .env`

Edit the **.env** file with your specific credentials:

- **SITE_URL**: Your public domain (e.g., https://your-domain.com)
- **CF_TUNNEL_TOKEN**: Found in Cloudflare Zero Trust -> Networks -> Connectors.
- **GOOGLE_CLIENT_ID / SECRET**: Found in Google Cloud Console -> Credentials.
- **API_SECRET / AUTH_SECRET**: Generate via `npx auth secret`.

### 2. Deployment

Start the stack using Docker Compose:

`docker compose up -d --build`

---

## 🔧 Service Configuration

### ☁️ Connectivity & Auth

- **Cloudflare Tunnel:** In your Zero Trust dashboard, create a Tunnel and add a **Published application route** that routes your domain to the internal service `http://nginx:80`.
- **Google OAuth:** Add the following Redirect URI in the Google Cloud Console: `https://your-domain.com/api/auth/callback/google`.
- **Important:** Ensure `SITE_URL` matches your real public URL; the frontend uses this for all authentication redirects.

### 🛡️ Firewall Configuration

The following ports need to be allowed for the platform to communicate with the outside world :

| Service         | Port      | Protocol | Notes                       |
| :-------------- | :-------- | :------- | :-------------------------- |
| **FTP Control** | 2121      | TCP      | Command channel             |
| **FTP Passive** | 7000–7100 | TCP      | Required for data transfers |
| **MySQL**       | 3307      | TCP      | Mysql                       |

---

## ⚠️ Critical Notes

- **PASV_URL:** By default, this is set to `127.0.0.1`. For production, you must set this to your server's **Public IP** or **Hostname** so clients can establish data connections.
