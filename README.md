# WEM — GitHub Pages + Decap CMS Starter

## 포함된 것

- Jekyll 기반 다중 페이지 구조
- `Archive / Prototype` 분기형 메인 히어로
- `Works`, `Records`, `Recruit`, `Team`, `Contact` 페이지
- Decap CMS `/admin`
- GitHub Pages Actions 배포 워크플로
- 샘플 콘텐츠와 SVG 플레이스홀더 이미지

---

## 1. 가장 먼저 바꿔야 하는 값

### `admin/config.yml`
아래 값을 반드시 실제 값으로 바꾸세요.

- `repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME`
- `site_url: https://YOUR_DOMAIN_OR_USERNAME.github.io`
- `display_url: https://YOUR_DOMAIN_OR_USERNAME.github.io`

### `_data/site.yml`
아래 값들을 실제 정보로 바꾸세요.

- `default_email`
- `institution`
- `social_links`

### `contact.md`
- `email`
- `secondary_email`
- `external_links`

---

## 2. GitHub Pages 배포

GitHub 공식 문서 기준으로, Pages는 **GitHub Actions 기반 배포**를 사용할 수 있습니다.  
이 저장소에는 `.github/workflows/pages.yml`이 이미 들어 있습니다.

### 배포 순서

1. 새 GitHub 저장소 생성
2. 이 폴더 전체 업로드
3. GitHub 저장소 **Settings → Pages**
4. **Build and deployment → Source → GitHub Actions** 선택
5. `main` 브랜치에 푸시
6. Actions 완료 후 Pages URL 확인

> 참고: 프로젝트 페이지(`https://username.github.io/repo-name`)로 먼저 운영한다면 `_config.yml`의 `baseurl`을 `"/repo-name"`으로 설정하세요. 커스텀 도메인을 붙이면 다시 `""`로 두면 됩니다.

---

## 3. Decap CMS 로그인 방식

이 스타터는 **Decap CMS GitHub backend**를 사용합니다.

Decap 공식 문서에 따르면 GitHub backend는 GitHub 계정 로그인을 지원하지만, **GitHub가 인증에 서버를 요구하므로 Netlify가 기본 GitHub 인증을 도와줄 수 있습니다.**  
또한 이 방식에서는 CMS 사용자가 저장소에 **push 권한**을 가져야 합니다.

### 추천 설정 방식
- 실제 사이트 호스팅: **GitHub Pages**
- CMS 인증 지원: **Netlify OAuth Provider 설정**

### 최소 운영 권장
- `Maintainer` 1~2명만 repo admin/write
- 실제 CMS 편집자도 저장소 write 권한 부여

### 공식 참고 문서
- Decap GitHub backend: https://decapcms.org/docs/github-backend/
- Decap editorial workflow: https://decapcms.org/docs/editorial-workflows/
- GitHub Pages custom workflow: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

---

## 4. 로컬에서 확인하기

GitHub 공식 Jekyll 가이드에서는 Bundler 사용을 권장합니다.

### Ruby / Bundler 준비 후
```bash
bundle install
bundle exec jekyll serve
```

그다음 브라우저에서:
- 사이트: `http://127.0.0.1:4000`
- CMS: `http://127.0.0.1:4000/admin`

### Decap local backend 테스트
이 저장소는 `admin/config.yml`에 `local_backend: true`가 들어 있습니다.

별도 터미널에서:
```bash
npx decap-server
```

---

## 5. 콘텐츠는 어디서 수정하나

### `/admin`에서 수정 가능
- 홈 소개 문구
- About
- Recruit
- Contact
- 전역 사이트 설정
- 팀 정보
- Archive Works
- Prototype Works
- Records

### 코드 고정
- 전체 레이아웃
- 컬러 시스템
- 버튼 스타일
- 반응형 구조
- 필터 인터랙션

---

## 6. 콘텐츠 구조 설명

### `_works/`
작업물 상세 페이지입니다.

- `track: archive`
- `track: prototype`

둘 다 같은 폴더를 쓰되, CMS에서는 필터로 분리해서 보이게 설정했습니다.

### `_records/`
전시 / 공모전 / 워크숍 / 업데이트 로그 같은 활동 기록입니다.

### `_data/site.yml`
사이트 전역 문구와 메일, 히어로 단어, 소셜 링크를 담습니다.

### `_data/team.yml`
운영진 / 멤버 리스트를 담습니다.

---

## 7. 추천 운영 순서

1. 기본 정보 수정
2. 팀 정보 수정
3. 기존 완료작을 `Archive Works`에 입력
4. 현재 실험 중인 작업을 `Prototype Works`에 입력
5. 전시 / 공모전 / 워크숍 기록을 `Records`에 추가
6. 도메인 연결
7. 후배 인수인계용 README 보강

---

## 8. 커스텀 도메인 연결

GitHub Pages는 커스텀 도메인을 지원합니다.

도메인을 연결할 때는:
1. 도메인 구매
2. 저장소 **Settings → Pages → Custom domain** 입력
3. DNS 레코드 설정
4. 필요하면 루트에 `CNAME` 파일 추가

> GitHub 문서 기준으로, 저장소에 `CNAME` 파일을 넣는 것만으로는 커스텀 도메인이 자동 설정되지 않습니다. 저장소 설정에서도 도메인을 지정해야 합니다.

---

## 9. 파일 요약

- `index.md` — 홈 텍스트
- `about.md` — 학회 소개
- `recruit.md` — 모집 정보
- `contact.md` — 문의 페이지
- `works.html` — 포트폴리오 목록
- `records.html` — 활동 기록 목록
- `team.html` — 멤버 페이지
- `_works/` — 작업 상세
- `_records/` — 기록 상세
- `admin/config.yml` — CMS 핵심 설정
- `.github/workflows/pages.yml` — Pages 배포 워크플로

---

## 10. 다음에 손대기 좋은 확장 포인트

- 다국어(한/영) 페이지 추가
- Vimeo / YouTube 임베드 섹션 강화
- 프로젝트별 PDF 자료 자동 노출
- 썸네일 전용 이미지 규격 고정
- Works 상세 페이지의 관련 Records 자동 연결

