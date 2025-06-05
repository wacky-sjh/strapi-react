# 프로젝트 실행 방법

## 1. Strapi 서버 실행

1. 터미널을 열고 `server` 디렉토리로 이동합니다.
   ```bash
   cd server
   ```
2. 의존성을 설치합니다.
   ```bash
   npm install
   ```
3. Strapi 개발 서버를 실행합니다.
   ```bash
   npm run develop
   ```
4. 서버가 실행되면 아래 주소에서 접속할 수 있습니다.
   - API: [http://localhost:1337](http://localhost:1337)
   - **Strapi CMS 관리자**: [http://localhost:1337/admin](http://localhost:1337/admin)

## 2. 프론트엔드 개발 서버 실행

1. 의존성을 설치합니다.
   ```bash
   npm install
   ```
2. 프론트엔드 개발 서버를 실행합니다.
   ```bash
   npm run dev
   ```
3. 서버가 실행되면 아래 주소에서 접속할 수 있습니다.
   - [http://localhost:5173](http://localhost:5173)

---

각 서버는 별도의 터미널에서 각각 실행해야 합니다.
