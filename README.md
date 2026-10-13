# 멘토리아 (Mentoria) - Vercel 배포 가이드

현직 대기업 멘토링 & 맞춤형 정부지원사업 매칭 플랫폼 **멘토리아 (Mentoria)** 배포 안내서입니다.

---

## 🚀 Vercel 배포 방법

본 프로젝트는 **Vite + React (TypeScript) + Tailwind CSS** 기반 단일 페이지 애플리케이션(SPA)으로 구성되어 있어, Vercel에서 즉시 원클릭 배포가 가능합니다.

### 방법 1. GitHub 연동을 통한 자동 배포 (권장)

1. **GitHub 저장소에 코드 푸시**
   ```bash
   git init
   git add .
   git commit -m "feat: Mentoria app ready for Vercel deployment"
   git branch -M main
   git remote add origin https://github.com/사용자이름/저장소이름.git
   git push -u origin main
   ```

2. **Vercel 대시보드(vercel.com)에서 Import**
   - [Vercel](https://vercel.com)에 로그인 후 **"Add New..."** > **"Project"**를 클릭합니다.
   - 방금 푸시한 GitHub 저장소를 선택(**Import**)합니다.

3. **프로젝트 설정 확인 (자동 감지)**
   - **Framework Preset**: `Vite` (자동 감지됨)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - `vercel.json`에 SPA 라우팅 리라이트 규칙(`rewrites`)이 사전에 설정되어 있으므로 별도의 추가 설정 없이 **"Deploy"** 버튼만 누르면 1분 이내에 배포가 완료됩니다.

---

### 방법 2. Vercel CLI를 통한 직접 배포

터미널에서 바로 배포하고 싶을 경우:

1. **Vercel CLI 설치 (전역)**
   ```bash
   npm install -g vercel
   ```

2. **로그인 및 배포 실행**
   ```bash
   # 프로젝트 루트 디렉터리에서 실행
   vercel
   ```
   - 안내에 따라 계정 로그인 및 기본 옵션(Enter)을 선택합니다.

3. **프로덕션 도메인으로 배포**
   ```bash
   vercel --prod
   ```

---

## ⚙️ 포함된 Vercel 설정 파일 (`vercel.json`)

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- **`rewrites`**: 모든 하위 경로(`/mentors`, `/grants`, `/my-mentoring` 등) 새로고침 시 404 에러를 방지하고 `index.html`로 연결해 주는 SPA 필수 설정입니다.
- **`outputDirectory`**: Vite 빌드 산출물 경로인 `dist`로 지정되어 있습니다.

---

## 💻 로컬 개발 환경 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행 (포트 3000)
npm run dev

# 프로덕션 빌드 테스트
npm run build
```
